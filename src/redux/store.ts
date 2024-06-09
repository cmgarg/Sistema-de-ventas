import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./estados/clientesState.ts";
import articleSlice from "./estados/articlesState.ts";
import categorySlice from "./estados/categoryState.ts";
import brandSlice from "./estados/brandState.ts";
import saleSlice from "./estados/salesState.ts";
import authReducer from "./estados/authSlice.ts";
import estadoTipoDeUser from "./estados/estadoTipoDeUser.ts";
import subCategorySlice from "./estados/subCategoryState.ts";

export const store = configureStore({
  reducer: {
    clientState: clientSlice,
    articleState: articleSlice,
    saleState: saleSlice,
    categoryState: categorySlice,
    subCategoryState: subCategorySlice,
    brandState: brandSlice,
    auth: authReducer,
    estadoTipoDeUser: estadoTipoDeUser,
  },
});


