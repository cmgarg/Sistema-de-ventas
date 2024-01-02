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
}

const ArticleList: React.FC<ArticleListProps> = ({
  articulos,
  setArticulos,
}) => {
  //ORDENAR LISTA
  function sortList(e: string) {
    let articlesToOrder = [...articulos];

    if (e === "stock") {
      articlesToOrder.sort((a: object, b: object) => b.stock - a.stock);

      setArticulos([...articlesToOrder]);
    }
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
        <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Stock</p>
        </div>
        <div className="w-12 h-11 bg-gray-700 rounded-lg flex justify-center items-center select-none cursor-pointer absolute right-0">
          <OrdenarPor>
            <div
              className="w-full hover:bg-gray-600"
              onClick={() => {
                sortList("stock");
              }}
            >
              <p>Stock</p>
            </div>
            <div className="w-full hover:bg-gray-600">
              <p>Mas Activos</p>
            </div>
            <div className="w-full hover:bg-gray-600">
              <p>Inactivos</p>
            </div>
          </OrdenarPor>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {articulos.map((fila) => (
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
              <p>{fila.marca}</p>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>${fila.costo}</p>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>${fila.venta}</p>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>{fila.ventas.length}</p>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>{fila.stock}</p>
            </div>
          </TableRow>
        ))}
      </div>
    </TableMain>
  );
};

export default ArticleList;
