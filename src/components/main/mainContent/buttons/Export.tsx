import React, { useEffect, useState } from "react";
import ExportIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/ExportIcon.js";
import Biñeta from "../Biñeta/Biñieta.js";
interface ExportProps {}

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
        <ExportIcon size={24} color="#fff"></ExportIcon>
      </Biñeta>
    </div>
  );
};

export default Export;
