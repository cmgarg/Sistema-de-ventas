import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Agregar from "../buttons/Agregar";
import StockList from "./StockList";

interface StocktProps {
  //PROPS
}

const Stock: React.FC<StocktProps> = (
  {
    /*PROPS*/
  }
) => {
  const [activeModal, setActiveModal] = useState(false);

  const [ventas, setVentas] = useState<object[]>([]);

  function addSale(e: object) {
    setVentas([...ventas, e]);
  }
  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function obtenerVentas() {
    window.api.enviarEvento("obtener-ventas");
  }

  /////LISTA DE ARTICULSO

  ///carga de ventas
  useEffect(() => {
    obtenerVentas();
    window.api.recibirEvento("respuesta-obtener-ventas", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arraySales: object[] = [];
      e.map((e: any) => {
        arraySales.push(e);
      });
      setVentas(arraySales);
    });
  }, []);
  //////////////////////////////

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Ventas">
          <Export></Export>
          <Agregar title="Venta" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          <StockList ventas={ventas} setVentas={setVentas} />
        </div>
      </div>
    </div>
  );
};

export default Stock;
