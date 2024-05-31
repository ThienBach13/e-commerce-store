import productReducer, {
  fetchAllProductsAsync,
  fetchSingleProductAsync,
} from "../redux/slices/productSlice";

const initialState = {
  allProducts: [],
  product: null,
  loading: false,
  error: null,
};

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 1,
    description: "Description 1",
    category: { id: 1, name: "Category 1", image: "Image 1" },
    images: ["Image 1"],
    quantity: 1,
  },
  {
    id: 2,
    title: "Product 2",
    price: 2,
    description: "Description 2",
    category: { id: 2, name: "Category 2", image: "Image 2" },
    images: ["Image 2"],
    quantity: 2,
  },
];

const mockProduct = {
  id: 3,
  title: "Product 3",
  price: 3,
  description: "Description 3",
  category: { id: 3, name: "Category 3", image: "Image 3" },
  images: ["Image 3"],
  quantity: 3,
};

// describe("productSlice reducers", () => {
//   // test 0: initial state
//   test("should return initial state", () => {
//     const nextState = productReducer(undefined, { type: "" });

//     expect(nextState).toEqual(initialState);
//   });

//   test("should fetch all products", () => {
//     const action = fetchAllProductsAsync.fulfilled(mockProducts, "fulfilled");
//     const nextState = productReducer(initialState, action);

//     expect(nextState).toEqual({
//       allProducts: mockProducts,
//       product: null,
//       loading: false,
//       error: null,
//     });
//   });

//   test("should fetch a product", () => {
//     const action = fetchSingleProductAsync.fulfilled(
//       mockProduct,
//       "fulfilled",
//       1
//     );
//     const nextState = productReducer(initialState, action);

//     expect(nextState).toEqual({
//       allProducts: [],
//       product: mockProduct,
//       loading: false,
//       error: null,
//     });
//   });
// });
