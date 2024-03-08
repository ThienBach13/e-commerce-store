import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
    users: userSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
