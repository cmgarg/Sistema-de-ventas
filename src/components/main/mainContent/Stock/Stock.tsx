import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import StockList from "./StockList";
import Buscador from "../../../buscador/Buscador";
import { articleData, storeType } from "../../../../../types/types";
import { useSelector } from "react-redux";

interface StockProps {
  // Define los props si los hay
}

const Stock: React.FC<StockProps> = ({}) => {
  const articles = useSelector((state: storeType) => state.articleState);

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
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2 pb-5">
        <NavMain title="Stock" setLoginUser={""}>
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
