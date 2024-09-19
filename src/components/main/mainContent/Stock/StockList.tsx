import React, { useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeType } from "../../../../../types/types";

interface StockListProps {
  filtersActived: { category: string; brand: string };
  searchActived: { actived: boolean; results: ArticleData[] };
}

interface ArticleData {
  article: {
    name: string;
    costo: number;
    venta: number;
    stock: {
      amount: number;
      unit: {
        abrevUnit: string;
      };
    };
  };
  code: string;
  barcode: string;
  subCategory: {
    value: string;
    label: string;
  };
  brand: {
    value: string;
    label: string;
  };
  category: {
    value: string;
    label: string;
  };
  dateToRegister: string;
}

const StockList: React.FC<StockListProps> = ({
  filtersActived,
  searchActived,
}) => {
  const articles = useSelector((state: storeType) => state.articleState);
  const [articlesFilter, setArticlesFilter] = useState<ArticleData[]>([]);
  const [articlesOrder, setArticlesOrder] = useState<ArticleData[]>([]);
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
    setArticlesOrder(articlesToOrder);
  };

  const applyFilters = () => {
    const { category, brand } = filtersActived;
    const articlesToFilter = [...articles];

    let filteredArticles: ArticleData[] = [];

    if (category !== "" && brand !== "") {
      filteredArticles = articlesToFilter.filter((article) => {
        return (
          article.category.value === category && article.brand.value === brand
        );
      });
    } else if (brand !== "") {
      filteredArticles = articlesToFilter.filter((article) => {
        return article.brand.value === brand;
      });
    } else if (category !== "") {
      filteredArticles = articlesToFilter.filter((article) => {
        return article.category.value === category;
      });
    }

    if (filteredArticles.length > 0) {
      setArticlesFilter(filteredArticles);
    }
  };

  useEffect(() => {
    if (filtersActived.brand !== "" || filtersActived.category !== "") {
      applyFilters();
    }
  }, [filtersActived]);

  useEffect(() => {
    orderArticlesFor();
  }, [optionsFilterActived]);

  return (
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
          ? articlesOrder.map((article, index) => (
              <TableRow key={index} padding={true}>
                <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                  <Link
                    to={`/articulo/${article.code}`}
                    className="flex-1 text-start"
                  >{`${article.article.name}`}</Link>
                </div>
                <div className="flex justify-center items-center flex-1">
                  <p>{article.brand.label}</p>
                </div>
                <div className="flex justify-center items-center flex-1">
                  <p>${article.article.costo}</p>
                </div>
                <div className="flex justify-end items-center flex-1 h-full">
                  <p>{article.article.stock.amount}</p>
                  <p className="text-sm h-full flex items-end py-2">
                    {article.article.stock.unit.abrevUnit}
                  </p>
                </div>
              </TableRow>
            ))
          : articlesFilter.length > 0
          ? articlesFilter.map((article, index) => (
              <TableRow key={index}>
                <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                  <Link
                    to={`/articulo/${article.code}`}
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
            ))
          : searchActived.results.map((article, index) => (
              <TableRow key={index}>
                <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
                  <Link
                    to={`/articulo/${article.code}`}
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
            ))}
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        {/* RELLENO */}
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        v
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
        <TableRow>
          <div className="flex items-center justify-start flex-1 pl-2 space-x-1">
            <Link to={`/articulo/}`} className="flex-1 text-center">{`L`}</Link>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-center items-center flex-1 pl-2">
            <p>L</p>
          </div>
          <div className="flex justify-end items-center flex-1 pl-2">
            <p>L</p>
          </div>
        </TableRow>
      </div>
    </TableMain>
  );
};

export default StockList;
