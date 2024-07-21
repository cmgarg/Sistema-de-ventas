import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { articleData } from "../../../../../types/types";
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
      profit: 0,
      stock: {
        amount: 0,
        unit: {
          label: "Kilogramos",
          value: "kilogramos",
          abrevUnit: "KG",
        },
        minStock: 0,
      },
      grossWeight: { value: 0, approx: false },
      liquidWeight: { value: 0, approx: false },
      forBulk: {
        active: false,
        value: 0,
      },
      palette: {
        active: false,
        value: 0,
      },
      quantityperunit: {
        active: false,
        value: 0,
      },
      description: "",
    },
    brand: { value: "", label: "" },
    code: "",
    category: { value: "", label: "" },
    subCategory: { value: "", label: "" },
    dateToRegister: "",
    sales: [],
    supplier: {
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
    barcode: "",
    taxes: [],
    deposits: [],
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
    <div className="flex flex-col flex-1 h-full text-slate-50">
      <div className="w-full">
        <NavMain title={`${article.article.name}`}>
          <Export></Export>
        </NavMain>
      </div>
      <div className="h-full flex flex-col p-1 mt-5 space-y-5 overflow-auto font-thin">
        <div className="flex border border-gray-600 rounded-lg">
          <div className="flex-1 border-r border-gray-600">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center border-b border-gray-600">
              <div className="flex-1 h-20 text-2xl flex-col text-center flex justify-center items-center border-b border-gray-600">
                <span className="font-bold">Marca</span>
                <p>{article.brand.label || "nada"}</p>
              </div>
              <div className="flex-1 h-20 text-2xl text-center flex justify-center flex-col pl-2 items-center border-l border-gray-600">
                <span className="font-bold">Categoria</span>
                <p>{article.category.label || "nada"}</p>
              </div>
            </div>

            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-2 items-center">
              <div className="flex-1 h-20 flex-col text-2xl border-gray-600 text-center flex justify-center items-center">
                <span className="font-bold">Costo</span>
                <p>{article.article.venta || "nada"}</p>
              </div>
              <div className="flex-1 h-20 flex-col text-2xl border-l border-gray-600 text-center flex justify-center pl-2 items-center">
                <span className="font-bold">Venta</span>
                <p>{article.article.venta || "nada"}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start border-b border-slate-800 items-center">
              <div className="flex flex-1 h-20 items-center border-b border-gray-600 space-x-2 pl-2">
                <div className="flex flex-1 flex-col border-r border-gray-600 h-full justify-center items-center">
                  <span className="font-bold">Stock</span>
                  <div className="flex space-x-1">
                    <p>{article.article.stock.amount || "nada"}</p>
                    <p>{article.article.stock.unit.label || "nada"}</p>
                  </div>
                </div>
                <div className="flex-1 flex-col h-20 text-2xl text-center flex justify-center pl-2 items-center">
                  <span className="font-bold">Código barras</span>
                  <p>{article.barcode || "nada"}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start border-b border-slate-800 items-center">
              <div className="flex flex-1 h-20 items-center border-b border-gray-600 space-x-2 pl-2">
                <div className="flex flex-1 flex-col border-r border-gray-600 h-full items-center justify-center">
                  <span className="font-bold">Provedor</span>
                  <div className="flex space-x-1">
                    <p>{article.supplier.name}</p>
                  </div>
                </div>
                <div className="flex-1 h-20 flex-col text-2xl text-center flex justify-center pl-2 items-center">
                  <span className="font-bold">Codigo </span>
                  <p>${article.code || "nada"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-2">
          <div className="text-2xl font-normal">
            <p>Descripcion</p>
          </div>
          <div className="text-base pl-5">
            <p>{article.article.description}</p>
          </div>
        </div>
        <div className="w-full ">
          <div className="text-2xl font-bold">
            <p>Depositos</p>
          </div>
          <div className="flex space-x-2 h-32">
            {article.deposits.map((dep) => (
              <div className="w-1/5 rounded-lg border border-slate-600 flex p-2 flex-col items-start h-full text-xl justify-evenly font-normal">
                <div>
                  <p>{dep.name}</p>
                </div>
                <div>{dep.sector.name}</div>
                <div>
                  <p>Direccion: {dep.address || "PITOLOCO"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* {"SPEARACION"} */}
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>
        <div className="w-full text-3xl">
          <h1>Ventas [{article.sales.length || "nada"}]</h1>
        </div>

        <div className="flex-1 h-52 max-h-80  pb-1 space-y-5">
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
                    <TableRow
                      key={
                        buy.buyer.client.active
                          ? buy.buyer.client.clientData.name
                          : buy.buyer.finalConsumer.cae
                      }
                    >
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
