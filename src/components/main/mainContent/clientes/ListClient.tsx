import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { Toaster } from "../../../../../components/app/ui/sonner";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "../../../../../app/ui/context-menu";
import { useSelector } from "react-redux";
import { clientData, storeType } from "../../../../../types/types";
import { deleteClientState } from "../../../../../src/redux/estados/clientesState";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import VirtualizedTable from "../../tablaMain/VirtualizedTable";

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
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [positionContextMenu, setPositionContextMenu] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
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

    window.api.recibirEvento("response-delete-client", (res) => {
      if (res) {
      }
    });
  }, []);

  return (
    //PODER ORDENAR LAS LISTAS
    <div className="flex-1 h-full">
      <div className="p-2 bg-gradient-to-l sticky top-0 rounded-t-lg  from-yellow-700 via-yellow-700 to-yellow-500 font-bold text-center flex">
        <div className="flex flex-1">
          <p>Nombre</p>
        </div>
        <div className="flex flex-1">
          <p>DNI</p>
        </div>
        <div className="flex flex-1">
          <p>Email</p>
        </div>
        <div className="flex flex-1">
          <p>Direccion</p>
        </div>
      </div>
      <VirtualizedTable
        className="rounded-b-lg overflow-hidden flex-1 h-full"
        data={clients}
        renderHeader={() => (
          <div className=" absolute left-[20000px] rounded-t-lg   font-bold text-center flex"></div>
        )}
        renderRow={(item, index) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <Link
                key={index}
                to={`/articulo/${item._id}`}
                className={`text-center h-10 flex bg-gradient-to-l px-2 from-gray-800 via-gray-800 to-gray-700 hover:brightness-125 ${
                  clients.length - 1 == index ? "rounded-b-lg" : ""
                }`}
              >
                <div className="flex flex-1 items-center">{item.name}</div>
                <div className="flex flex-1 items-center">{item.DNI}</div>
                <div className="flex flex-1 items-center">{item.email}</div>
                <div className="flex flex-1 items-center">{item.address}</div>
              </Link>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-gradient-to-tl  from-gray-700 via-gray-700 to-gray-600 border-gray-600 text-gray-200 ">
              <ContextMenuItem
                onClick={() => {
                  editClient(item);
                }}
              >
                <p>Editar</p>
                <MdEdit size={17} />
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  deleteClient(item, index);
                }}
              >
                <p>Borrar</p>
                <BiTrash size={17} />
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
      />
    </div>
  );
};

export default ListClient;
