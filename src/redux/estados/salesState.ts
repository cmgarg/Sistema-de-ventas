import { createSlice } from "@reduxjs/toolkit";
import { saleData, saleToDelete } from "../../../types";

const initialState: saleData[] = [];
export const saleSlice = createSlice({
  name: "saleDataState",
  initialState,
  reducers: {
    chargeSales: (state, action) => {
      console.log("EJECUTO CARGA ventas", action.payload);

      const sales = action.payload.value;

      return sales;
    },
    addSale: (state, action) => {
      const saleToAdd: saleData = action.payload.value;

      return [...state, saleToAdd];
    },
    deleteSale: (state, action) => {
      const saleToDelete: saleToDelete = action.payload.value;

      const result = state.filter((articleData) => {
        return articleData.id !== saleToDelete.id;
      });

      if (result.length === state.length) {
        return state;
      } else {
        return result;
      }
    },
  },
});

export const { chargeSales, addSale, deleteSale } = saleSlice.actions;
export default saleSlice.reducer;
