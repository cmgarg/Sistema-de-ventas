import { authType } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authType = {
  isAuthenticated: false,
  userId: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...action.payload, isAuthenticated: true };
    },
    logout: (state) => {
      return {
        isAuthenticated: false,
        userId: "",
        token: "",
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
