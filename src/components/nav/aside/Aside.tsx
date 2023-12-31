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

export default function Aside() {
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
            <div
              className={`${
                location.pathname == "/"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <div className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900  ">
                <Link to="/" className="flex items-center justify-center">
                  {isActive ? (
                    <div className=" flex items-center justify-evenly w-10 h-10 cursor-pointer select-none">
                      <Usuario menuState={menuState}></Usuario>
                    </div>
                  ) : (
                    <Tooltip content="Clientes">
                      <div className=" flex items-center justify-evenly w-10 h-10 cursor-pointer select-none">
                        <Usuario menuState={menuState}></Usuario>
                      </div>
                    </Tooltip>
                  )}
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
                </Link>
              </div>
            </div>

            <div
              className={`${
                location.pathname == "/articulos"
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
                <Link
                  to="/articulos"
                  className="flex items-center justify-center"
                >
                  {isActive ? (
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Articulos
                        menuState={menuState}
                        size={30}
                        color={"#fff"}
                      ></Articulos>
                    </div>
                  ) : (
                    <Tooltip content="Articulos">
                      <div className=" flex items-center justify-center w-10 h-10">
                        <Articulos
                          menuState={menuState}
                          size={30}
                          color={"#fff"}
                        ></Articulos>
                      </div>
                    </Tooltip>
                  )}

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
                </Link>
              </div>
            </div>
            <div
              className={`${
                location.pathname == "/ventas"
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
                <Link
                  to={"/ventas"}
                  className="flex items-center justify-center"
                >
                  {isActive ? (
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Ventas
                        menuState={menuState}
                        size={30}
                        color={"#fff"}
                      ></Ventas>
                    </div>
                  ) : (
                    <Tooltip content="Ventas">
                      <div className=" flex items-center justify-center w-10 h-10">
                        <Ventas
                          menuState={menuState}
                          size={30}
                          color={"#fff"}
                        ></Ventas>
                      </div>
                    </Tooltip>
                  )}
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
                </Link>
              </div>
            </div>
            <div
              className={`${
                location.pathname == "/navegador"
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
                {isActive ? (
                  <div className=" flex items-center justify-center w-10 h-10">
                    <Navegador menuState={menuState} size={30}></Navegador>
                  </div>
                ) : (
                  <Tooltip content="Navegador">
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Navegador menuState={menuState} size={30}></Navegador>
                    </div>
                  </Tooltip>
                )}

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
                location.pathname == "/stock"
                  ? "border-l-4 border-cyan-600"
                  : "border-l-4 border-gray-800"
              }`}
            >
              <Link
                to={"/stock"}
                className=" flex items-center justify-center mt-3 mb-3 rounded-e-lg hover:bg-gray-700 active:bg-gray-900 cursor-pointer select-none"
              >
                {isActive ? (
                  <div className=" flex items-center justify-center w-10 h-10">
                    <Stock menuState={menuState} size={30}></Stock>
                  </div>
                ) : (
                  <Tooltip content="Stock">
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Stock menuState={menuState} size={30}></Stock>
                    </div>
                  </Tooltip>
                )}

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
              </Link>
            </div>
            <div
              className={`${
                location.pathname == "/caja"
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
                <Link to="/caja" className="flex items-center justify-center">
                  {isActive ? (
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Caja menuState={menuState} size={30}></Caja>
                    </div>
                  ) : (
                    <Tooltip content="Caja">
                      <div className=" flex items-center justify-center w-10 h-10">
                        <Caja menuState={menuState} size={30}></Caja>
                      </div>
                    </Tooltip>
                  )}

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
                </Link>
              </div>
            </div>
            <div
              className={`${
                location.pathname == "/Cuentas"
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
                <Link to="/Cuentas" className="flex items-center justify-center">
                {isActive ? (
                  <div className=" flex items-center justify-center w-10 h-10">
                    <Cuentas menuState={menuState} size={30}></Cuentas>
                  </div>
                ) : (
                  <Tooltip content="Cuentas">
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Cuentas menuState={menuState}></Cuentas>
                    </div>
                  </Tooltip>
                )}

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
                </Link>
              </div>
            </div>
            <div
              className={`${
                location.pathname == "/estadisticas"
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
                {isActive ? (
                  <div className=" flex items-center justify-center w-10 h-10">
                    <Estadisticas menuState={menuState}></Estadisticas>
                  </div>
                ) : (
                  <Tooltip content="Estadisticas">
                    <div className=" flex items-center justify-center w-10 h-10">
                      <Estadisticas menuState={menuState}></Estadisticas>
                    </div>
                  </Tooltip>
                )}

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
                {isActive ? (
                  <div className=" flex items-center justify-center w-10 h-10 cursor-pointer select-none">
                    <Configuracion menuState={menuState}></Configuracion>
                  </div>
                ) : (
                  <Tooltip content="Configuracion">
                    <div className=" flex items-center justify-center w-10 h-10 cursor-pointer select-none">
                      <Configuracion menuState={menuState}></Configuracion>
                    </div>
                  </Tooltip>
                )}

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
