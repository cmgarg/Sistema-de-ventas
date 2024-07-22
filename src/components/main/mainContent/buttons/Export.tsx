import React, { useEffect, useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
interface ExportProps {}
import { CgExport } from "react-icons/cg";

const Export: React.FC<ExportProps> = ({}) => {
  const [tooltipActive, setTooltipActive] = useState(false);

  function changeTooltipActive(a: boolean) {
    setTooltipActive(a);
  }
  return (
    <div
      className="w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center select-none cursor-pointer relative"
      onMouseEnter={() => {
        setTooltipActive(true);
      }}
      onMouseLeave={() => {
        setTooltipActive(false);
      }}
    >
      <Biñeta title="Exportar">
      <CgExport size={25} color="white" />
      </Biñeta>
    </div>
  );
};

export default Export;
