import React, { useEffect, useState } from "react";
import { TbWorld, TbBrandGoogleAnalytics, TbFileDollar } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "./Tooltip.jsx";
import { useLocation } from "react-router-dom";
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

export default function Aside() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  ////funciones ventana emergente con nombre.

  ///Redux

  const menuState = useSelector((state: any) => state.menuState);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsActive(!isActive);
    console.log(menuState.value, "este es el apartado q esta precionado");
  };
  useEffect(() => {
    console.log(location);
    if (location.pathname !== "articulos") {
    }
  }, [menuState]);
  console.log(location.pathname, "este es el apartado cliqueado..");

  return (
    <div
      className={`flex flex-row h-full bg-gradient-to-b to-blue-950 from-slate-800 ${
        isActive ? "" : ""
      }`}
    >
      <div className={`h-full flex items-center `}>
        <div
          className={` flex flex-col  h-full justify-between items-center  `}
        >
          <div>
            <div
              onClick={handleClick}
              className={`flex flex-row  justify-center items-center mt-5 mb-5 ${
                isActive && "bg-cyan-800"
              } hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none `}
            >
              <div className={`h-10 w-10 flex justify-center items-center `}>
                {isActive ? (
                  <TiThMenu size={30} color={"#fff"} />
                ) : (
                  <Tooltip content="Menu">
                    <LuMenu size={30} color="#fff" />
                  </Tooltip>
                )}
              </div>
              <div
                className={`${
                  isActive
                    ? " flex h-full  items-center w-24 justify-center cursor-pointer select-none "
                    : ""
                }`}
              >
                {isActive ? (
                  <div className="  text-white flex justify-center items-center ">
                    <p>Menu</p>
                  </div>
                ) : null}
              </div>
            </div>
            <GoTo title="Clientes" goTo="/" isActive={isActive}>
              {location.pathname == "/" ? (
                <IoPerson color={"#fff"} size={30} />
              ) : (
                <IoPersonOutline color={"#fff"} size={30} />
              )}
            </GoTo>
            <GoTo title="Articulos" goTo="/articulos" isActive={isActive}>
              {location.pathname == "/articulos" ? (
                <RiShoppingBag4Fill color={"#fff"} size={30} />
              ) : (
                <RiShoppingBag4Line color={"#fff"} size={30} />
              )}
            </GoTo>
            <GoTo title="Ventas" goTo="/ventas" isActive={isActive}>
              {location.pathname == "/ventas" ? (
                <PiCurrencyDollarBold color={"#fff"} size={35} />
              ) : (
                <PiCurrencyDollarLight color={"#fff"} size={35} />
              )}
            </GoTo>
            <GoTo title="Stock" goTo="/stock" isActive={isActive}>
              {location.pathname == "/stock" ? (
                <BsBoxSeamFill color={"#fff"} size={30} />
              ) : (
                <BsBoxSeam color={"#fff"} size={30} />
              )}
            </GoTo>
            <GoTo title="Caja" goTo="/caja" isActive={isActive}>
              {location.pathname == "/caja" ? (
                <PiCashRegisterFill size={35} color={"#fff"} />
              ) : (
                <PiCashRegisterLight size={35} color={"#fff"} />
              )}
            </GoTo>
            <GoTo title="Cuentas" goTo="/cuentas" isActive={isActive}>
              {location.pathname == "/cuentas" ? (
                <FaFileInvoiceDollar size={30} color={"#fff"} />
              ) : (
                <TbFileDollar size={35} color={"#fff"} />
              )}
            </GoTo>
            <GoTo title="Estadisticas" goTo="/estadisticas" isActive={isActive}>
              {location.pathname == "/estadisticas" ? (
                <SiGoogleanalytics size={30} color={"#fff"} />
              ) : (
                <TbBrandGoogleAnalytics size={30} color={"#fff"} />
              )}
            </GoTo>
            <GoTo title="Navegador" goTo="/navegador" isActive={isActive}>
              {location.pathname == "/navegador" ? (
                <TbWorld size={40} color={"#fff"} />
              ) : (
                <TfiWorld size={30} color={"#fff"} />
              )}
            </GoTo>
          </div>

          <div>
            {" "}
            <GoTo
              title="Configuracion"
              goTo="/configuracion"
              isActive={isActive}
            >
              {location.pathname == "/configuracion" ? (
                <IoSettingsSharp size={30} color="white" />
              ) : (
                <IoSettingsOutline size={30} color="white">
                  {" "}
                </IoSettingsOutline>
              )}
            </GoTo>
          </div>
        </div>
      </div>
    </div>
  );
}
