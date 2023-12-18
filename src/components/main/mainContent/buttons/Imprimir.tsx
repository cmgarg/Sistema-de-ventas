import React, { useEffect, useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
import PrintIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/PrintIcon.js";
interface ImprimirProps {}

const Imprimir: React.FC<ImprimirProps> = ({}) => {
  return (
    <div
      className="w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center select-none cursor-pointer"
      onClick={() => {}}
    >
      <Biñeta title="Imprimir">
        <PrintIcon size={25} color="#fff"></PrintIcon>
      </Biñeta>
    </div>
  );
};

export default Imprimir;
