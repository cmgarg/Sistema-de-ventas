import React, { useEffect, useState } from "react";
import Cards from "./Cards/Cards";

import { useSelector } from "react-redux";
import { storeType } from "@/types";
import Graphics from "./Graphics";

interface EstadisticastProps {
  //PROPS
}
const Estadisticas: React.FC<EstadisticastProps> = (
  {
    /*PROPS*/
  }
) => {
  const ventas = useSelector((state: storeType) => state.saleState);

  useEffect(() => {
    console.log(ventas);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-auto">
      <Graphics />
    </div>
  );
};

export default Estadisticas;
