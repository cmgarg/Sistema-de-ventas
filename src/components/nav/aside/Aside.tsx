import React, { useState } from "react";
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

export default function Aside() {
  const [isActive, setIsActive] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: "" });

  ////funciones ventana emergente con nombre.
  function showTooltip(text) {
    setTooltip({ show: true, text: text });
  }

  function hideTooltip() {
    setTooltip({ show: false, text: "" });
  }

  const [show, setShow] = useState(false);

  // Estilos para la posición del tooltip basado en el flujo
  const flowStyles = {
    up: 'bottom-full mb-2',
    down: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

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

  return (
    <div
      className={`flex flex-row h-full bg-gray-800 border-r-2 border-zinc-950 ${
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
              className={`flex flex-row  justify-center items-center mt-5 mb-5 rounded-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none `}
            >
              <div
                className=" w-10 h-10"
                onMouseEnter={() => showTooltip("Nombre de la ventana")}
                onMouseLeave={hideTooltip}
              >{
  tooltip.show && (
    
      
  
  <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
  {children}
  {show && (
    <div className={`absolute z-10 p-2 text-white bg-black rounded shadow-lg text-xs ${flowStyles[flow] || ''}`}>
      {tooltip.text}
    </div>
  )}
</div>
      
  )
}
                <Menu></Menu>
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
            <div
              className={`${
                menuState.value == "usuario"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("usuario");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900  "
              >
                <div className=" flex items-center justify-evenly w-10 h-10 cursor-pointer select-none">
                  <Usuario menuState={menuState}></Usuario>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white cursor-pointer select-none">
                      Clientes
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div
              className={`${
                menuState.value == "articulos"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("articulos");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Articulos menuState={menuState}></Articulos>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">Productos</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "ventas"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("ventas");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Ventas menuState={menuState}></Ventas>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">Ventas</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "navegador"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("navegador");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Navegador menuState={menuState}></Navegador>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">
                      Catalogo Online
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "stock"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("stock");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Stock menuState={menuState}></Stock>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">Stock</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "caja"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("caja");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Caja menuState={menuState}></Caja>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">Caja</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "cuentas"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("cuentas");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Cuentas menuState={menuState}></Cuentas>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">
                      Cuentas a Pagar
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`${
                menuState.value == "estadisticas"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("estadisticas");
                }}
                className=" flex items-center justify-center mt-3 mb-3  hover:bg-gray-700 active:bg-gray-900 rounded-e-lg cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10">
                  <Estadisticas menuState={menuState}></Estadisticas>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm ml-2 text-white">Estadisticas</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <div
              className={`${
                menuState.value == "configuracion"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div
                onClick={() => {
                  chageStateMenu("configuracion");
                }}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                <div className=" flex items-center justify-center w-10 h-10 cursor-pointer select-none">
                  <Configuracion menuState={menuState}></Configuracion>
                </div>
                <div
                  className={`${
                    isActive
                      ? " flex w-24 h-full  items-center  justify-start "
                      : ""
                  }`}
                >
                  {isActive ? (
                    <div className="text-sm text-white">Configuración</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
