import { createSlice } from "@reduxjs/toolkit";
import { brandType, categoryType } from "../../../types";

const initialState: categoryType[] = [];
export const categorySlice = createSlice({
  name: "saleDataState",
  initialState,
  reducers: {
    loadCategorys: (state, action) => {
      console.log("EJECUTO CARGA categorias", action.payload);

      const categorys = action.payload;

      return categorys;
    },
    addCategory: (state, action) => {
      const saleToAdd: categoryType = action.payload;

      return [...state, saleToAdd];
    },
    deleteCategory: (state, action) => {
      const brandToDelete: categoryType = action.payload;

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

export const { loadCategorys, addCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
