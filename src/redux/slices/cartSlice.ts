import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "../store";
import { CartItemType, ProductType, UpdateQuantity } from "../../misc/types";

const cart = JSON.parse(localStorage.getItem("cart") || "[]");

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: cart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveToCart: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.info(`Quantity of "${action.payload.title}" increased`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`Added "${action.payload.title}" to the cart`, {
          position: "bottom-left",
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      toast.error("Removed item from the cart", { position: "bottom-left" });
    },

    clearCart(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateQuantity(state, action: PayloadAction<UpdateQuantity>) {
      const { id, quantity } = action.payload;
      const updateItem = state.cart.find((item) => item.id === id);
      if (updateItem) {
        updateItem.quantity += quantity;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { saveToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
