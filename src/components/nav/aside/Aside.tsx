import React, { useEffect, useState } from "react";
import { TbWorld, TbBrandGoogleAnalytics, TbFileDollar } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "./Tooltip.js";
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
import { RootState } from "../../../redux/store.js";

export default function Aside() {
  const location = useLocation();
  const [expand, setExpand] = useState<boolean>(false);
  const userType = useSelector(
    (state: RootState) => state.estadoTipoDeUser.userType
  );
  ////funciones ventana emergente con nombre.

  ///Redux

  const menuState = useSelector((state: any) => state.menuState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "articulos") {
    }
  }, [menuState]);

  console.log(
    userType,
    "---este es el estado reduxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  );
  return (
    <div
      className={`flex flex-row h-full bg-[#121212] relative z-40 overflow-hidden ${
        expand ? "w-52 bg-zinc-300" : "w-10"
      }`}
    >
      <div className={`h-full flex items-center`}>
        <div className={` flex flex-col h-full items-center `}>
          <div className="h-full flex flex-col">
            <div
              className={`flex flex-row  justify-center items-center hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none w-full `}
            >
              <div
                className={`h-10 w-10 flex justify-center items-center select-none`}
                onClick={() => setExpand(!expand)}
              >
                <Tooltip content="Menu">
                  <LuMenu size={30} color="#000" />
                </Tooltip>
              </div>
            </div>
            {userType === "stock" ? null : (
              <div className="select-none">
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
              <div className="select-none">
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
              <div>
                <GoTo title="Ventas" goTo="/ventas" expand={expand}>
                  {location.pathname == "/ventas" ? (
                    <PiCurrencyDollarBold size={35} />
                  ) : (
                    <PiCurrencyDollarLight size={35} />
                  )}
                </GoTo>
              </div>
            )}

            <GoTo title="Stock" goTo="/stock" expand={expand}>
              {location.pathname == "/stock" ? (
                <BsBoxSeamFill size={30} />
              ) : (
                <BsBoxSeam size={30} />
              )}
            </GoTo>

            {userType === "ventas " || userType === "admin" ? (
              <div>
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
              <div>
                <GoTo title="Cuentas" goTo="/cuentas" expand={expand}>
                  {location.pathname == "/cuentas" ? (
                    <FaFileInvoiceDollar size={30} />
                  ) : (
                    <TbFileDollar size={35} />
                  )}
                </GoTo>
              </div>
            ) : null}

            {userType === "ventas " ||
            userType === "admin" ||
            userType === "gerente" ? (
              <div>
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
              <div>
                <GoTo title="Navegador" goTo="/navegador" expand={expand}>
                  {location.pathname == "/navegador" ? (
                    <TbWorld size={40} />
                  ) : (
                    <TfiWorld size={30} />
                  )}
                </GoTo>{" "}
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            {" "}
            <GoTo title="Configuracion" goTo="/configuracion" expand={expand}>
              {location.pathname == "/configuracion" ? (
                <IoSettingsSharp size={30} />
              ) : (
                <IoSettingsOutline size={30}> </IoSettingsOutline>
              )}
            </GoTo>
          </div>
        </div>
      </div>
    </div>
  );
}
