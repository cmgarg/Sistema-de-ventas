import React, { ReactNode } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import { Link } from "react-router-dom";
import OrdenarPor from "../buttons/OrdenarPor";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../../../app/ui/context-menu";

interface ArticleListProps {
  articulos: object[];
  setArticulos: (e: object[]) => void;
  articleToEdit: { active: boolean; id: string };
  setArticleToEdit: (e: { active: boolean; id: string }) => void;
  searchActived: { actived: boolean; results: object[] };
}

const ArticleList: React.FC<ArticleListProps> = ({
  articulos,
  setArticulos,
  articleToEdit,
  searchActived,
  setArticleToEdit,
}) => {
  //ORDENAR LISTA
  function sortList(e: string) {
    let articlesToOrder = [...articulos];

    if (e === "stock") {
      articlesToOrder.sort((a: object, b: object) => b.stock - a.stock);

      setArticulos([...articlesToOrder]);
    }
  }
  function ventas(ventas: []) {
    if (!ventas) {
      return 0;
    }
    return ventas.length;
  }
  function eliminarArticle(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-articulo", id);
    deleteArticleState(id);
  }
  //elimina venta del estado
  function deleteArticleState(idSale: string) {
    const articles = [...articulos];

    const i = articles.findIndex((obj) => obj._id === idSale);

    if (i !== -1) {
      articles.splice(i, 1);
    }
    setArticulos([...articles]);
    return;
  }
  return (
    <TableMain>
      <TableHead>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Articulo</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Marca</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Costo</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Venta</p>
        </div>
        <div className="bg-slate-700 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Ventas</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${fila._id}`}
                      className="flex-1 text-center"
                    >{`${fila.articulo}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${fila.costo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${fila.venta}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{ventas(fila.ventas)}</p>
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
          articulos.map((fila) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={fila._id}>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${fila._id}`}
                      className="flex-1 text-center"
                    >{`${fila.articulo}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{fila.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${fila.costo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${fila.venta}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{ventas(fila.ventas)}</p>
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

export default ArticleList;
