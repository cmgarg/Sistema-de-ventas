import React, { useEffect, useRef, useState } from "react";
import BuscadorIcon from "../../assets/MAINSVGS/mainAsideSvg/buscadorIcon/BuscadorIcon";
import Biñeta from "../main/mainContent/Biñeta/Biñieta";

interface MainContentProps {
  searchIn: object[];
  functionReturn: (e: object[], f: boolean) => void;
}

const Buscador: React.FC<MainContentProps> = ({ searchIn, functionReturn }) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  const [result, setResult] = useState<object[]>([]);
  const [toSearch, setToSearch] = useState<object[]>([]);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef();

  function search(e: string) {
    const toSearch = [...searchIn];

    const result = toSearch.filter((object) => {
      return Object.values(object).some((val) => {
        if (typeof val === "string") {
          val.toLowerCase().slice(0, e.length).includes(e.toLowerCase());
        } else if (typeof val === "object") {
          return Object.values(val).some((u) => {
            if (typeof u === "string") {
              return u
                .toLowerCase()
                .slice(0, e.length)
                .includes(e.toLowerCase());
            }
          });
        }
      });
    });
    console.log(toSearch, "BUSCANDO EN");
    setResult([...result]);
    functionReturn(result, true);
  }

  function onChangeInput(target: string) {
    setInputValue(target);
    search(target);
  }

  useEffect(() => {
    function clickOutsideSearch(event: any) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        console.log(inputValue.length);
        if (inputValue === "") {
          setActivarBuscador(false);
          functionReturn([], false);
        }
      }
    }

    document.addEventListener("mousedown", clickOutsideSearch);
    return () => {
      document.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, [inputValue]);

  useEffect(() => {
    if (result.length > 0) {
      functionReturn(result, true);
    }
    console.log("cambiooooooooo", result);
  }, [result]);
  useEffect(() => {
    setActivarBuscador(false);
    functionReturn([], false);
    console.log(searchIn, "falopa");
  }, []);

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
            onChangeInput(e.target.value);
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
