import React, { useEffect, useRef, useState } from "react";
interface MenuBrandForm {
  style: string;
  setChangeData: (data: string, value: any) => void;
}

const MenuBrandForm: React.FC<MenuBrandForm> = ({ style, setChangeData }) => {
  const [brands, setBrands] = useState([]);
  const [menuActived, setMenuActived] = useState(true);
  const [brandsFounds, setBrandsFounds] = useState([]);
  const [inputValue, setInputValue] = useState({ value: "", label: "" });

  const inputRef = useRef();

  function listBrands() {
    console.log("PUIITO", brandsFounds);
    return (
      <div className="absolute w-full bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg flex flex-col top-full">
        {brandsFounds.map((brand) => (
          <button
            onClick={() => {
              setInputValue({
                value: brand.value,
                label: brand.label,
              });
              setMenuActived(false);
            }}
            className="hover:bg-gray-800"
          >
            {brand.label}
          </button>
        ))}
      </div>
    );
  }
  function getBrands() {
    window.api.enviarEvento("get-categoryAndBrand");
  }
  function searchInBrands(busca: string) {
    const arrayFounds = brands.filter((brand) => {
      return brand.label
        .toLocaleLowerCase()
        .includes(busca !== "" ? busca.toLocaleLowerCase() : "|||");
    });
    setBrandsFounds(arrayFounds);
  }
  function capitalizarPrimeraLetra(cadena: string) {
    if (cadena && cadena.length > 0) {
      return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    } else {
      return cadena;
    }
  } //CONVIERTE LA PRIMER LETRA DE UN STRING EN MAYUSCULA

  useEffect(() => {
    setChangeData("brand", inputValue);
  }, [inputValue]);

  useEffect(() => {
    getBrands();
    window.api.recibirEvento("response-get-categoryAndBrand", (e) => {
      const brands = e.filter((brand) => {
        if (brand.typeFilter === "brand") {
          return brand;
        }
      });
      setBrands(brands);
    });
  }, []);

  return (
    <div
      onClick={() => {
        setMenuActived(true);
      }}
      onBlur={(e) => {
        setTimeout(() => setMenuActived(false), 200);
      }}
    >
      <label htmlFor="comprador" className="text-slate-600">
        Marca
      </label>
      <div className="flex flex-row relative">
        <input
          ref={inputRef}
          className={style}
          type="text"
          name="comprador"
          value={inputValue.label}
          onChange={(e) => {
            searchInBrands(e.target.value);
            setInputValue({
              value: e.target.value,
              label: capitalizarPrimeraLetra(e.target.value),
            });
          }}
        />
        {brandsFounds.length > 0 && menuActived && listBrands()}
      </div>
    </div>
  );
};

export default MenuBrandForm;
