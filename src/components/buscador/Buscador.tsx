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
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef();

  function search(e: string) {
    let toSearch = [...searchIn];
    console.log(searchIn, "LOCAAAAAAAAA");
    let results = toSearch.filter((obj: object) => {
      let valoresObjeto = Object.values(obj);
      let valoresDeObjetos = [];
      let strings = valoresObjeto.filter((e) => {
        if (typeof e === "string") {
          return e;
        } else if (typeof e === "object") {
          Object.values(e).map((u: string) => {
            console.log(u, "PAJERA");
            valoresDeObjetos.push(u);
          });
        }
      });
      console.log(valoresDeObjetos, "FALOPERO");
      let stringsLogrados = [...valoresDeObjetos, ...strings];
      console.log(stringsLogrados);
      let isTrue = stringsLogrados.filter((s) => {
        return s.toLowerCase().includes(e); // Tenes que hacer que si es un objeto retorne los strings de estos.
      });

      console.log(isTrue, "PELOTUDO");
      return isTrue.length > 0;
    });
    setResult([...results]);
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
    functionReturn(result, true);
    console.log("cambiooooooooo", result);
  }, [result]);
  useEffect(() => {
    setActivarBuscador(false); //////TERMINASTE CON EL BUSCADOR EN CLIENTES
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
