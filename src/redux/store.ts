import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import productReducer from "./slices/productSlice";

const store = configureStore({reducer:{productReducer:productReducer}})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;