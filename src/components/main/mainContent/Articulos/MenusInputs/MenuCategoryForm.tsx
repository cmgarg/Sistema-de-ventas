import React, { useEffect, useRef, useState } from "react";
interface MenuCategoryForm {
  style: string;
  setChangeData: (data: string, value: any) => void;
}

const MenuCategoryForm: React.FC<MenuCategoryForm> = ({
  style,
  setChangeData,
}) => {
  const [categorys, setCategorys] = useState([]);
  const [menuActived, setMenuActived] = useState(true);
  const [categorysFounds, setBrandsFounds] = useState([]);
  const [inputValue, setInputValue] = useState({ value: "", label: "" });

  const inputRef = useRef();

  function listBrands() {
    console.log("PUIITO", categorysFounds);
    return (
      <div className="absolute w-full bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg flex flex-col top-full">
        {categorysFounds.map((category) => (
          <button
            onClick={() => {
              setInputValue({
                value: category.value,
                label: category.label,
              });
              setMenuActived(false);
            }}
            className="hover:bg-gray-800"
          >
            {category.label}
          </button>
        ))}
      </div>
    );
  }
  function capitalizarPrimeraLetra(cadena: string) {
    if (cadena && cadena.length > 0) {
      return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    } else {
      return cadena;
    }
  } //CONVIERTE LA PRIMER LETRA DE UN STRING EN MAYUSCULA
  function getBrands() {
    window.api.enviarEvento("get-categoryAndBrand");
  }
  function searchInCategorys(busca: string) {
    const arrayFounds = categorys.filter((category) => {
      return category.label
        .toLocaleLowerCase()
        .includes(busca !== "" ? busca.toLocaleLowerCase() : "|||");
    });
    setBrandsFounds(arrayFounds);
  }

  useEffect(() => {
    setChangeData("category", inputValue);
  }, [inputValue]);

  useEffect(() => {
    getBrands();
    window.api.recibirEvento("response-get-categoryAndBrand", (e) => {
      const categorys = e.filter((category) => {
        if (category.typeFilter === "category") {
          return category;
        }
      });
      setCategorys(categorys);
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
        Categoria
      </label>
      <div className="flex flex-row relative">
        <input
          ref={inputRef}
          className={style}
          type="text"
          name="comprador"
          value={inputValue.label}
          onChange={(e) => {
            searchInCategorys(e.target.value);
            setInputValue({
              value: e.target.value,
              label: capitalizarPrimeraLetra(e.target.value),
            });
          }}
        />
        {categorysFounds.length > 0 && menuActived && listBrands()}
      </div>
    </div>
  );
};

export default MenuCategoryForm;
