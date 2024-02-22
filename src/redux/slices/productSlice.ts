import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: "",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});
  
const productReducer = productSlice.reducer;
export default productReducer;