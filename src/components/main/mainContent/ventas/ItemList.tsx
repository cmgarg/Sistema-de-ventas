import React, { ReactNode } from "react";
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

interface ItemListProps {
  ventas: object[];
  setVentas: (e: object[]) => void;
  searchActived: { actived: boolean; results: object[] };
}

const ItemList: React.FC<ItemListProps> = ({
  ventas,
  setVentas,
  searchActived,
}) => {
  //ORDENAR LISTA
  function sortList(e: string) {
    let salesToOrder = [...ventas];

    if (e === "ventas") {
      salesToOrder.sort((a: object, b: object) => b.cantidad - a.cantidad);

      setVentas([...salesToOrder]);
    }
  }
  function eliminarVenta(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-venta", id);
    deleteSaleState(id);
  }
  //elimina venta del estado
  function deleteSaleState(idSale: string) {
    const sales = [...ventas];

    const i = sales.findIndex((obj) => obj._id === idSale);

    if (i !== -1) {
      sales.splice(i, 1);
    }
    setVentas([...sales]);
    return;
  }

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
          <p className="text-center">Articulo</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 rounded-tr-lg flex items-center justify-center">
          <p className="text-center">Cantidad</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Comprador</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex justify-center items-center absolute top-0 left-0 bottom-0"></div>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${fila.articulo.idArticle}`}
                      className="flex-1 text-center"
                    >{`${fila.articulo.nombreArticulo}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.cantidad}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <Link to={`/cliente/${fila.comprador.idClient}`}>
                      {fila.comprador.nombre}
                    </Link>
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
        ) : searchActived.actived && searchActived.results.length === 0 ? (
          <TableRow>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>No hay resultados</p>
            </div>
          </TableRow>
        ) : (
          ventas.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex justify-center items-center absolute top-0 left-0 bottom-0"></div>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${fila.articulo.idArticle}`}
                      className="flex-1 text-center"
                    >{`${fila.articulo.nombreArticulo}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.cantidad}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <Link to={`/cliente/${fila.comprador.idClient}`}>
                      {fila.comprador.nombre}
                    </Link>
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

export default ItemList;
