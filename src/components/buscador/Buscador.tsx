import React, { useEffect, useState } from "react";
import BuscadorIcon from "../../assets/MAINSVGS/mainAsideSvg/buscadorIcon/BuscadorIcon";

interface MainContentProps {
  searchIn?: string;
}

const Buscador: React.FC<MainContentProps> = ({ searchIn }) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (!inputValue) {
      setActivarBuscador(false);
    }
  }, [inputValue]);

  return (
    <div
      className={`justify-center rounded-full flex items-center ${
        (ActivarBuscador && "bg-slate-300") || "bg-slate-400"
      } flex-row relative h-10 ${(ActivarBuscador && "w-auto") || "w-10 p-1"}`}
      onClick={() => {
        setActivarBuscador(true);
      }}
    >
      <div className="w-10 flex justify-center items-center">
        <BuscadorIcon
          color={`${(ActivarBuscador && "#000") || "#fff"}`}
          size={20}
        ></BuscadorIcon>
      </div>
      {ActivarBuscador && (
        <input
          className={`outline-none bg-transparent p-1  ${
            (ActivarBuscador && " text-black placeholder-black") ||
            "text-slate-50 placeholder-slate-50"
          } rounded-full`}
          placeholder="Buscador..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="text"
        ></input>
      )}
    </div>
  );
};

export default Buscador;
