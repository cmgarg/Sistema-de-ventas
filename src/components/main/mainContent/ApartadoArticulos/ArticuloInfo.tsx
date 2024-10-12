import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { articleData, depositType } from "../../../../../types/types";
import { isArray } from "lodash";
import { PuffLoader } from "react-spinners";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  });
  const [deposits, setDeposits] = useState<
    {
      name: string;
      address: string;
      sectors: {
        nameSector: string;
        amount: string;
        saveUnit: string;
      }[];
    }[]
  >([]);
  const { code } = useParams();

  const loadArticle = (articleTl: articleData) => {
    console.log(
      "INTENTANDO CARGAR ",
      articleTl,
      "CUANDO ARTICULO ES ",
      article
    );
    setTimeout(() => setArticle(articleTl), 800);
  };

  function getClienteInfo() {
    window.api.enviarEvento("get-articleByCode", code);
  }
  const loadDeposits = (e: depositType[], article: articleData) => {
    let array = [];
    console.log("CARGANDO DEPOSITOPS", e, article);
    e.forEach((deposit: depositType) => {
      console.log("INICIANDO BUCLE");
      let arraySectors = [];
      let existArticleInDeposit = false;
      deposit.sectors.forEach((sector) => {
        sector.products.forEach((product) => {
          if (product.article.code === article.code) {
            console.log(
              "ARTICULO ENTONCTRADO, PROCEDIENDO AL MAPEADO",
              deposit.name
            );
            existArticleInDeposit = true;
            arraySectors.push({
              nameSector: sector.name,
              amount: product.amount.value,
              saveUnit: product.amount.saveCount,
            });
          }
        });
      });
      if (existArticleInDeposit) {
        array.push({
          name: deposit.name,
          address: deposit.address,
          sectors: [...arraySectors],
        });
      }
    });
    console.log("CARGANDO ESTADO DEPOSITS CON ", array);
    setDeposits([...array]);
  };
  const getDeposits = () => window.api.enviarEvento("get-deposits");
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
    getDeposits();

    window.api.recibirEvento("response-get-deposits", (response) => {
      console.log("RESPONDEN DE GET DEPOSITS", response);
      if (isArray(response)) {
        console.log("SE LLEGA ACA");
        loadDeposits(response, article);
      }
    });
  }, [article]);
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
          <div className="w-full px-2">
            <div className="text-2xl font-bold">
              <p>Depositos</p>
            </div>
            <div className="flex w-full flex-col ">
              {deposits.map((dep) => (
                <Accordion
                  key={dep.name}
                  slotProps={{ heading: { component: "h4" } }}
                  className="w-full text-sm border border-gray-600 font-semibold bg-yellow-500"
                  style={{
                    background: "#000", // Esto reemplaza "bg-gradient-to-b from-gray-800 via-gray-800 to-gray-700"
                    color: "white", // Cambia el color del texto
                    border: "1px solid #4a5568", // Color del borde
                    margin: 0,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} // Cambiando el color del icono
                    className="w-full"
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography className="flex space-x-5">
                      <p className="border-r pr-2 border-gray-600">
                        {dep.name}
                      </p>
                      <p className="text-yellow-500">
                        Direccion: {dep.address}
                      </p>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-gray-950 flex flex-col">
                    <div className="w-full text-xs text-gray-400 border-b border-gray-600 flex">
                      <div className="flex-1 flex justify-start">
                        <p>Sector</p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <p>Cantidad</p>
                      </div>
                    </div>
                    {dep.sectors.map((sector) => (
                      <div
                        key={sector.nameSector}
                        className="w-full flex justify-between"
                      >
                        <div className="flex-1 flex justify-start">
                          <p>{sector.nameSector}</p>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <p>{sector.amount}</p>
                          <p className="ml-2">
                            {(sector.saveUnit === "xPalet" && "Palets") ||
                              (sector.saveUnit === "xBulk" && "Bultos") ||
                              sector.saveUnit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
          {/* {"SPEARACION"} */}
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
