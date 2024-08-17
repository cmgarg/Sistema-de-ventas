import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./estados/clientesState";
import articleSlice from "./estados/articlesState";
import categorySlice from "./estados/categoryState";
import brandSlice from "./estados/brandState";
import saleSlice from "./estados/salesState";
import authReducer from "./estados/authSlice";
import estadoTipoDeUser from "./estados/estadoTipoDeUser";
import subCategorySlice from "./estados/subCategoryState";

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
