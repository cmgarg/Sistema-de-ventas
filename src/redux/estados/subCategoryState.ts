import { createSlice } from "@reduxjs/toolkit";
import { brandType, categoryType, subCategoryType } from "../../../types/types";

const initialState: subCategoryType[] = [];
export const subCategorySlice = createSlice({
  name: "saleDataState",
  initialState,
  reducers: {
    loadSubCategorys: (state, action) => {
      console.log("EJECUTO CARGA SUB categorias", action.payload);

      const subCategorys = action.payload;

      return subCategorys;
    },
    addSubCategory: (state, action) => {
      const saleToAdd: categoryType = action.payload;

      return [...state, saleToAdd];
    },
    deleteSubCategory: (state, action) => {
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

export const { loadSubCategorys, addSubCategory, deleteSubCategory } =
  subCategorySlice.actions;
export default subCategorySlice.reducer;
