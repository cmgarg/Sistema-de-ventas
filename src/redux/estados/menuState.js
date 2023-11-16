import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: "usuario",
};
export const menuSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    setMenuState: (state, action) => {
      const {value} = action.payload;
      state.value = value;
    },
  },
});

export const {setMenuState} = menuSlice.actions;
export default menuSlice.reducer;