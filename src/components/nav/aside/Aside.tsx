import React, { useEffect, useRef, useState } from "react";
import { TbWorld, TbBrandGoogleAnalytics, TbFileDollar } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "./Tooltip.js";
import { To, useLocation, useNavigate } from "react-router-dom";
import GoTo from "./GoTo.js";
import {
  IoPerson,
  IoSettingsOutline,
  IoSettingsSharp,
  IoPersonOutline,
} from "react-icons/io5";
import { BsBoxSeamFill, BsBoxSeam } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { TfiWorld } from "react-icons/tfi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import {
  PiCashRegisterLight,
  PiCashRegisterFill,
  PiCurrencyDollarLight,
  PiCurrencyDollarBold,
} from "react-icons/pi";
import { RiShoppingBag4Line, RiShoppingBag4Fill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { LuMenu } from "react-icons/lu";
import { RootState } from "../../../redux/store.js";

export default function Aside() {
  const location = useLocation();
  const [expand, setExpand] = useState<boolean>(false);
  const userType = useSelector(
    (state: RootState) => state.estadoTipoDeUser.userType
  );

  const menuState = useSelector((state: any) => state.menuState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "articulos") {
    }
  }, [menuState]);

  console.log(menuState, "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

  
    const navigate = useNavigate();
  
    const handleRedirect = (dire: To) => {
      navigate(dire);
    };


  /////////////////////////si clickea fuera se cierra
  const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setExpand(false); // Cierra el menú si se hace clic fuera
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div
    ref={menuRef}
      className={`flex relative border-t border-black bg-[#2f2f2fff]`}
    >
      <div className={`h-full flex items-center z-50 bg-[#2f2f2fff] ${expand? "": "shadow-[2px_0px_15px_-3px_rgba(0,0,0,0.6)]"} `}>
        <div className={` flex flex-col h-full items-center `}>
          <div className="flex flex-col">
            <div
              className={`flex flex-row  justify-center items-center cursor-pointer select-none w-full `}
            >
              <div
                className={` flex justify-center items-center select-none h-10`}
                onClick={() => setExpand(!expand)}
              >
                {expand ? (
                  <TiThMenu size={30} color="#fff" />
                ) : (
                  <Tooltip content="Menu">
                    <LuMenu size={30} color="#fff" />
                  </Tooltip>
                )}
              </div>
            </div>
            {userType === "stock" ? null : (
              <div className="select-none h-10">
                <GoTo title="Clientes" goTo="/" expand={expand}>
                  {location.pathname == "/" ? (
                    <IoPerson size={30} />
                  ) : (
                    <IoPersonOutline size={30} />
                  )}
                </GoTo>
              </div>
            )}
            {userType === "stock" ? null : (
              <div className="select-none h-10">
                <GoTo title="Articulos" goTo="/articulos" expand={expand}>
                  {location.pathname == "/articulos" ? (
                    <RiShoppingBag4Fill size={30} />
                  ) : (
                    <RiShoppingBag4Line size={30} />
                  )}
                </GoTo>
              </div>
            )}
            {userType === "stock" ? null : (
              <div className="h-10">
                <GoTo title="Ventas" goTo="/ventas" expand={expand}>
                  {location.pathname == "/ventas" ? (
                    <PiCurrencyDollarBold size={35} />
                  ) : (
                    <PiCurrencyDollarLight size={35} />
                  )}
                </GoTo>
              </div>
            )}
            <div className="h-10">
              <GoTo title="Stock" goTo="/stock" expand={expand}>
                {location.pathname == "/stock" ? (
                  <BsBoxSeamFill size={30} />
                ) : (
                  <BsBoxSeam size={30} />
                )}
              </GoTo>
            </div>
            {userType === "ventas " || userType === "admin" ? (
              <div className="h-10">
                <GoTo title="Caja" goTo="/caja" expand={expand}>
                  {location.pathname == "/caja" ? (
                    <PiCashRegisterFill size={35} />
                  ) : (
                    <PiCashRegisterLight size={35} />
                  )}
                </GoTo>
              </div>
            ) : null}
            {userType === "ventas " || userType === "admin" ? (
              <div className="h-10">
                <GoTo title="Cuentas" goTo="/cuentas" expand={expand}>
                  {location.pathname == "/cuentas" ? (
                    <FaFileInvoiceDollar size={30} />
                  ) : (
                    <TbFileDollar size={30} />
                  )}
                </GoTo>
              </div>
            ) : null}

            {userType === "ventas " ||
            userType === "admin" ||
            userType === "gerente" ? (
              <div className="h-10">
                <GoTo title="Estadisticas" goTo="/estadisticas" expand={expand}>
                  {location.pathname == "/estadisticas" ? (
                    <SiGoogleanalytics size={30} />
                  ) : (
                    <TbBrandGoogleAnalytics size={30} />
                  )}
                </GoTo>{" "}
              </div>
            ) : null}

            {userType === "ventas " || userType === "admin" ? (
              <div className="h-10">
                <GoTo title="Navegador" goTo="/navegador" expand={expand}>
                  {location.pathname == "/navegador" ? (
                    <TbWorld size={35} />
                  ) : (
                    <TfiWorld size={30} />
                  )}
                </GoTo>{" "}
              </div>
            ) : null}
          </div>
          <div className="h-10 w-full absolute bottom-0">
            {" "}
            <GoTo title="Configuracion" goTo="/configuracion" expand={expand}>
              {location.pathname == "/configuracion" ? (
                <IoSettingsSharp size={30} />
              ) : (
                <IoSettingsOutline size={30} />
              )}
            </GoTo>
          </div>
        </div>
      </div>
      {expand ? (
        <div
          className={`${
            expand ? "block" : "hidden"
          } flex h-full w-28 bg-[#2f2f2fff] transition-all duration-300 absolute left-full z-30 shadow-[2px_0px_15px_-3px_rgba(0,0,0,0.6)]`}
        >
          <div className="flex flex-col w-full h-full">
            
            <div className={`flex w-full h-10 items-center justify-center font-semibold border-gray-600 border-b-1 select-none ${location.pathname == "/" ? null :"hover:text-yellow-400 cursor-pointer"}`}
            onClick={() => setExpand(!expand)}>
              Menu
            </div>
            <div
             onClick={()=> handleRedirect("/")}
              className={`flex w-full h-10 items-center pl-2 select-none ${location.pathname == "/" ? null :"hover:text-yellow-400 cursor-pointer"}  ${
                location.pathname == "/"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500 "
                  : null
              }`}
            >
              Clientes
            </div>
            <div
             onClick={()=> handleRedirect("/articulos")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/articulos" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/articulos"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Articulos
            </div>
            <div
             onClick={()=> handleRedirect("/ventas")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/ventas" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/ventas"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Ventas
            </div>
            <div
             onClick={()=> handleRedirect("/stock")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/stock" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/stock"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Stock
            </div>
            <div
            onClick={()=> handleRedirect("/caja")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/caja" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/caja"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Caja
            </div>
            <div
            onClick={()=> handleRedirect("/cuentas")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/cuentas" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/cuentas"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Cuentas
            </div>
            <div
            onClick={()=> handleRedirect("/estadisticas")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/estadisticas" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/estadisticas"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Estadistica
            </div>
            <div
            onClick={()=> handleRedirect("/navegador")}
              className={`flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/navegador" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/navegador"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Navegador
            </div>
            <div
            onClick={()=> handleRedirect("/configuracion")}
              className={`absolute bottom-0 flex w-full h-10 items-center pl-2 select-none  ${location.pathname == "/configuracion" ? null :"hover:text-yellow-400 cursor-pointer"} ${
                location.pathname == "/configuracion"
                  ? "bg-gradient-to-l from-yellow-900 text-black via-yellow-700 to-yellow-500"
                  : null
              }`}
            >
              Configuracion
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
