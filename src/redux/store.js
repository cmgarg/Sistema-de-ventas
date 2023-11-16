import { configureStore } from "@reduxjs/toolkit";
import  menuSlice  from "./estados/menuState.js";

export const store = configureStore({
  reducer: {
    menuState: menuSlice,
  },
});
