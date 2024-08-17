import React, { ReactNode, useState } from "react";


interface ArrowMenuContentProps {
  isActive: boolean;
  onChangeIsActive?: () => void;
}

const ArrowMenu: React.FC<ArrowMenuContentProps> = ({ isActive }) => {
  return (
    <div className="flex items-center select-none">
      {(isActive && (
        <div className="flex items-center">
          "icono"
        </div>
      )) || (
        <div className="flex items-center">
          "otro icono"
        </div>
      )}
    </div>
  );
};

export default ArrowMenu;
