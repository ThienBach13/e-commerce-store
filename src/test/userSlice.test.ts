import userReducer, { logout } from "../redux/slices/userSlice";
import { User } from "../misc/types";

// type InitialState = {
//   users: User[];
//   user?: User | null;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
// };

// describe("userSlice reducers", () => {
//   test("should log out", () => {
//     const initialState: InitialState = {
//       users: [],
//       user: {
//         id: 1,
//         email: "user1@mail.com",
//         name: "User 1",
//         role: "admin",
//         avatar: "https://picsum.photos/800",
//         password: "123456",
//       },
//       loading: false,
//       error: null,
//       isAuthenticated: true,
//     };

//     const action = logout();
//     const nextState = userReducer(initialState, action);

//     expect(nextState.isAuthenticated).toBeFalsy();
//   });
// });
