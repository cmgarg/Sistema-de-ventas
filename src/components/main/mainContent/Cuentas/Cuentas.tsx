import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";

interface CuentasProps {
  //PROPS
}

const Cuentas: React.FC<CuentasProps> = (
  {
    /*PROPS*/
  }
) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Cuentas A Pagar">
          <Export></Export>
          <Agregar title="Cuenta" />
        </NavMain>
      </div>
      <div className="flex flex-1 flex-row bg-slate-800">
        <div className="flex flex-1 flex-col bg-black">
          <div className=" flex flex-row bg-slate-900 h-4/6">
            <div className="flex text-white w-1/4"></div>
            <div className=" flex-1"></div>
          </div>
        </div>

        <div className=" flex w-1/4 text-white justify-start flex-col  ">
          <div className=" h-2/5 px-5"><Calendar/></div>
          <div className=" border-white border-b-2">
            <p>Vencimiento Mensual</p>
          </div>
          <div className=" border-white border-b-2 pt-5">
            <p>Gastos Diario</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuentas;
