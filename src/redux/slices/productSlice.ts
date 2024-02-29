import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ProductType } from "../../misc/types";

interface ProductState {
  allProducts: ProductType[];
  loading: boolean;
  error?: string;
}

const initialState: ProductState = {
  allProducts: [],
  loading: false,
};

const url = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async () => {
    try {
      const res = await axios(url);
      const data = res.data;
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.allProducts = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const selectProducts = (state: RootState) => state.products.allProducts;

export default productSlice.reducer;
