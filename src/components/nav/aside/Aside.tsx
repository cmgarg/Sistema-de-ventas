import React, { useEffect, useState } from "react";
import Menu from "../../../assets/asidesvg/Menu.jsx";
import Usuario from "../../../assets/asidesvg/Usuario.jsx";
import Articulos from "../../../assets/asidesvg/Articulos.jsx";
import Ventas from "../../../assets/asidesvg/Ventas.jsx";
import Navegador from "../../../assets/asidesvg/Navegador.jsx";
import Stock from "../../../assets/asidesvg/Stock.jsx";
import Caja from "../../../assets/asidesvg/Caja.jsx";
import Cuentas from "../../../assets/asidesvg/Cuentas.jsx";
import Estadisticas from "../../../assets/asidesvg/Estadisticas.jsx";
import Configuracion from "../../../assets/asidesvg/Configuracion.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setMenuState } from "../../../redux/estados/menuState.js";
import Tooltip from "../aside/Tooltip.jsx";
import { Link, useLocation } from "react-router-dom";
import GoTo from "./GoTo.js";

export default function Aside({ setLoginUser }) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  ////funciones ventana emergente con nombre.

  ///Redux

  const menuState = useSelector((state: any) => state.menuState);

  const dispatch = useDispatch();

  function chageStateMenu(texto: string) {
    dispatch(setMenuState({ value: texto }));
  }

  const handleClick = () => {
    setIsActive(!isActive);
    console.log(menuState.value);
  };
  useEffect(() => {
    console.log(location);
    if (location.pathname !== "articulos") {
    }
  }, [menuState]);

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
              className={`flex flex-row  justify-center items-center mt-5 mb-5 hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none `}
            >
              <div className=" w-10 h-10">
                {isActive ? (
                  <Menu></Menu>
                ) : (
                  <Tooltip content="Menu">
                    <Menu></Menu>
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
              <Usuario menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Usuario>
            </GoTo>
            <GoTo title="Articulos" goTo="/articulos" isActive={isActive}>
              <Articulos menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Articulos>
            </GoTo>
            <GoTo title="Ventas" goTo="/ventas" isActive={isActive}>
              <Ventas menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Ventas>
            </GoTo>
            <GoTo title="Stock" goTo="/stock" isActive={isActive}>
              <Stock menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Stock>
            </GoTo>
            <GoTo title="Caja" goTo="/caja" isActive={isActive}>
              <Caja menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Caja>
            </GoTo>
            <GoTo title="Cuentas" goTo="/cuentas" isActive={isActive}>
              <Cuentas menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Cuentas>
            </GoTo>
            <GoTo title="Estadisticas" goTo="/estadisticas" isActive={isActive}>
              <Estadisticas menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Estadisticas>
            </GoTo>
            <GoTo title="Navegador" goTo="/navegador" isActive={isActive}>
              <Navegador menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Navegador>
            </GoTo>
          </div>

          <div>
            {" "}
            <GoTo
              title="Configuracion"
              goTo="/configuracion"
              isActive={isActive}
            >
              <Configuracion menuState={menuState} size={30} color={"#fff"}>
                {" "}
              </Configuracion>
            </GoTo>
          </div>
        </div>
      </div>
    </div>
  );
}
