import { articleData } from "../../../../../../types";
import { useState } from "react";

import React from "react";

interface ChangeDataProps {
  // Define tus props aquí
}

const ChangeData: React.FC<ChangeDataProps> = (props) => {
  const [articleState, setArticleState] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      percentajeToSale: 0,
      stock: { amount: 0, unit: "", minStock: 0 },
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
    taxes: [],
    palette: {
      active: false,
      value: 0,
    },
  });

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

  return <div>{/* Component content here */}</div>;
};

export default ChangeData;
