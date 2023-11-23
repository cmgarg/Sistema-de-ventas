import React, { useState } from "react";
import BuscadorIcon from "../../assets/MAINSVGS/mainAsideSvg/buscadorIcon/BuscadorIcon";

interface MainContentProps {
  searchIn?: string;
}

const Buscador: React.FC<MainContentProps> = ({ searchIn }) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  return (
    <div className="h-10 w-10 justify-center rounded-full flex items-center bg-slate-400">
      <BuscadorIcon color="#fff" size={20}></BuscadorIcon>
      {ActivarBuscador && (
        <input
          className="m-2 bg-slate-400 outline-none text-slate-50 placeholder-slate-50"
          placeholder="Buscador..."
          type="text"
        ></input>
      )}
    </div>
  );
};

export default Buscador;
