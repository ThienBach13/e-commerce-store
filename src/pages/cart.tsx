import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../redux/store";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../redux/slices/cartSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, currentItem) => total + currentItem.price * currentItem.quantity,
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  // const handleCheckout = () => {
  //   if (cartItems.length === 0) {
  //     toast.error("There are no products in the cart!", {
  //       position: "bottom-left",
  //     });
  //   } else {
  //     toast.success("Your order has been processed!", {
  //       position: "bottom-left",
  //     });
  //     dispatch(clearCart());
  //   }
  // };
  const handleSubmitOrder = async () => {
    const submitOrder = {
      CreatedAt: new Date().toISOString(),
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const token = localStorage.getItem("access_token");
      console.log(submitOrder);
      const response = await axios.post(
        "https://ecomshop.azurewebsites.net/api/v1/orders",
        submitOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch(clearCart());
      console.log("Order submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting order:", error.message);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ccc",
                width: "40%",
              }}
            >
              Product Title
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ccc",
                width: "20%",
              }}
            >
              Price
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ccc",
                width: "20%",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cart) => (
            <tr key={cart.id}>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                {cart.name}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                €{cart.price}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <IconButton
                  onClick={() => handleDecrease(cart.id)}
                  disabled={cart.quantity === 1}
                >
                  -
                </IconButton>
                {cart.quantity}
                <IconButton onClick={() => handleIncrease(cart.id)}>
                  +
                </IconButton>
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <IconButton onClick={() => handleRemove(cart.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="body1">Total: €{totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", marginTop: "10px" }}
          onClick={() => handleSubmitOrder()}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
