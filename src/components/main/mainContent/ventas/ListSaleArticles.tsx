import { saleData } from "../../../../../types/types";
import React, { ReactElement, useEffect, useState } from "react";

type ListSaleArticles = {
  formatMony: (n: number | string) => string | number;
  sale: saleData;
};

const ListSaleArticles: React.FC<ListSaleArticles> = ({ sale, formatMony }) => {
  const [deploy, setDeploy] = useState(false);
  const [itemOfList, setItemOfList] = useState<ReactElement[]>([]);

  const onChangeDeploy = () => {
    setDeploy(!deploy);
  };

  const loadItems = () => {
    const elements = sale.articles.map((article) => (
      <li className="flex justify-end items-center space-x-2 h-12 pl-2">
        <span className="flex justify-start items-center flex-1 ">
          {article.name}
        </span>
        <span className="flex justify-start items-center flex-1 h-full">
          <>{article.amount.value}</>
          <div className="text-xs h-full flex items-end pb-3">
            <p>{article.amount.unit.label}</p>
          </div>
        </span>
        <span className="flex justify-center items-center flex-1">
          {formatMony(article.total)}
        </span>
      </li>
    ));
    setItemOfList(elements);
  };

  useEffect(() => {
    loadItems();

    console.log(itemOfList, "falopeado", sale);
  }, []);

  return (
    <div
      onClick={onChangeDeploy}
      className={`flex hover:bg-slate-900 relative border-b select-none pl-2 border-slate-800 flex-row animation-spin text-slate-50 justify-center text-base items-center w-full ${
        deploy ? "bg-slate-900 " : "h-12 bg-slate-950"
      } `}
    >
      <div className={`flex justify-start items-center flex-1 h-ful space-x-2`}>
        <p>
          {sale.buyer.client.active
            ? sale.buyer.client.clientData.name
            : "Consumidor final"}
        </p>
        {deploy ? (
          <p>
            {sale.buyer.client.active
              ? sale.buyer.client.clientData.address
              : ""}
          </p>
        ) : null}
      </div>

      <ul
        className={`flex flex-1 flex-col justify-cener w-full border-slate-800 ${
          deploy ? "bg-amber-800 " : "h-12 bg-amber-950"
        }`}
      >
        {deploy ? itemOfList : itemOfList[0]}
      </ul>
      <div className={`flex justify-evenly items-center flex-1 h-full pr-2`}>
        <div className="flex-1 flex justify-center">
          <p>{formatMony(sale.sold)}</p>
        </div>
        <div className="flex-1 flex justify-end">
          <p>{sale.seller.name ? sale.seller.name : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ListSaleArticles;
