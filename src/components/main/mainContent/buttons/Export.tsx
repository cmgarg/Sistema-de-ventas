import React, { useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
import { CgExport } from "react-icons/cg";

interface ExportProps {
  onClick?: () => void; // Callback que se ejecutará al hacer clic
}

const Export: React.FC<ExportProps> = ({ onClick }) => {
  const [tooltipActive, setTooltipActive] = useState(false);

  function changeTooltipActive(a: boolean) {
    setTooltipActive(a);
  }

  return (
    <div
      className="w-10 h-full rounded-full bg-gray-700 border-x border-gray-600 flex justify-center items-center select-none cursor-pointer relative app-region-no-drag"
      onMouseEnter={() => setTooltipActive(true)}
      onMouseLeave={() => setTooltipActive(false)}
      onClick={onClick} // Aquí ejecuta el callback pasado como prop
    >
      <Biñeta title="Exportar">
        <CgExport size={20} color="white" />
      </Biñeta>
    </div>
  );
};

export default Export;
