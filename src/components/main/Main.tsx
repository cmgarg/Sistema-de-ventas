import React, { useEffect, useState } from "react";
import ClientesContent from "./mainContent/clientes/Clientes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articulos from "./mainContent/Articulos/Articulos";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="flex flex-col flex-1 bg-gray-300">
      <Routes>
        <Route path="/" element={<ClientesContent />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/about" />
      </Routes>
    </div>
  );
};

export default MainContent;
