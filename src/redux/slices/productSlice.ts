import axios from "axios";
import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "../store";
import {
  ProductType,
  CreateProductType,
  UpdateProductType,
} from "../../misc/types";

interface ProductState {
  allProducts: ProductType[];
  product: ProductType | null;
  loading: boolean;
  error?: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  product: null,
  loading: false,
  error: null,
};

const url = "https://api.escuelajs.co/api/v1/products";

export const createProductsAsync = createAsyncThunk(
  "createProductsAsync",
  async (newProduct: CreateProductType) => {
    try {
      const response = await axios.post(url, newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error("Product added failed :(", {
        position: "top-right",
        autoClose: 2000,
      });
      return error;
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({
    updateProduct,
    productId,
  }: {
    updateProduct: UpdateProductType;
    productId: string;
  }) => {
    try {
      const response = await axios.put(`${url}/${productId}`, updateProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error("Product updated failed :(", {
        position: "top-right",
        autoClose: 2000,
      });
      return error;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (productId: string) => {
    try {
      const response = await axios.delete(`${url}/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Product removed successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error("Product removed failed :(", {
        position: "top-right",
        autoClose: 2000,
      });
      return error;
    }
  }
);

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async () => {
    try {
      const response = await axios.get<ProductType[]>(url);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchSingleProductAsync = createAsyncThunk(
  "fetchSingleProductAsync",
  async (id: string) => {
    try {
      const response = await axios.get<ProductType>(`${url}/${id}`);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //fetchAllProductsAsync
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.allProducts = action.payload;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });

    // fetchSingleProductAsync
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.product = action.payload;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(fetchSingleProductAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });

    // createProductsAsync
    builder.addCase(createProductsAsync.fulfilled, (state, action) => {
      state.allProducts = [...state.allProducts, action.payload];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createProductsAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });

    // updateProductAsync
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const updatedProductIndex = state.allProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (updatedProductIndex !== -1) {
        state.allProducts[updatedProductIndex] = action.payload;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(updateProductAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });

    // deleteProductAsync
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.allProducts = state.allProducts.filter(
        (product) => product.id !== action.payload.id
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProductAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const selectProducts = (state: RootState) => state.products.allProducts;

export default productSlice.reducer;
