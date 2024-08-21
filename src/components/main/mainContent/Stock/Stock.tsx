import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import StockList from "./StockList";
import Buscador from "../../../buscador/Buscador";
import { useSelector } from "react-redux";

// Define el tipo para los artículos basado en el tipo articleData que espera StockList
interface ArticleData {
  article: {
    name: string;
    costo: number;
    venta: number;
    stock: {
      amount: number;
      unit: {
        abrevUnit: string;
      };
    };
  };
  code: string;
  barcode: string;
  subCategory: {
    value: string;
    label: string;
  };
  brand: {
    value: string;
    label: string;
  };
  category: {
    value: string;
    label: string;
  };
  dateToRegister: string;
}

// Define el tipo para los filtros
interface Filters {
  brand: string;
  category: string;
}

// Define el tipo para los resultados de búsqueda
interface SearchState {
  actived: boolean;
  results: ArticleData[];
}

interface StockProps {
  // Define los props si los hay, en este caso, no hay props, así que está vacío
}

const Stock: React.FC<StockProps> = () => {
  const articles = useSelector((state: { articleState: ArticleData[] }) => state.articleState);

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    category: "",
  });

  //BUSCADOR ESTADOS
  const [searchActived, setSearchActived] = useState<SearchState>({
    actived: false,
    results: [],
  });

  // Función para obtener resultados de búsqueda
  function getResults(e: ArticleData[]) {
    let object: SearchState;
    if (e.length > 0) {
      object = { actived: true, results: e };
    } else {
      object = { actived: false, results: e };
    }
    setSearchActived(object);
  }

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2 pb-5">
        <NavMain title="Stock" setLoginUser={""}>
          <Export />
          <Buscador searchIn={articles} functionReturn={getResults} />
        </NavMain>
      </div>
      <div className="flex flex-col pb-5 row-start-2 row-end-7">
        <div className="flex flex-row flex-1 overflow-auto">
          <AsideMain isActive={false} />
          <div className="w-full px-5 relative">
            <StockList
              searchActived={searchActived}
              filtersActived={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
