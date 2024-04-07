import React, { ReactNode, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { articleData } from "@/types";

interface ArticleListProps {
  articles: articleData[];
  searchActived: { actived: boolean; results: articleData[] };
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  searchActived,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(articles, "|||||||||||||||||||||");
  }, []);

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
          searchActived.results.map((articleObject) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={articleObject.article.code || "PENE"}>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${articleObject.article.code || "pene"}`}
                      className="flex-1 text-center"
                    >{`${articleObject.article.name}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{articleObject.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${articleObject.article.costo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${articleObject.article.venta}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{articleObject.sales.length}</p>
                  </div>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    // editClient(fila._id);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    // eliminarCliente(fila._id);
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
          articles.map(({ article, brand, sales }) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={article.code || "PENE"}>
                  <div className="flex items-center flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${article.code || "PENE"}`}
                      className="flex-1 text-center"
                    >{`${article.name}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${article.costo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${article.venta}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{sales.length}</p>
                  </div>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    // edit(fila._id);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    // eliminarArticle(fila._id);
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
