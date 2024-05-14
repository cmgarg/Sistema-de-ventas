import React, { ReactElement, ReactNode, useEffect, useState } from "react";
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
import { articleData } from "../../../../../types";

interface ArticleListProps {
  articles: articleData[];
  searchActived: { actived: boolean; results: articleData[] };
  editArticleOn: (e: { active: boolean; code: string }) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  searchActived,
  editArticleOn,
}) => {
  const dispatch = useDispatch();

  const [articlesList, setArticlesList] = useState<articleData[]>([]);

  useEffect(() => {
    setArticlesList(articles);
    console.log("ARTICULOS EN LISTAAAAA", articlesList);
    console.log(articles, "|||||||||||||||||||||");
  }, [articles]);

  const editClient = (code: string) => {
    editArticleOn({ active: true, code: code });
  };

  const deleteClient = (code: string) => {
    window.api.enviarEvento("delete-article", code);
  };

  const renderRows = (articleObject: articleData): any => {
    console.log("ARTICULO CRUDO", articleObject);
    if (articleObject) {
      return (
        <ContextMenu key={articleObject.code}>
          <ContextMenuTrigger>
            <TableRow key={articleObject.code} padding={true}>
              <div className="flex justify-start flex-1 space-x-1">
                <Link
                  to={`/articulo/${articleObject.code}`}
                  className="flex-1"
                >{`${articleObject.article.name || "falopeado"}`}</Link>
              </div>
              <div className="flex justify-center items-center flex-1">
                <p>{articleObject.brand.label || "falopeado"}</p>
              </div>
              <div className="flex justify-center items-center flex-1">
                <p>${articleObject.article.costo || "falopeado"}</p>
              </div>
              <div className="flex justify-center items-center flex-1">
                <p>${articleObject.article.venta || "falopeado"}</p>
              </div>
              <div className="flex justify-end items-center flex-1">
                <p>{articleObject.sales.length}</p>
              </div>
            </TableRow>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                // edit(fila._id);
                editClient(articleObject.code);
              }}
            >
              Editar
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                deleteClient(articleObject.code);
              }}
            >
              Borrar
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    } else {
      console.log(articleObject, "ESTE ARTICULO NO SE PUDO CARGAR");
      console.log(articles, "ESTO SON LOS ARTICULOS");
    }
  };

  return (
    <TableMain>
      <TableHead>
        <div className="flex-1 flex items-center justify-start">
          <p className="text-center">Articulo</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center">Marca</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center">Costo</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center">Venta</p>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <p className="text-center">Ventas</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((articleObject) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <TableRow key={articleObject.code}>
                  <div className="flex justify-start flex-1 space-x-1">
                    <Link
                      to={`/articulo/${articleObject.code || "pene"}`}
                      className="flex-1"
                    >{`${articleObject.article.name || "falopeado"}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{articleObject.brand.label || "falopeado"}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${articleObject.article.costo || "falopeado"}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${articleObject.article.venta || "falopeado"}</p>
                  </div>
                  <div className="flex justify-end items-center flex-1 pl-2">
                    <p>{articleObject.sales.length}</p>
                  </div>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    editClient(articleObject.code);
                  }}
                >
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    deleteClient(articleObject.code);
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
          articlesList.map((articlee) => renderRows(articlee))
        )}
      </div>
    </TableMain>
  );
};

export default ArticleList;
