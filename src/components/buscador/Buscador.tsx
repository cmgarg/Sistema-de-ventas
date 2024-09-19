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
      <ButtonR
        borderSize="border-b-[4px]"
        textSize="text-lg"
        bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
        height="h-10"
        width="w-10"
      >
        <BiSearch size={20} className="text-white" />
      </ButtonR>
    </div>
  );
};

export default Buscador;
