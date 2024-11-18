import React, { useEffect, useRef, useState } from "react";
import { IUser, saleData } from "../../../../../../types/types";
import { FaQuestion } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import ButtonR from "../../buttons/ButtonR";
interface AsideForm {
  onClickBuyer: (e: boolean) => void;
  onClickSeller: (e: boolean) => void;
  onChangeModal: (e: boolean) => void;
  subirVenta: () => void;
  saleState: saleData;
  errors: string[];
  userData: { userType: string; datosUsuario: IUser };
}

const AsideForm: React.FC<AsideForm> = ({
  onClickBuyer,
  onChangeModal,
  subirVenta,
  userData,
  saleState,
  errors,
  onClickSeller,
}) => {
  const inputStyles =
    "flex space-x-2 h-12 p-2 items-center rounded-md hover:bg-gray-800 w-full";

  useEffect(() => {
    console.log(saleState, "loca loca loca");
  }, [saleState]);
  useEffect(() => {
    console.log(userData, "DATA DE USUARIO");
  }, [userData]);

  return (
    <div className="flex flex-col w-52 items-start relative border-r border-gray-600">
      <div className="flex flex-1 w-full">
        <div className="flex flex-1 flex-col w-full font-bold">
          <button
            onClick={() => onClickBuyer(true)}
            className={`flex flex-col border-b-1 rounded-tl-lg bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500 border border-slate-800 relative flex-1 w-full items-center justify-center hover:brightness-125  ${
              errors.includes("ALL") || errors.includes("BUYER")
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

              {saleState.buyer.client.active ? (
                <div className="flex flex-1 items-center justify-center w-full flex-col space-y-2">
                  <FcBusinessman size={100}></FcBusinessman>
                  <p className="text-teal-500">
                    {saleState.buyer.client.active
                      ? saleState.buyer.client.clientData.name
                      : "PAJA"}
                  </p>
                </div>
              ) : saleState.buyer.finalConsumer.active ? (
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
            onClick={() => {
              if (userData.userType === "admin") {
                onClickSeller(true);
              }
            }}
            className="flex flex-col flex-1 w-full items-center bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500 justify-center hover:brightness-125"
          >
            <div className="flex flex-1 border border-slate-800 w-full flex-col justify-center items-center space-y-2 relative z-40">
              <div className="absolute top-0 text-lg italic text-slate-300 ">
                <p>VENDEDOR</p>
              </div>
              <div className="rounded-full h-20 w-20 border-2 ">
                {saleState.seller.imageUrl ? (
                  <img
                    src={saleState.seller.imageUrl}
                    alt="usuario"
                    className="h-full w-full rounded-full object-center object-cover  shadow-[0_2px_5px_rgba(0,0,0,0.50)]"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="relative w-full flex flex-col items-center">
                <p>
                  {saleState.seller
                    ? saleState.seller.username
                    : "No hay un usuario"}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-row h-10 w-full justify-end items-center space-x-2 px-2 bg-gray-700 rounded-bl-lg">
        <ButtonR
          title="Cancelar"
          height="h-7"
          width="w-24"
          bgColor="bg-gradient-to-l from-gray-800 via-gray-700 to-gray-500 text-sm"
          onClick={() => {
            onChangeModal(false);
          }}
        ></ButtonR>
        <ButtonR
          title="Vender"
          height="h-7"
          width="w-24"
          bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-sm"
          onClick={() => {
            subirVenta();
          }}
        ></ButtonR>
      </div>
    </div>
  );
};

export default AsideForm;
