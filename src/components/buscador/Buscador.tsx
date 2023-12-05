import React, { useEffect, useRef, useState } from "react";
import BuscadorIcon from "../../assets/MAINSVGS/mainAsideSvg/buscadorIcon/BuscadorIcon";
import Biñeta from "../main/mainContent/Biñeta/Biñieta";

interface MainContentProps {
  searchIn?: string;
}

const Buscador: React.FC<MainContentProps> = ({ searchIn }) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    function clickOutsideSearch(event: any) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActivarBuscador(false);
        setInputValue("");
      }
    }
    document.addEventListener("mousedown", clickOutsideSearch);
    return () => {
      document.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, [ActivarBuscador]);

  return (
    <div
      className={`justify-center rounded-full flex items-center ${
        (ActivarBuscador && "bg-gray-600") || "bg-gray-700"
      } flex-row relative h-10 ${(ActivarBuscador && "w-auto pl-5") || "w-10"}`}
      onClick={() => {
        setActivarBuscador(true);
      }}
      ref={searchRef}
    >
      {ActivarBuscador && (
        <input
          className={`outline-none bg-transparent text-slate-50 placeholder-slate-50`}
          placeholder=" Buscador..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="text"
        ></input>
      )}
      <div className="w-10 flex justify-center items-center">
        <Biñeta title="Buscador">
          <BuscadorIcon color={"#fff"} size={20}></BuscadorIcon>
        </Biñeta>
      </div>
    </div>
  );
};

export default Buscador;
