import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { clientData, saleData } from "../../../../../../../types/types";
import { PiPrinter } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import SelectM from "../../../Select/Select";
import BillForm from "./BillForm";
import Biñeta from "../../../Biñeta/Biñieta";
import { BiArrowBack } from "react-icons/bi";
import ButtonR from "../../../buttons/ButtonR";
type FacturaProps = {
  setCurrentStage: (e: "factura" | "payMethod" | "saleEnd" | "close") => void;
  dispatch: (action: {
    type:
      | "ARTICLES"
      | "SOLD"
      | "BUYER"
      | "SELLER"
      | "PAY_METHOD"
      | "BILL_TYPE"
      | "DELETE_ARTICLE";
    payload: any;
  }) => void;
};

const Factura: React.FC<FacturaProps> = ({ setCurrentStage, dispatch }) => {
  const [routesBill, setRoutesBill] = useState<string>("");

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex flex-col borde items-center justify-center text-slate-50 text-lg border-slate-800 rounded-md z-50 bg-[rgb(0,0,0,0.5)]">
      <div className="h-[350px] w-[600px]  flex flex-col justify-center items-center relative p-2 rounded-lg bg-[#2f2f2fff] border border-gray-600">
        {routesBill === "/billForm" ? (
          <BillForm
            setRoutesBill={setRoutesBill}
            dispatch={dispatch}
            setCurrentStage={setCurrentStage}
          />
        ) : routesBill === "/budget" ? (
          <div>
            <p>PRESUPUESTO</p>
          </div>
        ) : (
          <div className="flex flex-col w-full flex-1 relative space-y-2">
            <div className="flex flex-1 w-full space-x-2">
              <div className="flex-1 h-full bg-gradient-to-t from-sky-800 to-sky-500 rounded-lg hover:to-sky-400 hover:from-sky-700">
                <button
                  onClick={() => {
                    setRoutesBill("/billForm");
                  }}
                  className="h-full w-full flex items-center rounded-lg flex-col justify-evenly pb-5"
                >
                  <PiPrinter size={100} className="flex-1" />
                  <p>Generar factura</p>
                </button>
              </div>
              <div className="flex-1 h-full bg-gradient-to-t from-yellow-800 to-yellow-500 rounded-lg hover:to-yellow-400 hover:from-yellow-700">
                <button
                  onClick={() => {
                    dispatch({ type: "BILL_TYPE", payload: "BUDGET" });
                  }}
                  className="h-full w-full flex flex-col justify-evenly items-center pb-5"
                >
                  <FaSackDollar size={90} className="flex-1" />
                  <p>Presupuesto</p>
                </button>
              </div>
            </div>
            <div className="w-full flex justify-end pr-2">
              <ButtonR
                title="Volver"
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
                width="w-24"
                height="h-7"
                onClick={() => setCurrentStage("close")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Factura;
