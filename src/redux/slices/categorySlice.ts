import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../../misc/types";
import axios, { AxiosError } from "axios";

type InitialState = {
  categories: CategoryType[];
  selectedCategory: string;
  loading: boolean;
  error?: string;
};
const initialState: InitialState = {
  categories: [],
  selectedCategory: "0",
  loading: false,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async () => {
    try {
      const res = await axios.get<CategoryType[]>(
        `https://ecomshop.azurewebsites.net/api/v1/categories`
      );
      const data = res.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers(builder) {
    // fetchCategoriesAsync
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.categories = [
          { id: "0", name: "All", image: "https://i.imgur.com/cLBhSOG.png" },
          ...action.payload,
        ];
      }
      state.loading = false;
    });
    builder.addCase(fetchAllCategoriesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
