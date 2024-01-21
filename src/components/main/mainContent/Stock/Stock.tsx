import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Agregar from "../buttons/Agregar";
import StockList from "./StockList";
import Category from "../Category/Category";
import Select from "../Select/Select";
import AddCategory from "./forms/AddCategory";
import Addbrand from "./forms/AddBrand";
import Buscador from "../../../buscador/Buscador";
import Articulos from "../Articulos/Articulos";

interface StocktProps {
  //PROPS
}

const Stock: React.FC<StocktProps> = (
  {
    /*PROPS*/
  }
) => {
  const [activeModal, setActiveModal] = useState(false);

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
  });

  const [articulos, setArticulos] = useState<object[]>([]);
  const [formCategory, setFormCategory] = useState(false);
  const [formBrand, setFormBrand] = useState(false);
  //BUSCADOR ESTADOS
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: object[];
  }>({
    actived: false,
    results: [],
  });
  //ESTILOS DE LOS MENU DE LOS ESTILOS
  function changeCategory() {
    setFormCategory(!formCategory);
  }
  function changeBrand() {
    setFormBrand(!formBrand);
  }

  //FILTROS opciones
  const [optionsBrand, setOptionsBrand] = useState<object[]>([]);
  const [optionsCategory, setOptionsCategory] = useState<object[]>([]);
  function addOptionCategory(option: object) {
    setOptionsCategory([...optionsCategory, option]);
  }
  function addOptionBrand(option: object) {
    setOptionsBrand([...optionsBrand, option]);
  }
  //FUNCIONES DE FILTRO DE brand
  function onChangeFilter(e, f) {
    if (f === "brand") {
      setFilters({ ...filters, brand: e.toLowerCase() });
    } else if (f === "category") {
      setFilters({ ...filters, category: e.toLowerCase() });
    }
  }
  //

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function obtenerVentas() {
    window.api.enviarEvento("obtener-ventas");
  }
  function getCategoryAndbrand() {
    window.api.enviarEvento("get-categoryAndBrand");
  }
  function getArticles() {
    window.api.enviarEvento("get-articles");
  }
  function getResults(e: object[]) {
    console.log(articulos, "FORRRRRRRRRRRRRRROO");
    let object = { actived: true, results: e };
    setSearchActived(object);
  }
  /////LISTA DE ARTICULSO
  useEffect(() => {
    getArticles();
    window.api.recibirEvento("response-get-articles", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  ///carga de ventas
  useEffect(() => {
    getArticles();
    getCategoryAndbrand();
    window.api.recibirEvento("response-get-categoryAndBrand", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);

      const arrayBrands: object[] = [];
      const arrayCategory: object[] = [];

      e.map(
        (e: {
          value: string;
          label: string;
          typeFilter: string;
          _id: string;
        }) => {
          if (e.typeFilter === "brand") {
            arrayBrands.push(e);
            setOptionsBrand(arrayBrands);
          } else if (e.typeFilter === "category") {
            arrayCategory.push(e);
            setOptionsCategory(arrayCategory);
          }
        }
      );
    });
  }, []);
  //////////////////////////////
  useEffect(() => {
    console.log(articulos, "gohaaaaaaaaaaaaaan");
  }, [articulos]);

  return (
    <div className="flex flex-col flex-1 relative max-w-full overflow-auto">
      <div className="flex-2 border-b-2 border-slate-100 bg-slate-800">
        <NavMain title="Ventas">
          <Export></Export>
          <Buscador searchIn={articulos} functionReturn={getResults}></Buscador>
        </NavMain>
      </div>
      <Category>
        <Select
          options={optionsBrand}
          value={filters.brand}
          onChangeSelection={onChangeFilter}
          filter={"brand"}
          placeholder="Seleccionar Marca"
          functionLastOption={changeBrand}
        ></Select>
        <Select
          options={optionsCategory}
          value={filters.category}
          onChangeSelection={onChangeFilter}
          filter={"category"}
          placeholder="Seleccionar Categoria"
          functionLastOption={changeCategory}
        ></Select>
      </Category>
      <div className="flex flex-row flex-1 overflow-auto custom-scrollbar">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-2">
          <StockList
            searchActived={searchActived}
            filtersActived={filters}
          ></StockList>
        </div>
      </div>
      {formCategory && (
        <AddCategory
          onChangeModal={changeCategory}
          addOptionCategory={addOptionCategory}
        />
      )}
      {formBrand && (
        <Addbrand onChangeModal={changeBrand} addOptionBrand={addOptionBrand} />
      )}
    </div>
  );
};

export default Stock;
