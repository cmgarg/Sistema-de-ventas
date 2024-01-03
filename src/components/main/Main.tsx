import React, { useEffect, useState } from "react";
import ClientesContent from "./mainContent/clientes/Clientes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articulos from "./mainContent/Articulos/Articulos";
import Caja from "./mainContent/Caja/caja";
import ClienteInfo from "./mainContent/ApartadoCliente/ClienteInfo";
import Ventas from "./mainContent/ventas/Ventas";
import ArticuloInfo from "./mainContent/ApartadoArticulos/ArticuloInfo";
import Cuentas from "./mainContent/Cuentas/Cuentas";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="flex flex-col flex-1 bg-gray-300">
      <Routes>
        <Route path="/" element={<ClientesContent />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/Cuentas" element={<Cuentas />}/>
        <Route path="/cliente/:id" element={<ClienteInfo />} />
        <Route path="/articulo/:id" element={<ArticuloInfo />} />
      </Routes>
    </div>
  );
};

export default MainContent;
