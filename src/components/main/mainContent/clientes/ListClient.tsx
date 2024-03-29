import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Biñeta from "../Biñeta/Biñieta";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import ContextMenuG from "../ContextMenu/ContextMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../../../app/ui/context-menu";

interface listClientProps {
  searchActived: { actived: boolean; results: object[] };
  clienteAeditar: {
    active: boolean;
    id: string;
  };
  setClienteAeditar: (e: object) => void;
}

const ListClient: React.FC<listClientProps> = ({
  searchActived,
  clienteAeditar,
  setClienteAeditar,
}) => {
  // HACEEEER QUE EL BUSCADOR FUNCIONE
  //ORDENAR LISTA
  const [clientes, setClientes] = useState<object[]>([]);
  useEffect(() => {
    window.api.recibirEvento("respuesta-obtener-clientes", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayClientes = [];
      e.map((e) => {
        arrayClientes.push(e);
      });
      setClientes(arrayClientes);
    });
  }, []);
  function agregarPrueba() {
    let arr = [];

    for (let i = 0; i < 30; i++) {
      arr.push({
        articulo: "Gaseosa",
        costo: "400",
        venta: "800",
        stock: "200",
        brand: { value: "Mocoreta", label: "Mocoreta" },
        category: { value: "Bebidas", label: "Bebidas" },
        ventas: [],
        _id: "88zOUgvxxDqZJCE3",
      });
    }

    let articulosAll = [...arr];
  }
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //ELIMINAR CLIENTES
  function editClient(clienteid: string) {
    window.api.enviarEvento("obtener-clienteById", clienteid);

    setClienteAeditar({ active: true, id: clienteid });
  }

  function eliminarCliente(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-cliente", id);
    obtenerClientes();
  }

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Nombre</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center w-52">
          <p className="text-center">Email</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center w-52">
          <p className="text-center">Direccion</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center w-52">
          <p className="text-center">DNI</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex items-center flex-1 pl-2 space-x-2">
                    <div className="flex-1 text-center hover:text-slate-400">
                      <Link to={`/cliente/${fila._id}`} className="text-center">
                        {fila.nombre}
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.email}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.direccion}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.dni}</p>
                  </div>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    editClient(fila._id);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    eliminarCliente(fila._id);
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
          clientes.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex items-center flex-1 pl-2 space-x-2">
                    <div className="flex-1 text-center hover:text-slate-400">
                      <Link to={`/cliente/${fila._id}`} className="text-center">
                        {fila.nombre}
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.email}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.direccion}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.dni}</p>
                  </div>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    editClient(fila._id);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    eliminarCliente(fila._id);
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
