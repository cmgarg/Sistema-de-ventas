import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './estados/menuState.js';
import authReducer from './estados/authSlice.js'; 

export const store = configureStore({
  reducer: {
    menuState: menuSlice,
    auth: authReducer, 
  },
});
