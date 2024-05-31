import categoryReducer, {
  setSelectedCategory,
} from "../redux/slices/categorySlice";

const initialState = {
  categories: [],
  selectedCategory: 0,
  loading: false,
};

// describe("categorySlice reducers", () => {
//   test("should handle setSelectedCategory", () => {
//     const action = setSelectedCategory(1);
//     const nextState = categoryReducer(initialState, action);

//     expect(nextState.selectedCategory).toEqual(1);
//   });

//   test("should return initial state", () => {
//     const nextState = categoryReducer(undefined, { type: "" });

//     expect(nextState).toEqual(initialState);
//   });
// });
