import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import { Order } from "../misc/types";

const UserOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get<Order[]>(
          "https://ecomshop.azurewebsites.net/api/v1/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error: any) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Orders
      </Typography>
      {orders.map((order) => (
        <Paper key={order.id} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Order ID: {order.id}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Date: {new Date(order.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Total Items: {order.orderItems.length}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default UserOrder;
