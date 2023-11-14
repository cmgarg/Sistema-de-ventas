import React from "react";
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

export default function Aside() {
  return (
    <div className=" flex flex-col w-14 h-full items-center justify-stretch bg-gray-800 border-r-2 border-zinc-950">
      <div className=" flex flex-col h-full justify-between ">
        <div>
      <div className=" flex items-center justify-center w-10 h-10 mt-5 mb-5">
        <Menu></Menu>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Usuario></Usuario>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Articulos></Articulos>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Ventas></Ventas>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Navegador></Navegador>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Stock></Stock>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Caja></Caja>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Cuentas></Cuentas>
      </div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Estadisticas></Estadisticas>
      </div>
      </div>
      <div>
      <div className=" flex items-center justify-center w-10 h-10 mt-3 mb-3">
        <Configuracion></Configuracion>
      </div>
      </div>
      </div>
    </div>
  );
}
