import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { articleData } from "../../../../../types/types";
import { PuffLoader } from "react-spinners";
import { RiRegisteredLine } from "react-icons/ri";
import { ArrowBigUp, ArrowUp } from "lucide-react";
import { IoMdArrowDropleft } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
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
      pallet: {
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
    batches: [],
    history: [],
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

  const getClienteInfo = () => {
    window.api.enviarEvento("get-articleByCode", code);
  };

  const getTotalUnitsSale = () => {
    return article.sales.reduce((total, sale) => {
      const { value, unit } = sale.amount;
      const { pallet, forBulk } = article.article;

      const totalUnit = unit.pallet
        ? value * pallet.value
        : unit.bulk
        ? value * forBulk.value
        : value * 1;

      return total + totalUnit;
    }, 0);
  };
  const getTotalSale = () => {
    return article.sales.reduce((total, sale) => {
      const totalUnit = sale.sold * 1;

      return total + totalUnit;
    }, 0);
  };
  useEffect(() => {
    getClienteInfo();

    console.log("buenas tardes");
    window.api.recibirEvento("response-get-articleByCode", (e) => {
      console.log(e, "respuesta backend");
      loadArticle(e);
    });
  }, []);
  useEffect(() => {
    console.log(article, "CARGADITO EL TOPITO");

    console.log(article, "CARGADITO EL TOPITO");
  }, [article]);
  useEffect(() => {
    console.log(
      article.sales,
      "FALOPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
  }, [article.sales]);

  const formatMony = (n: number) => {
    return formatterCurrency.format(n);
  };
  return (
    <div className="flex flex-col flex-1 h-full text-slate-50">
      {article.code !== "" ? (
        <div className="w-full">
          <NavMain title={`${article.article.name}`} setLoginUser={""}>
            <Export></Export>
          </NavMain>
        </div>
      ) : null}
      {article.code !== "" ? (
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
                  <p>{article.article.costo || "nada"}</p>
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
                    <p>{article.code || "nada"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full space-y-2">
            <div className="flex-1 flex flex-col space-y-2">
              <div className="text-2xl font-normal">
                <p>Descripcion</p>
              </div>
              <div className="text-base pl-5">
                <p>{article.article.description}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col space-y-2 border border-gray-600 h-52 pl-2 ">
              <div className="text-2xl font-normal">
                <p>Historia</p>
              </div>

              <div className="flex items-center text-base space-y-2 flex-1 relative">
                <div className="h-24 w-full  absolute ">
                  <div className="h-6 w-full bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 rounded-t-md"></div>
                </div>
                {article.history.map((history, index) => (
                  <div
                    className={`w-44 h-24 rounded-lg flex flex-col items-center relative justify-start ${
                      index < 1 ? "mr-5" : "mx-5"
                    }`}
                  >
                    <div className="h-7 w-full rounded-t-lg flex justify-center items-center relative z-50">
                      <div className="h-full px-2 flex items-center rounded-r-lg">
                        <p className="text-xs text-gray-50 font-bold">
                          {history.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex font-bold flex-col justify-center h-full w-full relative z-50 bg-[#808080ff] rounded-b-lg bg-opacity-45 pt-6">
                      <div className="absolute z-40 right-0 left-0 top-0 bottom-0 flex items-center justify-center">
                        <GiArchiveRegister
                          size={80}
                          className="text-[#707070ff]"
                        />
                      </div>
                      <div className="h-full flex flex-col px-2 relative z-50 items-center ">
                        <p className="text-xs">{history.message}</p>
                        <div className="flex">
                          <p className="text-xs">
                            Cantidad: {history.quantity}
                          </p>
                          <p className="text-[13px]">
                            {article.article.stock.unit.abrevUnit.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="w-44 h-24 rounded-lg flex flex-col items-center relative justify-start">
                  <div className="h-7 w-full rounded-t-lg flex justify-center items-center relative z-50">
                    <div className="h-full px-2 flex items-center rounded-r-lg">
                      <p className="text-xs text-gray-50 font-bold">
                        2024-09-02
                      </p>
                    </div>
                  </div>

                  <div className="flex font-bold flex-col justify-center h-full w-full relative z-50 bg-[#808080ff] rounded-b-lg bg-opacity-45 pt-6">
                    <div className="absolute z-40 right-0 left-0 top-0 bottom-0 flex items-center justify-center">
                      <IoMdArrowDropleft
                        size={80}
                        className="text-[#707070ff] rounded-full"
                      />
                    </div>
                    <div className="h-full flex flex-col px-2 relative z-50 items-center ">
                      <p className="text-xs">Ingreso</p>
                      <div className="flex">
                        <p className="text-xs">Cantidad: 520</p>
                        <p className="text-[13px]">
                          {article.article.stock.unit.abrevUnit.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {"SPEARACION"} */}
          <div className="w-full text-3xl flex space-x-2">
            <div className="pr-2 border-r border-gray-600">
              <h1>Ventas [{article.sales.length || "nada"}]</h1>
            </div>
            <div className="flex flex-1 space-x-2 text-sm h-full items-end">
              <div className="flex space-x-2 border-r border-gray-600 pr-2">
                <p>{article.article.stock.unit.label} vendidos :</p>
                <p>{getTotalUnitsSale()}</p>
              </div>
              <div className="flex space-x-2">
                <p>Total vendido :</p>
                <p>{formatMony(getTotalSale())}</p>
              </div>
            </div>
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
                  article.sales.map((buy, index) => {
                    return (
                      <TableRow key={index}>
                        <div className="flex justify-start items-center flex-1 pl-2">
                          <p>
                            {buy.buyer.client.active
                              ? buy.buyer.client.clientData.name
                              : buy.buyer.finalConsumer.active
                              ? "Consumidor final"
                              : "pepe"}
                          </p>
                        </div>
                        <div className="flex justify-center items-center flex-1 space-x-2">
                          <p>{buy.amount.value}</p>
                          <p>{buy.amount.unit.label}</p>
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
      ) : (
        <div className="text-6xl text-black absolute top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center">
          <PuffLoader size={"500"} color="gold" />
          <p className="absolute text-sm animate-pulse text-yellow-500">
            Cargando
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticuloInfo;
