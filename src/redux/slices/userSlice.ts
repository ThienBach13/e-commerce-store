import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { UserType } from "../../misc/types";

interface UserState {
  user: UserType | null;
}

let initialUser: UserType | null = null;
const data = localStorage.getItem("userInfo");
if (data) {
  initialUser = JSON.parse(data);
}

const initialState: UserState = {
  user: initialUser,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { saveUserInfo } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.user;

export default userSlice.reducer;
