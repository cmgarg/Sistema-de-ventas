import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { articleData } from "../../../../../types";
interface ArticuloInfoProps {}

const ArticuloInfo: React.FC<ArticuloInfoProps> = ({}) => {
  console.log("BUENAS TARDES");
  const formatterCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  const [article, setArticle] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      stock: {
        amount: 0,
        unit: "",
        minStock: 0,
      },
      weight: 0,
      wApp: false,
      description: "",
    },
    brand: {
      value: "",
      label: "",
    },
    code: "",
    category: {
      value: "",
      label: "",
    },
    dateToRegister: "",
    sales: [],
    taxes: [],
  });
  const { code } = useParams();

  const loadArticle = (articleTl: articleData) => {
    console.log(
      "INTENTANDO CARGAR ",
      articleTl,
      "CUANDO ARTICULO ES ",
      article
    );
    setArticle(articleTl);
  };

  function getClienteInfo() {
    window.api.enviarEvento("get-articleByCode", code);
  }
  useEffect(() => {
    getClienteInfo();
    console.log("buenas tardes");
    window.api.recibirEvento("response-get-articleByCode", (e) => {
      console.log(e, "respuesta backend");
      loadArticle(e);
    });
    console.log(article, "papanatas");
  }, []);
  useEffect(() => {
    console.log(article, "CARGADITO EL TOPITO");
  }, [article]);
  const formatMony = (n: number) => {
    return formatterCurrency.format(n);
  };
  return (
    <div className="flex flex-col flex-1 text-slate-50">
      <div className="flex-2">
        <NavMain title={`${article.article.name}`}>
          <Export></Export>
        </NavMain>
      </div>
      <div className="flex-1 flex flex-col p-1 mt-5 space-y-5 overflow-auto">
        <div className="flex border border-gray-600 rounded-lg">
          <div className="flex-1 border-r border-gray-600">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center border-b border-gray-600">
              <div className="flex-1 h-20 text-2xl text-center flex justify-start items-center border-b border-gray-600">
                <p>
                  <span>Marca: </span>
                  {article.brand.label || "nada"}
                </p>
              </div>
              <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center border-l border-gray-600">
                <p>
                  <span>Categoria: </span>
                  {article.category.label || "nada"}
                </p>
              </div>
            </div>

            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center">
              <div className="flex-1 h-20 text-2xl border-gray-600 text-center flex justify-start items-center">
                <p>
                  <span>Costo: </span>${article.article.venta || "nada"}
                </p>
              </div>
              <div className="flex-1 h-20 text-2xl border-l border-gray-600 text-center flex justify-start pl-2 items-center">
                <p>
                  <span>Venta: </span>${article.article.venta || "nada"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start border-b border-slate-800 items-center">
              <div className="flex flex-1 h-20 items-center border-b border-gray-600 space-x-2 pl-2">
                <div className="flex flex-1 border-r border-gray-600 h-full items-center">
                  <span>Stock: </span>
                  <div className="flex space-x-1">
                    <p>{article.article.stock.amount || "nada"}</p>
                    <p>{article.article.stock.unit || "nada"}</p>
                  </div>
                </div>
                <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center">
                  <p>
                    <span>Código: </span>${article.code || "nada"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start border-b border-slate-800 items-center">
              <div className="flex flex-1 h-20 items-center border-b border-gray-600 space-x-2 pl-2">
                <div className="flex flex-1 border-r border-gray-600 h-full items-center">
                  <span>Provedor: </span>
                  <div className="flex space-x-1">
                    <p>CocaCola</p>
                  </div>
                </div>
                <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center">
                  <p>
                    <span>Código: </span>${article.code || "nada"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {"SPEARACION"} */}
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="flex-1 h-full  pb-1 space-y-5 overflow-auto">
          <div className="flex flex-1 w-full h-full overflow-auto">
            <TableMain>
              <TableHead>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-start">
                  <p className="text-center">Comprador</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Comprado</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-end">
                  <p className="text-center">Comprador</p>
                </div>
              </TableHead>
              {(article.sales &&
                article.sales.map((buy) => {
                  return (
                    <TableRow key={buy.buyer._id}>
                      <div className="flex justify-start items-center flex-1 pl-2">
                        <p>
                          {buy.buyer.client.active
                            ? buy.buyer.client.clientData.name
                            : buy.buyer.finalConsumer.active
                            ? "Consumidor final"
                            : "pepe"}
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-1">
                        <p>{buy.amount.value}</p>
                        <p className="text-xs">{buy.amount.unit}</p>
                      </div>
                      <div className="flex justify-end items-center flex-1 pr-2">
                        <p>{formatMony(buy.sold)}</p>
                      </div>
                    </TableRow>
                  );
                })) ||
                "nada"}
            </TableMain>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticuloInfo;
