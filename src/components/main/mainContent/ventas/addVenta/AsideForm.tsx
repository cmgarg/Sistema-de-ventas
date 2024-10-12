import React, { useEffect, useRef, useState } from "react";
import { saleData } from "../../../../../../types/types";
import { FaQuestion } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
interface AsideForm {
  onClickBuyer: (e: boolean) => void;
  onClickSeller: (e: boolean) => void;
  onChangeModal: (e: boolean) => void;
  subirVenta: () => void;
  saleData: saleData;
  showError: { in: string };
  userData: any;
}

const AsideForm: React.FC<AsideForm> = ({
  onClickBuyer,
  onChangeModal,
  subirVenta,
  userData,
  saleData,
  showError,
  onClickSeller,
}) => {
  const inputStyles =
    "flex space-x-2 h-12 p-2 items-center rounded-md hover:bg-gray-800 w-full";

  useEffect(() => {
    console.log(saleData, "loca loca loca");
  }, [saleData]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="flex flex-col w-52 items-start relative border-r border-gray-600">
      <div className="flex flex-1 w-full">
        <div className="flex flex-1 flex-col w-full font-bold">
          <button
            onClick={() => onClickBuyer(true)}
            className={`flex flex-col border-b-1 bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500 border border-slate-800 relative flex-1 w-full items-center justify-center hover:brightness-125  ${
              showError.in === "all" || showError.in === "buyer"
                ? "shadow-inset-cmg"
                : null
            }`}
          >
            <div
              className={`flex flex-1 w-full flex-col items-center space-y-2 relative z-40`}
            >
              <div className="absolute top-0 text-lg italic text-slate-300">
                <p>COMPRADOR</p>
              </div>

              {saleData.buyer.client.active ? (
                <div className="flex flex-1 items-center justify-center w-full flex-col space-y-2">
                  <FcBusinessman size={100}></FcBusinessman>
                  <p className="text-teal-500">
                    {saleData.buyer.client.active
                      ? saleData.buyer.client.clientData.name
                      : "PAJA"}
                  </p>
                </div>
              ) : saleData.buyer.finalConsumer.active ? (
                <div className="flex flex-1 items-center justify-center w-full flex-col space-y-2">
                  <FaBasketShopping size={100} className="text-rose-500" />

                  <p className="text-teal-500">Consumidor final</p>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center w-full flex-col space-y-2">
                  <FaQuestion size={100} />
                </div>
              )}
            </div>
          </button>
          <button
            onClick={() => onClickSeller(true)}
            className="flex flex-col flex-1 w-full items-center bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500 justify-center hover:brightness-125"
          >
            <div className="flex flex-1 border border-slate-800 w-full flex-col justify-center items-center space-y-2 relative z-40">
              <div className="absolute top-0 text-lg italic text-slate-300">
                <p>VENDEDOR</p>
              </div>
              <div className="rounded-full h-20 w-20 border-2 ">
                {saleData.seller.image ? (
                  <img
                    src={saleData.seller.image}
                    alt="usuario"
                    className="h-full w-full rounded-full object-center object-cover"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="relative w-full flex flex-col items-center">
                <p>
                  {saleData.seller ? saleData.seller.name : "No hay un usuario"}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-row h-10 w-full justify-end space-x-2 p-1">
        <button
          className="flex-1 bg-red-700 rounded-lg border border-slate-800"
          onClick={() => {
            onChangeModal(false);
          }}
        >
          Cancelar
        </button>
        <button
          className="flex-1 bg-green-700 rounded-lg border border-slate-800"
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
