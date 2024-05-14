import Usuario from "../../../../../../src/assets/asidesvg/Usuario";
import ClientSvg from "../../../../../../src/assets/MAINSVGS/articlesSVG/ClientSvg";
import React, { useEffect, useRef, useState } from "react";
import FinalConsumer from "../../../../../../src/assets/MAINSVGS/articlesSVG/FinalConsumer";
import { saleData } from "../../../../../../types";
import BackArrowSvg from "../../../../../../src/assets/MAINSVGS/articlesSVG/BackArrowSvg";
import { FaQuestion } from "react-icons/fa";

interface AsideForm {
  modalClient: () => void;
  onChangeModal: (e: boolean) => void;
  subirVenta: () => void;
  saleData: saleData;
  showError: { in: string };
}

const AsideForm: React.FC<AsideForm> = ({
  modalClient,
  onChangeModal,
  subirVenta,
  saleData,
  showError,
}) => {
  const inputStyles =
    "flex space-x-2 h-12 p-2 items-center rounded-md hover:bg-gray-800 w-full";

  useEffect(() => {
    console.log(saleData, "loca loca loca");
  }, [saleData]);

  return (
    <div className="flex flex-col w-72 items-start bg-slate-950 ">
      <button
        onClick={() => onChangeModal(false)}
        className="h-10 w-10 text-2xl font-normal flex justify-center items-center mb-5 pl-2 hover:bg-slate-800"
      >
        <BackArrowSvg size={30} color="#fff" />
      </button>
      <div className="flex flex-1 w-full">
        <div className="flex flex-1 flex-col w-full px-2 font-bold">
          <button
            onClick={modalClient}
            className={`flex flex-col border-b-1 relative border-slate-900 flex-1 w-full text-xl items-center justify-center rounded-md hover:bg-slate-900 ${
              showError.in === "all" || showError.in === "buyer"
                ? "shadow-inset-cmg"
                : null
            }`}
          >
            <div
              className={`flex flex-col items-center space-y-2 relative z-40`}
            >
              <p>Comprador</p>

              {saleData.buyer.client.active ? (
                <div className="flex flex-col space-y-2">
                  <ClientSvg size={180}></ClientSvg>
                  <p className="text-teal-500">
                    {saleData.buyer.client.active
                      ? saleData.buyer.client.clientData.name
                      : "PAJA"}
                  </p>
                </div>
              ) : saleData.buyer.finalConsumer.active ? (
                <div className="flex flex-col space-y-2">
                  <FinalConsumer size={180} />

                  <p className="text-teal-500">Consumidor final</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <FaQuestion size={180} color="#fff" />

                  <p className="text-teal-500">Consumidor final</p>
                </div>
              )}
            </div>
          </button>
          <button className="flex flex-col flex-1 w-full text-xl items-center justify-center rounded-md hover:bg-slate-900">
            <div className="flex flex-col items-center space-y-2">
              <p>Vendedor</p>
              <div className="rounded-full w-32 h-32 border "></div>
              <p>Administrador</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-row h-12 w-full justify-end">
        <button
          className="flex-1 bg-red-700"
          onClick={() => {
            onChangeModal(false);
          }}
        >
          Cancelar
        </button>
        <button
          className="flex-1 bg-green-700 rounded-tr-lg"
          onClick={() => {
            subirVenta();
          }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default AsideForm;
