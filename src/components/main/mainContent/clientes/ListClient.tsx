import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../../../app/ui/context-menu";
import { useSelector } from "react-redux";
import { clientData, storeType } from "../../../../../types/types";
import { deleteClientState } from "../../../../../src/redux/estados/clientesState";

interface listClientProps {
  searchActived: { actived: boolean; results: clientData[] };
  clientAeditar: {
    active: boolean;
    object: clientData;
  };
  setClientToEdit: (e: clientData) => void;
  dispatch: (e: any) => void;
}

const ListClient: React.FC<listClientProps> = ({
  searchActived,
  setClientToEdit,
  dispatch,
}) => {
  // HACEEEER QUE EL BUSCADOR FUNCIONE
  //ORDENAR LISTA
  const clients = useSelector((state: storeType) => state.clientState);

  //ELIMINAR CLIENTES
  function editClient(client: clientData) {
    setClientToEdit(client);
  }

  function deleteClient(client: clientData, index: number) {
    window.api.enviarEvento("delete-client", client);
  }

  useEffect(() => {
    window.api.recibirEvento("response-delete-client", (result) => {
      dispatch(deleteClientState(result));
    });

    console.log(clients, "CLIENTES");
  }, []);

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="flex-1 pl-2 flex items-center justify-start">
          <p className="text-center font-bold">NOMBRE</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-center w-52">
          <p className="text-center">EMAIL</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-center w-52">
          <p className="text-center">DIRECCION</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-end w-52">
          <p className="text-center">DNI</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila, index) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id} padding={true}>
                  <Link to={`/cliente/${fila._id}`} className="w-full flex">
                    <div className="flex items-center flex-1 space-x-2 justify-center">
                      <div className="flex-1">{fila.name}</div>
                    </div>
                    <div className="flex justify-center items-center flex-1">
                      <p>{fila.email}</p>
                    </div>
                    <div className="flex justify-center items-center flex-1">
                      <p>{fila.address}</p>
                    </div>
                    <div className="flex justify-end items-center flex-1">
                      <p>{fila.DNI}</p>
                    </div>
                  </Link>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    setClientToEdit(fila);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    deleteClient(fila, index);
                  }}
                >
                  Borrar
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        ) : searchActived.results.length === 0 && searchActived.actived ? (
          <TableRow>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>No hay resultados</p>
            </div>
          </TableRow>
        ) : (
          clients.map((fila, index) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id} padding={true}>
                  <Link to={`/cliente/${fila._id}`} className="w-full flex">
                    <div className="flex items-center flex-1 justify-start ">
                      <div className="flex-1">{fila.name}</div>
                    </div>
                    <div className="flex justify-center items-center flex-1 ">
                      <p>{fila.email}</p>
                    </div>
                    <div className="flex justify-center items-center flex-1 ">
                      <p>{fila.address}</p>
                    </div>
                    <div className="flex justify-end items-center flex-1  ">
                      <p>{fila.DNI}</p>
                    </div>
                  </Link>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    editClient(fila);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    deleteClient(fila, index);
                  }}
                >
                  Borrar
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        )}
      </div>
    </TableMain>
  );
};

export default ListClient;
