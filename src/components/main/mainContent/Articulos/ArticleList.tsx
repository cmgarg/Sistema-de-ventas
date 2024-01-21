import React, { ReactNode } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import { Link } from "react-router-dom";
import OrdenarPor from "../buttons/OrdenarPor";

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
        <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
          <p className="text-center">Articulo</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 rounded-tr-lg flex items-center justify-center">
          <p className="text-center">Marca</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Costo</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Venta</p>
        </div>
        <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Ventas</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex justify-center items-center absolute top-0 left-0 bottom-0">
                <MenuContextual2 title={<Diamong color="#fff" size="20" />}>
                  <div
                    onClick={() => {
                      eliminarArticle(fila._id);
                    }}
                    className="w-full hover:bg-gray-600 pl-2"
                  >
                    <p>Eliminar</p>
                  </div>
                  <div className="w-full hover:bg-gray-600 pl-2">
                    <p>Editar</p>
                  </div>
                </MenuContextual2>
              </div>
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
          ))
        ) : searchActived.actived && searchActived.results.length === 0 ? (
          <TableRow>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>No hay resultados</p>
            </div>
          </TableRow>
        ) : (
          articulos.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex justify-center items-center absolute top-0 left-0 bottom-0">
                <MenuContextual2 title={<Diamong color="#fff" size="20" />}>
                  <div
                    onClick={() => {
                      eliminarArticle(fila._id);
                    }}
                    className="w-full hover:bg-gray-600 pl-2"
                  >
                    <p>Eliminar</p>
                  </div>
                  <div className="w-full hover:bg-gray-600 pl-2">
                    <p>Editar</p>
                  </div>
                </MenuContextual2>
              </div>
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
          ))
        )}
      </div>
    </TableMain>
  );
};

export default ArticleList;
