import { createSlice } from "@reduxjs/toolkit";
import { articleData, dataToDeleteArticle } from "@/types";

const initialState: articleData[] = [];
export const articleSlice = createSlice({
  name: "articleDataState",
  initialState,
  reducers: {
    chargeArticles: (state, action) => {
      console.log("EJECUTO CARGA", action.payload);
      const articles = action.payload;

      return [...articles];
    },
    addArticle: (state, action) => {
      const articleToAdd: articleData = action.payload;

      return [...state, articleToAdd];
    },
    deleteArticle: (state, action) => {
      const clientToDelete: dataToDeleteArticle = action.payload;

      const result = state.filter((articleData) => {
        return (
          articleData.article.name !== clientToDelete.name &&
          articleData.article.code !== clientToDelete.code
        );
      });

      if (result.length === state.length) {
        return state;
      } else {
        return result;
      }
    },
  },
});

export const { chargeArticles, addArticle, deleteArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
