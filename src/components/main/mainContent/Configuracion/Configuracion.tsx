import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import MenuConfig from "./MenuConfig";
import General from "./Content/General";
import AdministrarCuentas from "./Content/AdministrarCuentas";
import InfoCmg from "./Content/InfoCmg";
import { useDispatch, useSelector } from "react-redux";
import Notificaciones from "./Content/Notificaciones";
import { storeType } from "../../../../../types/types";

export default function Configuracion() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [estado, setEstado] = useState("general-1");
  const user = useSelector((state: storeType) => state.estadoTipoDeUser);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const apartado = queryParams.get("apartado");
    if (apartado) {
      setEstado(apartado);
    }
  }, [location.search]);

  const contenido = () => {
    if (estado === "general-1") {
      return <General />;
    }
    if (estado === "general-2") {
      return <AdministrarCuentas />;
    }
    if (estado === "general-3") {
      return <Notificaciones />;
    }
    if (estado === "general-6") {
      return <InfoCmg />;
    }
  };

  useEffect(() => {
    console.log("User Type: de configuracion", user);
  }, [user]);

  return (
    <div className="flex flex-1 flex-col max-h-full "> 
        <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag" ><NavMain title="Configuracion" children={undefined} setLoginUser={""}></NavMain></div>
      <div className="flex flex-1 h-full  p-5 space-x-5">
        <div className="flex w-56">
          <div className="flex flex-1 rounded-lg">
            <MenuConfig estado={estado} setEstado={setEstado} />
          </div>
        </div>
        <div className="flex flex-1 max-h-full rounded-md">
          {contenido()}
        </div>
      </div>
    </div>
  );
}
