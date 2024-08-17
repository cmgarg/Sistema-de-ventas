import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { clientData, saleData } from "../../../../../../../types/types";
import { PiPrinter } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import SelectM from "../../../Select/Select";
import BillForm from "./BillForm";
import Biñeta from "../../../Biñeta/Biñieta";
import { BiArrowBack } from "react-icons/bi";
type FacturaProps = {
  showOkSaveSignal: (e: {
    show: boolean;
    save: boolean;
    message: string;
  }) => void; // Define tus props aquí
  setChangeData: (data: string, value: any) => void;
  facturaOk: boolean;
  setFacturaOk: (e: boolean) => void;
  saleData: saleData;
  subirVenta: () => void;
};

const Factura: React.FC<FacturaProps> = ({
  showOkSaveSignal,
  setFacturaOk,
  saleData,
  facturaOk,
  setChangeData,
}) => {
  const [routesBill, setRoutesBill] = useState<string>("");
  const [generateBill, setGenerateBill] = useState(true);
  const [facturaPresupuesto, setFacturaPresupuesto] = useState(false);
  //FACTURA DATA
  const [facturaData, setFacturaData] = useState<{
    type: string;
    sale: saleData;
  }>({
    type: "",
    sale: {
      articles: [],
      buyer: {
        client: {
          active: false,
          clientData: {
            name: "",
            email: "",
            address: "",
            phone: "",
            dni: "",
            _id: "",
          },
        },
        finalConsumer: {
          active: false,
          cae: "",
        },
      },
      seller: {
        name: "",
        id: "",
        image: "",
      },
      sold: 0,
    },
  });
  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex flex-col borde items-center justify-center text-slate-50 text-lg border-slate-800 rounded-md z-50 backdrop-blur-sm">
      <div className="h-1/2 w-1/2 flex flex-col justify-center items-center relative">
        {routesBill === "/billForm" ? (
          <BillForm
            saleData={saleData}
            setRoutesBill={setRoutesBill}
            setChangeData={setChangeData}
            setFacturaOk={setFacturaOk}
            facturaOk={facturaOk}
          />
        ) : routesBill === "/budget" ? (
          <div>
            <p>PRESUPUESTO</p>
          </div>
        ) : (
          <div className="flex items-center w-full flex-1 justify-center space-x-2 relative">
            <div className="absolute bottom-full left-0">
              <Biñeta title="Volver" bg="bg-amber-900">
                <BiArrowBack
                  size={30}
                  className="text-blue-50 hover:text-blue-50 cursor-pointer select-none"
                  onClick={() =>
                    showOkSaveSignal({ show: false, save: false, message: "" })
                  }
                />
              </Biñeta>
            </div>
            <div className="flex-1 h-5/6 bg-gradient-to-t from-sky-800 to-sky-500 rounded-lg">
              <button
                onClick={() => {
                  setRoutesBill("/billForm");
                }}
                className="h-full w-full flex items-center flex-col justify-evenly pb-5"
              >
                <PiPrinter size={100} className="flex-1" />
                <p>Generar factura</p>
              </button>
            </div>
            <div className="flex-1 h-5/6 bg-gradient-to-t from-yellow-800 to-yellow-500 rounded-lg">
              <button
                onClick={() => {
                  setChangeData("billType", "BUDGET");
                }}
                className="h-full w-full flex flex-col justify-evenly items-center pb-5"
              >
                <FaSackDollar size={90} className="flex-1" />
                <p>Presupuesto</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Factura;
