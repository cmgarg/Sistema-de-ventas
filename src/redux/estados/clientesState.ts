import { createSlice } from "@reduxjs/toolkit";
import { clientData, dataToDeleteClient } from "../../../types";

const initialState: clientData[] = [];
export const clientSlice = createSlice({
  name: "clientDataState",
  initialState,
  reducers: {
    chargeClients: (state, action) => {
      console.log("EJECUTO CARGA clientes", action.payload);

      const clients = action.payload;

      return clients;
    },
    addClient: (state, action) => {
      const clientToAdd: clientData = action.payload;

      return [...state, clientToAdd];
    },
    deleteClientState: (state, action) => {
      const clientToDelete: dataToDeleteClient = action.payload;

      const result = state.filter((client) => {
        return client._id !== clientToDelete._id;
      });

      if (result.length === state.length) {
        return state;
      } else {
        return result;
      }
    },
    editClient: (state, action) => {
      const clientToUpdate: clientData = action.payload;

      const result = state.map((client) => {
        if (client._id === clientToUpdate._id) {
          return clientToUpdate;
        } else {
          return client;
        }
      });

      return result;
    },
  },
});

export const { chargeClients, addClient, deleteClientState, editClient } =
  clientSlice.actions;
export default clientSlice.reducer;
