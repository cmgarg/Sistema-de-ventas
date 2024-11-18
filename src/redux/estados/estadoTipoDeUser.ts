import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/types";

interface EstadoTipoDeUserState {
  userType: string;
  datosUsuario: IUser | {}; // Tipo de datosUsuario
}

const initialState: EstadoTipoDeUserState = {
  userType: "",
  datosUsuario: {}, // Nuevo estado para almacenar los datos del usuario
};

const estadoTipoDeUser = createSlice({
  name: "estadoTipoDeUser",
  initialState,
  reducers: {
    cambiar: (
      state,
      action: PayloadAction<{ userType: string; datosUsuario: IUser }>
    ) => {
      console.log(action.payload, "chotassssssssssssssss");
      return {
        userType: action.payload.userType,
        datosUsuario: action.payload.datosUsuario,
      }; // Actualiza el estado con los datos del usuario
    },
    datosUsuario: (state, action: PayloadAction<{ datosUsuario: IUser }>) => {
      console.log(action.payload, "chotassssssssssssssss");

      return {
        userType: state.userType,
        datosUsuario: action.payload.datosUsuario,
      }; // Actualiza el estado con los datos del usuario
    },
  },
});

export const { cambiar, datosUsuario } = estadoTipoDeUser.actions; // Exporta la nueva acción
export default estadoTipoDeUser.reducer;
