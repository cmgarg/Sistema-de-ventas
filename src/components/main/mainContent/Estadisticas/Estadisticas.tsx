import React, { useEffect, useState } from "react";
import { Cards } from "./Cards";
import { Graphic } from "./Graphic";
import { SalesRecen } from "./SalesRecen";
import SalesTop from "./SalesTop";

interface EstadisticastProps {
  //PROPS
}
const Estadisticas: React.FC<EstadisticastProps> = (
  {
    /*PROPS*/
  }
) => {
  type salesType = {
    amount: string;
    article: string;
    sold: number;
    date: string;
  };
  const [salesData, setSalesData] = useState<salesType[]>([]);

  function getSalesData() {
    window.api.enviarEvento("get-sales-stats");
  }

  useEffect(() => {
    getSalesData();
    window.api.recibirEvento("response-get-sales-stats", (salesDate) => {
      setSalesData(salesDate);
    });
  }, []);
  return (
    <div className="grid grid-cols-10 grid-rows-6 grid-flow-col h-full gap-3 p-2">
      <Cards sales={salesData}></Cards>
      <Graphic salesData={salesData}></Graphic>
      <SalesRecen salesData={salesData}></SalesRecen>
    </div>
  );
};

export default Estadisticas;
