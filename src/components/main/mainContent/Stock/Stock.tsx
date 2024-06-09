import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import StockList from "./StockList";
import Category from "../Category/Category";
import AddCategory from "./forms/AddCategory";
import Addbrand from "./forms/AddBrand";
import Buscador from "../../../buscador/Buscador";
import SelectM from "../Select/Select";
import { articleData, storeType } from "../../../../../types";

import { useSelector } from "react-redux";

interface StocktProps {
  //PROPS
}

const Stock: React.FC<StocktProps> = (
  {
    /*PROPS*/
  }
) => {
  const articles = useSelector((state: storeType) => state.articleState);

  const [activeModal, setActiveModal] = useState(false);

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
  });
  //BUSCADOR ESTADOS
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: articleData[];
  }>({
    actived: false,
    results: [],
  });
  //FILTROS opciones
  const [optionsBrand, setOptionsBrand] = useState<object[]>([]);
  const [optionsCategory, setOptionsCategory] = useState<object[]>([]);
  //FUNCIONES DE FILTRO DE brand
  function onChangeFilter(e, f) {
    if (f === "brand") {
      setFilters({ ...filters, brand: e.toLowerCase() });
    } else if (f === "category") {
      setFilters({ ...filters, category: e.toLowerCase() });
    }
  }
  //
  function getResults(e: object[]) {
    let object;
    if (e.length > 0) {
      object = { actived: true, results: e };
    } else {
      object = { actived: false, results: e };
    }
    setSearchActived(object);
  }
  /////LISTA DE ARTICULSO
  ///carga de ventas
  //////////////////////////////

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2">
        <NavMain title="Stock">
          <Export></Export>
          <Buscador searchIn={articles} functionReturn={getResults}></Buscador>
        </NavMain>
      </div>
      <div className="flex flex-col pb-5 row-start-2 row-end-7">
        <div className="flex flex-row flex-1 overflow-auto">
          <AsideMain isActive={false}></AsideMain>
          <div className="w-full px-5 relative">
            <StockList
              searchActived={searchActived}
              filtersActived={filters}
            ></StockList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
