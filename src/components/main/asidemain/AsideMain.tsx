import React from "react";

interface AsideContentProps {
  isActive: boolean;
}

const AsideMain: React.FC<AsideContentProps> = ({ isActive }) => {
  return (
    <div
      className={
        (isActive &&
          "flex flex-col flex-2 bg-slate-500 w-52 items-center p-5") ||
        ""
      }
    >
      {isActive && (
        <div className="flex-1 w-full">
          <p>VENTAS</p>
          <p>VENTAS</p>
          <p>VENTAS</p>
          <p>VENTAS</p>
          <p>VENTAS</p>
        </div>
      )}
    </div>
  );
};

export default AsideMain;
