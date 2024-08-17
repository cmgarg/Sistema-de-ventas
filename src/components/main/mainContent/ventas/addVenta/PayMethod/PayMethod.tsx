import React, { useEffect, useState } from "react";
import { pmType } from "../../../../../../../types/types";
import CreatePayMethod from "./CreatePayMethod";
import { IoAdd } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
type PayMethodProps = {
  setChangeData: (e: string, value: any) => void; // Define tus props aquí
  pMOk: (e: boolean) => void;
};

const PayMethod: React.FC<PayMethodProps> = ({ setChangeData, pMOk }) => {
  const [payMethodProps, setPayMethodProps] = useState<pmType[]>([]);
  const [createPayMethod, setCreatePayMethod] = useState(false);
  const [responseToCreateNewPm, setResponseToCreateNewPm] = useState<{
    show: boolean;
    saved: boolean;
  }>({
    show: false,
    saved: false,
  });
  const [pmSelect, setPmSelect] = useState<pmType>();
  const getPayMethods = () => {
    window.api.enviarEvento("get-pay-methods");
    window.api.recibirEvento("response-get-pay-methods", (payMethods) => {
      setPayMethodProps(payMethods);
    });
  };
  const acceptPm = () => {
    if (pmSelect) {
      setChangeData("payMethod", pmSelect?.name);
      pMOk(true);
      console.log("EJECUTADO");
    }
  };
  const pmSelected = (pm: pmType) => {
    setPmSelect(pm);
  };
  const onCreatePm = (e: boolean) => {
    setCreatePayMethod(e);
  };
  useEffect(() => {
    getPayMethods();
    window.api.recibirEvento("response-add-pay-method", (res) => {
      if (res.save) {
        setResponseToCreateNewPm({ show: true, saved: true });
        window.api.enviarEvento("get-pay-methods");
        setTimeout(
          () => setResponseToCreateNewPm({ show: false, saved: false }),
          3000
        );
      } else {
        setResponseToCreateNewPm({ show: true, saved: false });
        setTimeout(
          () => setResponseToCreateNewPm({ show: false, saved: false }),
          3000
        );
      }
    });
    return () => {
      window.api.removeAllListeners("response-get-pay-methods");
    };
  }, []);
  useEffect(() => {
    console.log(payMethodProps);
  }, [payMethodProps]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex flex-col borde items-center justify-center text-slate-50 text-lg border-slate-800 rounded-md z-50 backdrop-blur-sm">
      {createPayMethod && <CreatePayMethod onCreatePm={onCreatePm} />}
      {responseToCreateNewPm.show &&
        (responseToCreateNewPm.saved ? (
          <div className="h-12 border border-slate-700 bg-slate-950 absolute p-2 rounded-lg text-green-500">
            <p>Metodo creado con éxito</p>
          </div>
        ) : (
          <div className="h-12 border border-slate-700 bg-slate-950 absolute p-2 rounded-lg text-red-500">
            <p>Error al crear el metodo</p>
          </div>
        ))}
      <div className="flex w-1/2 h-1/2 bg-slate-950 border border-slate-700 flex-col px-2 rounded-lg">
        <div className="w-full h-12 flex justify-between items-center text-2xl">
          <p>METODO DE PAGO </p>
          <button
            onClick={() => onCreatePm(true)}
            className="w-7 h-7 rounded-full bg-teal-500 flex justify-center items-center"
          >
            <IoAdd size={30} />
          </button>
        </div>
        <div className="flex flex-col w-full flex-1 space-y-2 font-thin cursor-pointer">
          {payMethodProps.map((pm) => (
            <div
              onClick={() => pmSelected(pm)}
              className={`h-7 flex justify-between items-center rounded-lg px-2 bg-slate-800 text-slate-50 ${
                pmSelect?.name === pm.name
                  ? "outline outline-2 outline-amber-500"
                  : ""
              }`}
            >
              <p>{pm.name || "pene"}</p>
              <MdPayments size={30} />
            </div>
          ))}
        </div>
        <div className="h-12 w-full flex justify-end items-center">
          <button
            className="bg-green-500 rounded-lg border border-slate-700 p-1"
            onClick={acceptPm}
          >
            <p>Aceptar</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayMethod;
