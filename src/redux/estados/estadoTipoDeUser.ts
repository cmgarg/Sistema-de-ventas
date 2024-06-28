import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: ""
};

const estadoTipoDeUser = createSlice({
  name: "estadoTipoDeUser",
  initialState,
  reducers: {
    cambiar: (state, action) => {
      console.log(action.payload, "chotassssssssssssssss");
      state.userType = action.payload.userType;
    },
  },
});

export const { cambiar } = estadoTipoDeUser.actions;
export default estadoTipoDeUser.reducer;
