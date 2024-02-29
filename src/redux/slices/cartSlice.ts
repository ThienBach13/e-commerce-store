import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CartItemType } from "../../misc/types";

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCart: (state, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
  },
});

export const { saveCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
