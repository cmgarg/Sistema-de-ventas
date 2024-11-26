import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ButtonR from "../main/mainContent/buttons/ButtonR";

interface MainContentProps<T> {
  searchIn: any[]; // Array de objetos donde buscar
  functionReturn: (e: any[], f: boolean) => void; // Función que recibe los resultados y estado de búsqueda
}

const Buscador = <T extends object>({
  searchIn,
  functionReturn,
}: MainContentProps<T>) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  const [result, setResult] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Función de búsqueda
  function search(e: string) {
    const lowerCaseQuery = e.toLowerCase(); // Convierte la consulta a minúsculas para evitar diferencias por capitalización

    const filteredResults = searchIn.filter((object) => {
      return Object.values(object).some((val) => {
        if (typeof val === "string") {
          return val.toLowerCase().includes(lowerCaseQuery); // Coincidencia parcial
        } else if (typeof val === "object" && val !== null) {
          return Object.values(val).some((subVal) => {
            if (typeof subVal === "string") {
              return subVal.toLowerCase().includes(lowerCaseQuery); // Coincidencia parcial en objetos anidados
            }
            return false;
          });
        }
        return false;
      });
    });

    setResult(filteredResults.length > 0 ? filteredResults : []); // Si no hay resultados, devuelve un array vacío
    functionReturn(filteredResults, filteredResults.length > 0); // Actualiza el estado de búsqueda
  }

  // Manejo del input
  function onChangeInput(value: string) {
    setInputValue(value);
    search(value);
  }

  // Ocultar el buscador al hacer clic fuera
  useEffect(() => {
    function clickOutsideSearch(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (inputValue === "") {
          setActivarBuscador(false);
          setResult([]); // Limpia los resultados
          functionReturn([], false); // Devuelve array vacío y estado falso
        }
      }
    }

    document.addEventListener("mousedown", clickOutsideSearch);
    return () => {
      document.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, [inputValue]);

  // Reinicia el buscador si cambian los datos de entrada
  useEffect(() => {
    setActivarBuscador(false);
    setResult([]); // Limpia los resultados al cambiar los datos de entrada
    functionReturn([], false);
  }, [searchIn]);

  return (
    <div
      className={`justify-center flex rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.50)] transition-all border-x-2 border-gray-600 items-center relative app-region-no-drag ${
        ActivarBuscador ? "bg-gray-600 rounded-l-full" : "bg-gray-700"
      } flex-row h-full ${ActivarBuscador ? "w-52" : "w-10"}`}
      onClick={() => setActivarBuscador(true)}
      ref={searchRef}
    >
      <div className="flex-1 h-full">
        {ActivarBuscador && (
          <input
            className={`outline-none w-full h-full pl-2 bg-transparent text-slate-50 placeholder-slate-50`}
            placeholder="Buscador..."
            onChange={(e) => onChangeInput(e.target.value)}
            value={inputValue}
            type="text"
          />
        )}
      </div>
      <div className="w-10">
        <ButtonR
          textSize="text-lg"
          bgIconColor="bg-transparent text-[#fff8dcff] shadow-none"
          height="h-8"
          shadow={false}
          rounded={false}
          width="w-10"
        >
          <BiSearch size={19} className="text-white" />
        </ButtonR>
      </div>
    </div>
  );
};

export default Buscador;
