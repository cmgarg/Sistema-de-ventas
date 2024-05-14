import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./estados/clientesState.ts";
import articleSlice from "./estados/articlesState.ts";
import categorySlice from "./estados/categoryState.ts";
import brandSlice from "./estados/brandState.ts";
import saleSlice from "./estados/salesState.ts";

export const store = configureStore({
  reducer: {
    clientState: clientSlice,
    articleState: articleSlice,
    saleState: saleSlice,
    categoryState: categorySlice,
    brandState: brandSlice,
  },
});
