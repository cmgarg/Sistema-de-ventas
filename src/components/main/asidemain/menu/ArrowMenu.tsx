import React, { ReactNode, useState } from "react";
import ArrowDown from "../../../../assets/MAINSVGS/mainAsideSvg/ArrowDown.jsx";
import ArrowRight from "../../../../assets/MAINSVGS/mainAsideSvg/ArrowRight.jsx";

interface ArrowMenuContentProps {
  isActive: boolean;
  onChangeIsActive?: () => void;
}

const ArrowMenu: React.FC<ArrowMenuContentProps> = ({ isActive }) => {
  return (
    <div className="flex items-center select-none">
      {(isActive && (
        <div className="flex items-center">
          <ArrowDown size={15} color={"#fff"}></ArrowDown>
        </div>
      )) || (
        <div className="flex items-center">
          <ArrowRight size={15} color={"#fff"}></ArrowRight>
        </div>
      )}
    </div>
  );
};

export default ArrowMenu;
