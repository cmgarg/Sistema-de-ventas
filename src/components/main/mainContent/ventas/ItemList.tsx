import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";
import { saleData, storeType } from "../../../../../types/types";
import { useSelector } from "react-redux";
import ListSaleArticles from "./ListSaleArticles";
import VirtualizedTable from "../../tablaMain/VirtualizedTable";

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
    <div className="h-full w-full">
      <VirtualizedTable
        className="rounded-lg overflow-hidden"
        data={sales}
        renderHeader={() => (
          <div className="p-2 bg-gradient-to-l rounded-t-lg  from-yellow-700 via-yellow-700 to-yellow-500 font-bold text-center flex">
            <div className="flex w-52">
              <p>Comprador</p>
            </div>
            <div className="flex w-52">
              <p>Vendido</p>
            </div>
            <div className="flex pl-2">
              <p>Fecha</p>
            </div>
          </div>
        )}
        renderRow={(item, index) => (
          <ListSaleArticles formatMony={formatMony} sale={item} />
        )}
      />
    </div>
  );
};

export default ItemList;

{
  /* <TableMain>
<TableHead>
  <div className="flex-1 flex space-x-5">
    <div className="w-44 pl-2 rounded-tl-lg flex items-center justify-start">
      <p className="text-center text-sm">Comprador</p>
    </div>
    <div className="w-52 pl-2 rounded-tl-lg flex items-center justify-start">
      <p className="text-center text-sm">Total de compra</p>
    </div>
    <div className=" pl-2 rounded-tl-lg flex items-center justify-start">
      <p className="text-center text-sm">Fecha</p>
    </div>
  </div>
</TableHead>
{sales.map((s) => (
  <TableRow key={s.id} deploy={true} padding={false}>
    <ListSaleArticles formatMony={formatMony} sale={s} />
  </TableRow>
))}
</TableMain> */
}
