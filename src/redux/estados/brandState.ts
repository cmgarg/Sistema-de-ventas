import { createSlice } from "@reduxjs/toolkit";
import { brandType } from "../../../types";

const initialState: brandType[] = [];
export const brandSlice = createSlice({
  name: "saleDataState",
  initialState,
  reducers: {
    loadBrands: (state, action) => {
      console.log("EJECUTO CARGA ventas", action.payload);

      const sales = action.payload;

      return sales;
    },
    addBrand: (state, action) => {
      const saleToAdd: brandType = action.payload;

      return [...state, saleToAdd];
    },
    deleteBrand: (state, action) => {
      const brandToDelete: brandType = action.payload;

      const result = state.filter((brandData) => {
        return brandData._id !== brandToDelete._id;
      });

      if (result.length === state.length) {
        return state;
      } else {
        return result;
      }
    },
  },
});

export const { loadBrands, addBrand, deleteBrand } = brandSlice.actions;
export default brandSlice.reducer;
