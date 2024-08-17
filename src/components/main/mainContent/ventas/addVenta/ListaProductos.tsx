import React, { useEffect, useRef, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";
import {
  articleData,
  saleData,
  storeType,
  unitType,
} from "../../../../../../types/types";
import { NumericFormat } from "react-number-format";
import { TrashIcon } from "@radix-ui/react-icons";

interface ListaProductos {
  deleteOfList: (i: any) => void;
  listProduct: {
    name: string;
    code?: string;
    total: string | number;
    amount: {
      value: string | number;
      unit: { label: string; palette: boolean; bulk: boolean };
    };
  }[];
  estilosInput: string;
  articles: articleData[];
  addProduct: (article: {
    name: string;
    code?: string;
    total: string;
    amount: {
      value: string;
      unit: { label: string; palette: boolean; bulk: boolean };
    };
  }) => void;
  showError: { in: string };

  formatMony: (m: number) => string;
}

const ListaProductos: React.FC<ListaProductos> = ({
  listProduct,
  deleteOfList,
  estilosInput,
  articles,
  addProduct,
  formatMony,
  showError,
}) => {
  const abreviationUnit = (unit: string) => {
    let abreviation = "";
    const units = ["kilogramos", "unidades", "litros", "paquetes", "cajas"];
    if (units.includes(unit.toLowerCase())) {
      console.log("MATANGA");
      switch (unit.toLowerCase()) {
        case "kilogramos":
          abreviation = "Kg";
          break;
        case "unidades":
          abreviation = "Ud";
          break;
        case "litros":
          abreviation = "L";
          break;
        case "paquetes":
          abreviation = "Paq";
          break;
        case "cajas":
          abreviation = "Caj";
          break;

        default:
          break;
      }
    }
    return abreviation;
  };
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="bg-slate-950 border-b-1 border-l-1 border-gray-600">
        <MenuArticlesForm
          style={estilosInput}
          articles={articles}
          addProduct={addProduct}
        />
      </div>
      <ul
        className={`overflow-auto flex-1 relative custom-scrollbar ${
          showError.in === "all" || showError.in === "articles"
            ? "shadow-inset-cmg shadow-red-600"
            : null
        }`}
      >
        <li className="w-full flex flex-row h-12 text-2xl bg-teal-900 sticky top-0 z-40">
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Articulo</p>
          </div>
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Cantidad</p>
          </div>
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Total</p>
          </div>
        </li>
        {listProduct.map((e, i) => (
          <li className="w-full flex h-12 text-2xl bg-teal-950 items-center relative">
            <div className="flex-1  flex justify-start pl-2 items-center">
              <p>{e.name}</p>
            </div>
            <div className="flex-1  flex justify-center">
              <div className="flex">
                <p>{e.amount.value}</p>
                <div className="text-sm flex items-end">
                  <p>{e.amount.unit.label}</p>
                </div>
              </div>
            </div>

            <div className="flex-1  text-cyan-300 flex justify-center ">
              <NumericFormat
                allowLeadingZeros
                allowedDecimalSeparators={[".", "."]}
                value={e.total}
                decimalScale={2}
                thousandSeparator=","
                displayType={"text"}
                className="text-2xl text-green-400 font-bold"
                prefix={"$"}
                renderText={(formattedValue) => <div>{formattedValue}</div>}
              />
            </div>
            <div
              className="absolute right-2 cursor-pointer"
              onClick={() => deleteOfList(i)}
            >
              <TrashIcon className="h-7 w-7 bg-slate-950 border border-red-500 text-red-500 hover:text-red-200 hover:bg-red-500 rounded-full p-[2px]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
