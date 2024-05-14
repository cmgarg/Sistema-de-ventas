import React, { useEffect, useRef, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";
import { articleData, saleData, storeType } from "@/types";
import { useSelector } from "react-redux";

interface CompradorVendedor {
  clientData: {
    name: string;
    email: string;
    address: string;
    phone: string;
    dni: string;
  };
}

const CompradorVendedor: React.FC<CompradorVendedor> = ({ clientData }) => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-800 to-blue-950 text-xs">
        <div className="text-2xl flex-1 flex justify-center items-end font-bold italic">
          <p>COMPRADOR</p>
        </div>
        <div className="flex justify-center flex-col flex-1">
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">{!clientData.name ? "" : "Nombre"}</p>
            <p>{clientData.name || "Nombre"}</p>
          </div>
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">
              {!clientData.phone ? "" : "Direccion"}
            </p>
            <p>{clientData.address || "Direccion"}</p>
          </div>
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">
              {!clientData.phone ? "" : "Telefono"}
            </p>
            <p>{clientData.phone || "Telefono"}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-800 to-blue-950 text-xs">
        <div className="text-2xl flex-1 flex justify-center items-end font-bold italic">
          <p>VENDEDOR</p>
        </div>
        <div className="flex justify-center flex-col flex-1">
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">{!clientData.name ? "" : "Nombre"}</p>
            <p>{clientData.name || "Nombre"}</p>
          </div>
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">
              {!clientData.phone ? "" : "Direccion"}
            </p>
            <p>{clientData.address || "Direccion"}</p>
          </div>
          <div className="w-full flex flex-col border-b-2 border-slate-400 rounded-sm">
            <p className="text-slate-400">
              {!clientData.phone ? "" : "Telefono"}
            </p>
            <p>{clientData.phone || "Telefono"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompradorVendedor;
