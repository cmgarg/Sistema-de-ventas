import React, { useEffect, useState } from "react";
import { pmType } from "../../../../../../../types/types";
import CreatePayMethod from "./CreatePayMethod";
import { IoAdd } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import ButtonR from "../../../buttons/ButtonR";
type PayMethodProps = {
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
  setCurrentStage: (e: "factura" | "payMethod" | "saleEnd" | "close") => void;
};

const PayMethod: React.FC<PayMethodProps> = ({ dispatch, setCurrentStage }) => {
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
      dispatch({ type: "PAY_METHOD", payload: pmSelect?.name });
      setCurrentStage("saleEnd");
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
      <div className="flex w-1/2 h-1/2 bg-[#2f2f2fff] border border-gray-600 flex-col rounded-lg">
        <div className="w-full h-12 flex justify-between items-center text-2xl px-2">
          <p>METODO DE PAGO </p>
          <ButtonR
            onClick={() => onCreatePm(true)}
            height="h-7"
            width="w-32"
            bgColor="bg-gradient-to-l from-green-700 via-green-700 to-green-500"
            title="Crear metodo"
          ></ButtonR>
        </div>
        <div className="flex flex-col w-full max-h-full overflow-auto flex-1 font-thin cursor-pointer custom-scrollbar">
          {payMethodProps.map((pm, index) => (
            <div
              onClick={() => pmSelected(pm)}
              className={`h-7 flex justify-between items-center border-gray-600 px-2 bg-black ${
                index === 0 ? "rounded-t-lg" : ""
              } ${
                index < payMethodProps.length - 1 ? "border-b" : ""
              } text-slate-50 ${
                pmSelect?.name === pm.name
                  ? "bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
                  : "bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
              }`}
            >
              <p>{pm.name || "pene"}</p>
              <MdPayments size={30} />
            </div>
          ))}
        </div>
        <div className="h-12 w-full flex justify-end items-center pr-2 space-x-2">
          <ButtonR
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
            height="h-7"
            width="w-24"
            title="Volver"
            onClick={() => setCurrentStage("factura")}
          ></ButtonR>
          <ButtonR
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
            height="h-7"
            width="w-32"
            title="Aceptar"
            onClick={acceptPm}
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default PayMethod;
