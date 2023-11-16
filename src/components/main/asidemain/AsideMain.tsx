import React from "react";
import MenuAside from "./menu/menu";

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
          <MenuAside title="Clientes">
            <a href="#" className="hover:text-slate-400">
              Ventas
            </a>
            <a href="#" className="hover:text-slate-400">
              Gastos
            </a>
            <a href="#" className="hover:text-slate-400">
              Pedidos
            </a>
            <a href="#" className="hover:text-slate-400">
              Aguante
            </a>
          </MenuAside>
          <MenuAside title="Fideos">
            <a href="#" className="hover:text-slate-400">
              Ventas
            </a>
            <a href="#" className="hover:text-slate-400">
              Compras
            </a>
            <a href="#" className="hover:text-slate-400">
              Gastos
            </a>
            <a href="#" className="hover:text-slate-400">
              Pedidos
            </a>
            <a href="#" className="hover:text-slate-400">
              Aguante
            </a>
          </MenuAside>
        </div>
      )}
    </div>
  );
};

export default AsideMain;
