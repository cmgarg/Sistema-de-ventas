import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { PiPrinter } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
type FacturaProps = {
  showOkSaveSignal: (e: {
    show: boolean;
    save: boolean;
    message: string;
  }) => void; // Define tus props aquí
  onChangeModal: (e: boolean) => void;
  subirVenta: () => void;
};

const Factura: React.FC<FacturaProps> = ({
  showOkSaveSignal,
  onChangeModal,
}) => {
  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex flex-col borde items-center justify-center text-slate-50 text-lg border-slate-800 rounded-md z-50 backdrop-blur-xl">
      <div className="h-1/2 w-1/2 bg-slate-950 flex flex-col justify-center items-center">
        <div className="flex items-center w-full flex-1 justify-center space-x-2">
          <div className="flex-1 h-5/6 bg-gradient-to-t from-sky-800 to-sky-500 rounded-lg">
            <button className="h-full w-full flex items-center flex-col justify-evenly pb-5">
              <PiPrinter size={100} className="flex-1" />
              <p>Generar factura</p>
            </button>
          </div>
          <div className="flex-1 h-5/6 bg-gradient-to-t from-yellow-800 to-yellow-500 rounded-lg">
            <button className="h-full w-full flex flex-col justify-evenly items-center pb-5">
              <FaSackDollar size={90} className="flex-1" />
              <p>Presupuesto</p>
            </button>
          </div>
        </div>

        <div className="flex w-full">
          <button
            className="flex-1 bg-cyan-800 h-10 rounded-b-lg"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Factura;
