import React, { useEffect, useState } from "react";
import ClientesContent from "./mainContent/clientes/Clientes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articulos from "./mainContent/Articulos/Articulos";
import Caja from "./mainContent/Caja/caja";
import ClienteInfo from "./mainContent/ApartadoCliente/ClienteInfo";
import Ventas from "./mainContent/ventas/Ventas";
import ArticuloInfo from "./mainContent/ApartadoArticulos/ArticuloInfo";
import Cuentas from "./mainContent/Cuentas/Cuentas";
import Stock from "./mainContent/Stock/Stock";
import Estadisticas from "./mainContent/Estadisticas/Estadisticas";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../../types";
import { chargeArticles } from "../../redux/estados/articlesState";
import { chargeClients } from "../../redux/estados/clientesState";
import { chargeSales } from "../../redux/estados/salesState";
import Configuracion from "./mainContent/Configuracion/Configuracion";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.api.enviarEvento("get-articles");
    window.api.enviarEvento("get-clients");
    window.api.enviarEvento("get-sales");
  }, []);

  useEffect(() => {
    window.api.recibirEvento("response-get-articles", (articles) => {
      console.log(articles);
      dispatch(chargeArticles(articles));
    });
    //CLIENTS
    window.api.recibirEvento("response-get-clients", (clients) => {
      console.log("cargandosss BUENOO", clients);

      dispatch(chargeClients(clients));
    });
    //
    window.api.recibirEvento("response-get-sales", (sales) => {
      console.log(sales);
      dispatch(chargeSales(sales));
    });
  });

  // SEGUIR CON LOS ESTADOS.
  return (
    <div className="bg-gradient-to-b to-blue-950 from-slate-800 h-full w-full flex">
      <Routes>
        <Route path="/" element={<ClientesContent />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/Cuentas" element={<Cuentas />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/cliente/:id" element={<ClienteInfo />} />
        <Route path="/articulo/:id" element={<ArticuloInfo />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </div>
  );
};

export default MainContent;
