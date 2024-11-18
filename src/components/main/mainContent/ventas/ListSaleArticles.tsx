import { saleData } from "../../../../../types/types";
import React, { ReactElement, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    const elements = sale.articles.map((article: any) => (
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
    <Accordion
      key={sale._id || sale.dateOfRegister}
      slotProps={{ heading: { component: "h4" } }}
      disableGutters
      TransitionProps={{ timeout: 0 }}
      className="w-full text-sm font-semibold border-b border-gray-600 transition-none"
      style={{
        background: "#000", // Esto reemplaza "bg-gradient-to-b from-gray-800 via-gray-800 to-gray-700"
        color: "white", // Cambia el color del texto
        margin: 0,
        transition: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} // Cambiando el color del icono
        className="w-full transition-none"
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography className="flex space-x-5 transition-none">
          <div className="border-r pr-2 border-gray-600 w-44 h-full relative flex">
            <p>
              {sale.buyer.client.active
                ? sale.buyer.client.clientData.name
                : "Consumidor final"}
            </p>
          </div>

          <div className="w-52">
            <p className="text-yellow-500">
              Vendido:{" "}
              <span className="text-green-500">{formatMony(sale.sold)}</span>
            </p>
          </div>
          <div>
            <p>{sale.dateOfRegister}</p>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-900 flex flex-col transition-none">
        <div className="w-full text-xs text-gray-400 border-b border-gray-600 flex">
          <div className="flex-1 flex justify-start">
            <p>Producto</p>
          </div>
          <div className="flex-1 flex justify-center">
            <p>Cantidad</p>
          </div>
          <div className="flex-1 flex justify-center">
            <p>Total</p>
          </div>
        </div>
        {sale.articles.map((article) => (
          <div key={article.code} className="w-full flex justify-between">
            <div className="flex-1 flex justify-start">
              <p>{article.name}</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>{article.amount.value}</p>
              <p className="ml-2">{article.amount.unit.label}</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p className="ml-2">{formatMony(article.total)}</p>
            </div>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ListSaleArticles;
