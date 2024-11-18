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
      className="w-10 h-full rounded-full bg-gray-700 border-x border-gray-600  flex justify-center items-center select-none cursor-pointer relative app-region-no-drag"
      onMouseEnter={() => {
        setTooltipActive(true);
      }}
      onMouseLeave={() => {
        setTooltipActive(false);
      }}
    >
      <Biñeta title="Exportar">
        <CgExport size={20} color="white" />
      </Biñeta>
    </div>
  );
};

export default Export;
