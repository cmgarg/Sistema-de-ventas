import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { articleData, storeType } from "../../../../../types/types";
import { useSelector } from "react-redux";

interface StockListProps {
  filtersActived: { category: string; brand: string };
  searchActived: { actived: boolean; results: articleData[] };
}

const StockList: React.FC<StockListProps> = ({
  filtersActived,
  searchActived,
}) => {
  // HACEEEER QUE EL BUSCADOR FUNCIONE
  //ORDENAR LISTA
  const articles = useSelector((state: storeType) => state.articleState);
  const [articlesFilter, setArticlesFilter] = useState<articleData[]>([]);
  const [articlesOrder, setArticlesOrder] = useState<articleData[]>([]);
  const [optionsFilterActived, setOptionsFilterActived] = useState({
    costo: false,
    venta: false,
    date: false,
    stock: false,
  });

  const orderArticlesFor = () => {
    const { costo, venta, date, stock } = optionsFilterActived;
    const articlesToOrder = [...articles];

    if (costo) {
      articlesToOrder.sort((a, b) => {
        if (Number(a.article.costo) > Number(b.article.costo)) return -1;
        if (Number(a.article.costo) < Number(b.article.costo)) return 1;
        return 0;
      });
    }
    if (venta) {
      articlesToOrder.sort((a, b) => {
        if (Number(a.article.venta) > Number(b.article.venta)) return -1;
        if (Number(a.article.venta) < Number(b.article.venta)) return 1;
        return 0;
      });
    }
    if (date) {
      articlesToOrder.sort((a, b) => {
        let dateA = new Date(a.dateToRegister);
        let dateB = new Date(b.dateToRegister);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
    }
    if (stock) {
      articlesToOrder.sort((a, b) => {
        if (Number(a.article.stock.amount) > Number(b.article.stock.amount))
          return -1;
        if (Number(a.article.stock.amount) < Number(b.article.stock.amount))
          return 1;
        return 0;
      });
    }
    console.log("ME EJECUTE GONZA ", articlesToOrder);
    setArticlesOrder(articlesToOrder);
  };

  const applyFilters = () => {
    const { category, brand } = filtersActived;
    const articlesToFilter = [...articles];

    let articlesFilter: articleData[] = [];

    if (category !== "" && category !== "") {
      articlesFilter = articlesToFilter.filter((article) => {
        return (
          article.category.value == category && article.brand.value == category
        );
      });
    } else if (brand !== "") {
      articlesFilter = articlesToFilter.filter((article) => {
        return article.brand.value == brand;
      });
    } else if (category !== "") {
      articlesFilter = articlesToFilter.filter((article) => {
        return article.category.value == category;
      });
    }

    if (articlesFilter.length > 0) {
      setArticlesFilter(articlesFilter);
    }
  };

  useEffect(() => {
    if (filtersActived.brand !== "" || filtersActived.category !== "") {
      applyFilters();
    }
  }, [filtersActived]);
  useEffect(() => {
    orderArticlesFor();
    console.log(articlesOrder, "ARGENT", searchActived);
  }, [optionsFilterActived]);
  useEffect(() => {
    console.log(searchActived.results, "RESULTADOS DE LA BUSQUEDAD");
  }, [searchActived]);

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="flex-1 pl-2 flex items-center justify-start">
          <p className="text-center">Articulo</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Marca</p>
        </div>
        <div
          className="flex-1 pl-2 flex items-center justify-center"
          onClick={() => {
            setOptionsFilterActived({ ...optionsFilterActived, costo: true });
          }}
        >
          <p className="text-center">Costo</p>
        </div>
        <div
          className="flex-1 pl-2 flex items-center justify-end"
          onClick={() => {
            setOptionsFilterActived({ ...optionsFilterActived, stock: true });
          }}
        >
          <p className="text-center">Cantidad</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {!searchActived.actived
          ? articlesOrder.map((article, index) => {
              return (
                <TableRow key={index} padding={true}>
                  <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${article.article.code}`}
                      className="flex-1 text-start"
                    >{`${article.article.name}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{article.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${article.article.costo}</p>
                  </div>
                  <div className="flex justify-end items-center flex-1 pl-2">
                    <p>{article.article.stock.amount}</p>
                  </div>
                </TableRow>
              );
            })
          : articlesFilter.length > 0
          ? articlesFilter.map((article) => {
              return (
                <TableRow>
                  <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${article.article.code}`}
                      className="flex-1 text-center"
                    >{`${article.article.name}`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{article.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${article.article.costo}</p>
                  </div>
                  <div className="flex justify-end items-center flex-1 pl-2">
                    <p>{article.article.stock.amount}</p>
                  </div>
                </TableRow>
              );
            })
          : searchActived.results.map((article) => {
              return (
                <TableRow>
                  <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                    <Link
                      to={`/articulo/${article.article.code}`}
                      className="flex-1 text-center"
                    >{`${article.article.name}s`}</Link>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{article.brand.label}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>${article.article.costo}</p>
                  </div>
                  <div className="flex justify-end items-center flex-1 pl-2">
                    <p>{article.article.stock.amount}</p>
                  </div>
                </TableRow>
              );
            })}
      </div>
    </TableMain>
  );
};

export default StockList;
