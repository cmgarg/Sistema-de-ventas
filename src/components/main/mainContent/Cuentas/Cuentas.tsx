import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendario";

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
        </NavMain>
      </div>
      <div className="flex flex-1 flex-row bg-slate-800">
        <div className="flex flex-1 flex-col bg-black">
          <div className=" flex flex-row bg-slate-900 h-4/6">
            <div className="flex w-1/4">
              

                <Calendar/>
              
            </div>
            <div className=" flex-1"></div>
          </div>
          <div className=" flex-1 bg-red-600"></div>
        </div>

        <div className=" flex w-1/4"></div>
      </div>
    </div>
  );
};

export default Cuentas;
