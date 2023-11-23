import React, { useState } from "react";
import Diamong from "../../../assets/MAINSVGS/mainAsideSvg/ClientesContentSVG/Diamong";

interface MenuContextualProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MenuContextual: React.FC<MenuContextualProps> = ({
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }
  return (
    <div
      className="cursor-pointer relative select-none flex-2"
      onMouseLeave={() => {
        menuVisible ? toggleMenu() : false;
      }}
    >
      <div onClick={toggleMenu}>
        <Diamong color="#0ff" size="20"></Diamong>
      </div>
      {menuVisible && (
        <div className="w-20 bg-emerald-300 absolute top-3 flex flex-col items-center text-base">
          <button
            onClick={() => {
              onDelete();
            }}
          >
            Borrar
          </button>
          <button
            onClick={() => {
              onEdit();
            }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuContextual;
