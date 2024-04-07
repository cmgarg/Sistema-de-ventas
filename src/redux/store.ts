import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./estados/menuState.js";
import clientSlice from "./estados/clientesState.ts";
import articleSlice from "./estados/articlesState.ts";
import authReducer from './estados/authSlice.ts'; 

export const store = configureStore({
  reducer: {
    menuState: menuSlice,
    clientState: clientSlice,
    articleState: articleSlice,
    auth: authReducer, 
  },
});
