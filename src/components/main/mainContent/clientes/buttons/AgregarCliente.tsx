import React, { useEffect, useState } from "react";
import AddIcon from "../../../../../assets/MAINSVGS/mainAsideSvg/ClientesContentSVG/AddIcon";
import ToolTip from "../../../../nav/aside/Tooltip.jsx";
interface AgregarClienteProps {
  onChangeModal: (p: boolean) => void;
}

const AgregarCliente: React.FC<AgregarClienteProps> = ({ onChangeModal }) => {
  return (
    <div
      className="w-10 h-10 bg-blue-300 rounded-full flex justify-center items-center select-none cursor-pointer"
      onClick={() => {
        onChangeModal(true);
      }}
    >
      <ToolTip content="N A">
        <AddIcon size={30} color="#fff"></AddIcon>
      </ToolTip>
    </div>
  );
};

export default AgregarCliente;
