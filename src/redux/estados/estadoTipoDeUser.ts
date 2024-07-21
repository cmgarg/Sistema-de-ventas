import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
  username?: string;
  nombre?: string;
  email: string;
  ubicacion: string;
  direccion: string;
  codigopostal: string;
  imageUrl: string;
  esAdmin: boolean;
  _id: string;
}

interface EstadoTipoDeUserState {
  userType: string;
  datosUsuario: Usuario | {}; // Tipo de datosUsuario
}

const initialState: EstadoTipoDeUserState = {
  userType: "",
  datosUsuario: {}, // Nuevo estado para almacenar los datos del usuario
};

const estadoTipoDeUser = createSlice({
  name: "estadoTipoDeUser",
  initialState,
  reducers: {
    cambiar: (state, action: PayloadAction<{ userType: string; datosUsuario: Usuario }>) => {
      console.log(action.payload, "chotassssssssssssssss");
      state.userType = action.payload.userType;
      state.datosUsuario = action.payload.datosUsuario; // Actualiza el estado con los datos del usuario
    },
    datosUsuario: (state, action: PayloadAction<{ datosUsuario: Usuario }>) => {
      console.log(action.payload, "chotassssssssssssssss");
      state.datosUsuario = action.payload.datosUsuario; // Actualiza el estado con los datos del usuario
    },
  },
});

export const { cambiar, datosUsuario } = estadoTipoDeUser.actions; // Exporta la nueva acción
export default estadoTipoDeUser.reducer;
