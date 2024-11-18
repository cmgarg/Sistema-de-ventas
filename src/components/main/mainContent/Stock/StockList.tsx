import React, { useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeType } from "../../../../../types/types";
import VirtualizedTable from "../../tablaMain/VirtualizedTable";

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
  const formatterCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  const formatMony = (n: number) => {
    return formatterCurrency.format(n);
  };
  return (
    <div className="flex w-full h-full">
      <div className="h-full w-full relative flex flex-col p-5">
        <div className="p-2 bg-gradient-to-l rounded-t-lg  from-yellow-700 via-yellow-700 to-yellow-500 font-bold text-center flex">
          <div className="flex flex-1">
            <p>Nombre</p>
          </div>
          <div className="flex flex-1">
            <p>Precio</p>
          </div>
          <div className="flex flex-1">
            <p>Costo</p>
          </div>
          <div className="flex flex-1">
            <p>Ventas</p>
          </div>
          <div className="flex flex-1">
            <p>Codigo</p>
          </div>
        </div>
        <div className="flex-1">
          <VirtualizedTable
            className="rounded-b-lg"
            data={articles}
            renderHeader={() => <div className="absolute left-[20000px]"></div>}
            renderRow={(item, index) => (
              <Link
                to={`/articulo/${item.code}`}
                key={index}
                className="text-center h-10 flex bg-gradient-to-l px-2 from-gray-800 via-gray-800 to-gray-700 hover:brightness-125 cursor-pointer"
              >
                <div className="flex flex-1 items-center">
                  {item.article.name}
                </div>
                <div className="flex flex-1 items-center">
                  {formatMony(item.article.costo)}
                </div>
                <div className="flex flex-1 items-center">
                  {formatMony(item.article.venta)}
                </div>
                <div className="flex flex-1 items-center">
                  {item.sales.length}
                </div>
                <div className="flex flex-1 items-center">{item.code}</div>
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default StockList;
