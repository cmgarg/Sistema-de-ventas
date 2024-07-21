import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import NavMain from "../../navmain/NavMain";
import MenuConfig from "./MenuConfig";
import General from "./Content/General";
import AdministrarCuentas from "./Content/AdministrarCuentas";
import InfoCmg from "./Content/InfoCmg";
import { useDispatch, useSelector } from "react-redux";
import { cambiar } from "@/src/redux/estados/estadoTipoDeUser";
import Notificaciones from "./Content/Notificaciones";

export default function Configuracion() {
  const dispatch = useDispatch(); 
  const location = useLocation();
  const [estado, setEstado] = useState("general-1");
  const userType = useSelector((state: RootState) => state.estadoTipoDeUser.userType);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const apartado = queryParams.get('apartado');
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
  }

  useEffect(() => {
    console.log("User Type: de configuracion", userType);
  }, [userType]);

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
