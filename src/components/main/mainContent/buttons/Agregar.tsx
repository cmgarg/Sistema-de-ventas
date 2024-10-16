import React, { useEffect, useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
import { MdAdd } from "react-icons/md";
interface AgregarProps {
  onChangeModal: (p: boolean) => void;
  title: string;
}

const Agregar: React.FC<AgregarProps> = ({ onChangeModal, title }) => {
  return (
    <div
      className="w-10 h-10 bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] rounded-full flex justify-center items-center select-none cursor-pointer"
      onClick={() => {
        onChangeModal(true);
      }}
    >
      <Biñeta title={`Agregar ${title}`}>
      <MdAdd size={25} color="white" />
      </Biñeta>
    </div>
  );
};

export default Agregar;
