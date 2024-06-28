import React, { useEffect, useState } from "react";
import Article from "./ArticlePart/Article";
import Stock from "./StockPart/Stock";
import Head from "./Head";
import Modals from "./Modals";
import { articleData, unitType } from "../../../../../../types";

type ForAddNewArticleProps = {
  onChangeModal: (e: boolean) => void;
};

const ForAddNewArticle: React.FC<ForAddNewArticleProps> = ({
  onChangeModal,
}) => {
  const [router, setRouter] = useState<string>("article");
  const [articleState, setArticleState] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      percentajeToSale: 0,
      stock: {
        amount: 0,
        unit: {
          label: "Kilogramos",
          value: "kilogramos",
          abrevUnit: "KG",
        },
        minStock: 0,
      },
      grossWeight: 0,
      liquidWeight: 0,
      wApp: false,
      wlApp: false,
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
    taxes: [],
    palette: {
      active: false,
      value: 0,
    },
  });
  const [unitsArticleForm, setUnitsArticleForm] = useState<unitType[]>([
    { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
    { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
    { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
    { value: "litros", label: "Litros", abrevUnit: "L" },
    { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
  ]);
  const setChangeData = (data: string, value: any) => {
    let valueUpper = "";
    let valueLower = "";
    if (data === "category" || data === "brand") {
      valueUpper = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      valueLower = value.toLowerCase();
    }
    const existingData = [
      "article",
      "brand",
      "costo",
      "venta",
      "stock",
      "stock-unit",
      "min-stock",
      "category",
      "subcategory",
      "description",
      "newTax",
      "deleteTax",
      "wApp",
      "wlApp",
      "grossWeight",
      "liquidWeight",
      "percentajeToSale",
      "paletteOn",
      "supplier",
      "paletteValue",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "article":
          if (/^[a-zA-Z\s]*$/.test(value)) {
            setArticleState({
              ...articleState,
              article: { ...articleState.article, name: value },
            });
          }
          break;
        case "brand":
          setArticleState({
            ...articleState,
            brand: { value: valueLower, label: valueUpper },
          });

          break;
        case "description":
          setArticleState({
            ...articleState,
            article: { ...articleState.article, description: value },
          });

          break;
        case "costo":
          if (/^[0-9.]*$/.test(value)) {
            setArticleState({
              ...articleState,
              article: {
                ...articleState.article,
                costo: value,
              },
            });
          }
          break;
        case "venta":
          if (/^[0-9.]*$/.test(value)) {
            setArticleState({
              ...articleState,
              article: { ...articleState.article, venta: value },
            });
          }
          break;
        case "stock":
          if (/^[0-9.]*$/.test(value)) {
            setArticleState({
              ...articleState,
              article: {
                ...articleState.article,
                stock: { ...articleState.article.stock, amount: value },
              },
            });
          }
          break;
        case "stock-unit":
          setArticleState({
            ...articleState,
            article: {
              ...articleState.article,
              stock: { ...articleState.article.stock, unit: value },
            },
          });
          break;
        case "min-stock":
          setArticleState({
            ...articleState,
            article: {
              ...articleState.article,
              stock: { ...articleState.article.stock, minStock: value },
            },
          });
          break;
        case "category":
          setArticleState({
            ...articleState,
            category: { value: valueLower, label: valueUpper },
          });
          break;
        case "subcategory":
          setArticleState({
            ...articleState,
            subCategory: { value: valueLower, label: valueUpper },
          });
          break;
        case "wApp":
          setArticleState({
            ...articleState,
            article: { ...articleState.article, wApp: value },
          });
          break;
        case "grossWeight":
          setArticleState({
            ...articleState,
            article: { ...articleState.article, grossWeight: value },
          });
          break;
        case "liquidWeight":
          setArticleState({
            ...articleState,
            article: { ...articleState.article, liquidWeight: value },
          });
          break;
        case "newTax":
          setArticleState({
            ...articleState,
            taxes: [...articleState.taxes, value],
          });
          break;
        case "percentajeToSale":
          setArticleState({
            ...articleState,
            article: { ...articleState.article, percentajeToSale: value },
          });
          break;
        case "wlApp":
          setArticleState({
            ...articleState,
            taxes: [...articleState.taxes, value],
          });
          break;
        case "deleteTax":
          const taxes = [...articleState.taxes];
          taxes.splice(value, 1);
          setArticleState({
            ...articleState,
            taxes: [...taxes],
          });
          break;
        case "supplier":
          setArticleState({
            ...articleState,
            supplier: value,
          });
          break;
        case "paletteOn":
          if (articleState.palette) {
            setArticleState({
              ...articleState,
              palette: { ...articleState.palette, active: value },
            });
          } else {
            let articleData = articleState;
            articleData.palette = {
              active: value,
              value: 0,
            };
          }
          break;
        case "paletteValue":
          if (articleState.palette) {
            setArticleState({
              ...articleState,
              palette: { ...articleState.palette, value: value },
            });
          } else {
            let articleData = articleState;
            articleData.palette = {
              active: true,
              value: value,
            };
          }
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  };
  const [errorToSave, setErrorToSave] = useState<{
    message: string;
    type: string;
    active: boolean;
  }>({
    message: "Error al guardar el articulo",
    type: "",
    active: false,
  });
  useEffect(() => {
    window.api.recibirEvento("error-save-article", (error) => {
      console.log("GONZALO FIJATE ACA", error);
      if (!error.active) {
        onChangeModal(false);
      }
      setErrorToSave({ ...error });
    });
    window.api.enviarEvento("get-unitsArticleForm");

    window.api.recibirEvento("response-get-unitsArticleForm", (units) => {
      const unitsAll = [...unitsArticleForm, ...units];
      setUnitsArticleForm(unitsAll);
    });
  }, []);
  useEffect(() => {
    console.log(articleState, "AVEREEE");
  }, [articleState]);

  return (
    <div className="absolute right-0 top-0 bottom-0 left-0 bg-blue-950 flex flex-col z-40 hover:bg-slate-600">
      <div className="flex h-full w-full flex-col relative z-40">
        <Head setRouter={setRouter} onChangeModal={onChangeModal} />
        <div className="flex-1 bg-slate-950 app-region-no-drag">
          {router === "article" ? (
            <Article
              articleState={articleState}
              setChangeData={setChangeData}
              errorToSave={errorToSave}
            />
          ) : router === "stock" ? (
            <Stock
              articleState={articleState}
              errorToSave={errorToSave}
              setChangeData={setChangeData}
              unitsArticleForm={unitsArticleForm}
            />
          ) : null}
        </div>
        {errorToSave.active ? (
          <Modals errorToSave={errorToSave} setErrorToSave={setErrorToSave} />
        ) : null}
      </div>
    </div>
  );
};

export default ForAddNewArticle;
