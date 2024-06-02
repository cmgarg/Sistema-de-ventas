import React, { useState } from "react";
import NavMain from "../../navmain/NavMain";
import MenuConfig from "./MenuConfig";
import General from "./Content/General";
import AdministrarCuentas from "./Content/AdministrarCuentas";
import InfoCmg from "./Content/InfoCmg";

export default function Configuracion() {
  const [estado, setEstado] = useState("general-1");

  const contenido = () => {
    if (estado === "general-1") {
      return <General />;
    }
    if (estado === "general-2") {
      return <AdministrarCuentas />;
    }
    if (estado === "general-6") {
      return <InfoCmg />;
    }
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex">
        <div className="flex-1 text-white "><div className="flex text-4xl pl-16 ">Configuracion</div></div>
        <div className="flex-1" ><NavMain title="" children={undefined}></NavMain></div>
      </div>
      <div className=" flex-1 flex">
        <div className="flex w-1/4">
          <div className="flex flex-1 p-10 rounded-lg">
            <MenuConfig estado={estado} setEstado={setEstado}/>
          </div>
        </div>
        <div className="flex flex-1 rounded-md pt-10 pr-10 pb-10 ">
          {contenido()}
        </div>
      </div>
    </div>
  );
}
