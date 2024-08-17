import React, { useEffect, useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
interface ImprimirProps {}
import { BsPrinter } from "react-icons/bs";

const Imprimir: React.FC<ImprimirProps> = ({}) => {
  return (
    <div
      className="w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center select-none cursor-pointer"
      onClick={() => {}}
    >
      <Biñeta title="Imprimir">
      <BsPrinter  size={25} color="white" />
      </Biñeta>
    </div>
  );
};

export default Imprimir;
