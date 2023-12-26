import React, { useEffect, useState } from "react";
import AddIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/AddIcon.js";
import Biñeta from "../Biñeta/Biñieta.js";
interface AgregarProps {
  onChangeModal: (p: boolean) => void;
  title: string;
}

const Agregar: React.FC<AgregarProps> = ({ onChangeModal, title }) => {
  return (
    <div
      className="w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center select-none cursor-pointer"
      onClick={() => {
        onChangeModal(true);
      }}
    >
      <Biñeta title={`Agregar ${title}`}>
        <AddIcon size={30} color="#0ff"></AddIcon>
      </Biñeta>
    </div>
  );
};

export default Agregar;
