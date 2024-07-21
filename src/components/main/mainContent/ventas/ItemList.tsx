import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { saleData, storeType } from "../../../../../types/types";
import { useSelector } from "react-redux";
import ListSaleArticles from "./ListSaleArticles";

type ItemListProps = {
  sales: saleData[];
  searchActived: { actived: boolean; results: object[] };
  formatMony: (number: number | string) => number | string;
};

const ItemList: React.FC<ItemListProps> = ({ sales, formatMony }) => {
  //ORDENAR LISTA
  function sortList(e: string) {
    let salesToOrder = [...sales];

    if (e === "ventas") {
    }
  }
  //elimina venta del estado

  console.log(sales, "PORPRORPROR");
  useEffect(() => {
    console.log([formatMony], "pelotudo");
  }, []);

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-start">
          <p className="text-center">Articulos</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Total vendido</p>
        </div>
        <div className="flex-1 pl-2 flex items-center justify-end">
          <div className="flex-1 flex justify-center">
            <p className="text-center">Comprador</p>
          </div>
          <div className="flex-1 flex justify-end">
            <p className="text-center">Vendedor</p>
          </div>
        </div>
      </TableHead>
      {sales.map((s) => (
        <TableRow key={s.id} deploy={true} padding={false}>
          <ListSaleArticles formatMony={formatMony} sale={s} />
        </TableRow>
      ))}
    </TableMain>
  );
};

export default ItemList;
