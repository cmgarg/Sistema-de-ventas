import React, { useEffect, useRef, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";
import {
  articleData,
  saleData,
  storeType,
  unitType,
} from "../../../../../../types/types";
import { useSelector } from "react-redux";
import ClientSvg from "../../../../../../src/assets/MAINSVGS/articlesSVG/ClientSvg";
import FinalConsumer from "../../../../../../src/assets/MAINSVGS/articlesSVG/FinalConsumer";

interface ListaProductos {
  deleteOfList: (i: any) => void;
  listProduct: {
    name: string;
    code?: string;
    total: string | number;
    amount: { value: string | number; unit: string };
  }[];
  estilosInput: string;
  articles: articleData[];
  addProduct: (e: {
    name: string;
    code: string;
    total: string;
    amount: {
      value: string;
      unit: string;
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
            <div className="flex-1  flex justify-center items-center">
              <p>{e.name}</p>
            </div>
            <div className="flex-1  flex justify-center">
              <div className="flex">
                <p>{e.amount.value}</p>
                <div className="text-sm flex items-end">
                  <p>{e.amount.unit}</p>
                </div>
              </div>
            </div>

            <div className="flex-1  text-cyan-300 flex justify-center ">
              <p>{formatMony(Number(e.total))}</p>
            </div>
            <div className="absolute right-0" onClick={() => deleteOfList(i)}>
              <p>Borrar</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
