import React, { useEffect, useRef, useState } from "react";
import Biñeta from "../main/mainContent/Biñeta/Biñieta";
import { GiMagnifyingGlass } from "react-icons/gi";
import ButtonR from "../main/mainContent/buttons/ButtonR";
import { BiSearch } from "react-icons/bi";

interface MainContentProps<T> {
  searchIn: T[];
  functionReturn: (e: T[], f: boolean) => void;
}

const Buscador = <T extends object>({
  searchIn,
  functionReturn,
}: MainContentProps<T>) => {
  const [ActivarBuscador, setActivarBuscador] = useState(false);
  const [result, setResult] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  function search(e: string) {
    const toSearch = [...searchIn];

    const result = toSearch.filter((object) => {
      return Object.values(object).some((val) => {
        if (typeof val === "string") {
          return val.toLowerCase().slice(0, e.length).includes(e.toLowerCase());
        } else if (typeof val === "object" && val !== null) {
          return Object.values(val).some((u) => {
            if (typeof u === "string") {
              return u
                .toLowerCase()
                .slice(0, e.length)
                .includes(e.toLowerCase());
            }
            return false;
          });
        }
        return false;
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
    function clickOutsideSearch(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
  }, [searchIn]);

  return (
    <div
      className={`justify-center flex rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.50)] transition-all border-x-2 border-gray-600 items-center relative app-region-no-drag ${
        (ActivarBuscador && "bg-gray-600 rounded-l-full") || "bg-gray-700"
      } flex-row relative transition h-full ${
        (ActivarBuscador && "w-52") || "w-10"
      }`}
      onClick={() => {
        setActivarBuscador(true);
      }}
      ref={searchRef}
    >
      <div className="flex-1 h-full">
        {ActivarBuscador && (
          <input
            className={`outline-none w-full h-full pl-2 bg-transparent text-slate-50 placeholder-slate-50`}
            placeholder="Buscador..."
            onChange={(e) => {
              onChangeInput(e.target.value);
            }}
            value={inputValue}
            type="text"
          ></input>
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
