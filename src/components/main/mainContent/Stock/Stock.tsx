import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import StockList from "./StockList";
import Buscador from "../../../buscador/Buscador";
import { useSelector } from "react-redux";
import ButtonR from "../buttons/ButtonR";
import { CgAdd, CgMore } from "react-icons/cg";
import { GrAdd, GrMoreVertical } from "react-icons/gr";
import { MdMore, MdMoreTime } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import VirtualizedTable from "../../tablaMain/VirtualizedTable";
import SelectArticle from "../ventas/MenusInputs/SelectArticle";
import { articleData } from "../../../../../types/types";
import RestockForm from "./forms/RestockForm";

// Define el tipo para los artículos basado en el tipo articleData que espera StockList

// Define el tipo para los filtros
interface Filters {
  brand: string;
  category: string;
}

// Define el tipo para los resultados de búsqueda
interface SearchState {
  actived: boolean;
  results: articleData[];
}

interface StockProps {
  // Define los props si los hay, en este caso, no hay props, así que está vacío
}

const Stock: React.FC<StockProps> = () => {
  const articles = useSelector(
    (state: { articleState: articleData[] }) => state.articleState
  );
  const [router, setRouter] = useState<string>("ARTICLES");

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    category: "",
  });
  const [reStock, setReStock] = useState<boolean>(false);
  const onChangeReStockForm = () => {
    setReStock(!reStock);
  };
  //BUSCADOR ESTADOS
  const [searchActived, setSearchActived] = useState<SearchState>({
    actived: false,
    results: [],
  });

  //
  //
  function getResults(e: object[]) {
    let object: any;
    if (e.length > 0) {
      object = { actived: true, results: e };
    } else {
      object = { actived: false, results: e };
    }
    setSearchActived(object);
  }

  return (
    <div className="h-full w-full">
      {reStock ? <RestockForm setReStock={setReStock} /> : null}
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag  ">
        <NavMain title="Stock" setLoginUser={""}>
          <Export />
          <Buscador searchIn={articles} functionReturn={getResults} />
          <ButtonR
            bgColor="bg-yellow-700"
            textSize="text-sm"
            title="Reponer stock"
            borderSize="border-x-2 border-gray-600"
            bgIconColor="bg-gray-700 text-[#fff8dcff]"
            width="w-44"
            onClick={onChangeReStockForm}
            height="h-8"
          >
            <IoAdd size={25} />
          </ButtonR>
        </NavMain>
      </div>

      <div className="flex flex-col h-full overflow-auto space-y-5">
        <div className="flex flex-1">
          {router === "ARTICLES" ? (
            <StockList searchActived={searchActived} filtersActived={filters} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Stock;
