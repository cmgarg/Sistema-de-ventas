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
import Filters from "./Filters/Filters";

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
  const [filtersActived, setFiltersActived] = useState<{
    category: string;
    brand: string;
    subCategory: string;
  }>({
    category: "",
    brand: "",
    subCategory: "",
  });
  const articles = useSelector(
    (state: { articleState: articleData[] }) => state.articleState
  );
  const [articlesListShow, setArticlesListShow] = useState<articleData[]>([]);
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
  const checkFilters = () => {
    const { brand, subCategory, category } = filtersActived;
    const brandEmpty = brand.length === 0;
    const categoryEmpty = category.length === 0;
    const subCategoryEmpty = subCategory.length === 0;

    return articles.filter((article) => {
      const brandActive =
        brandEmpty || brand.toLowerCase() === article.brand.value.toLowerCase();
      const categoryActive =
        categoryEmpty ||
        category.toLowerCase() === article.category.value.toLowerCase();
      const subCategoryActive =
        subCategoryEmpty ||
        subCategory.toLowerCase() === article.subCategory.value.toLowerCase();

      return brandActive && categoryActive && subCategoryActive;
    });
  };

  useEffect(() => {
    const newArticleList = checkFilters();
    console.log("TIENE QUE MOSTRART", newArticleList);
    setArticlesListShow([...newArticleList]);
  }, [filtersActived]);
  useEffect(() => {
    setArticlesListShow(articles);
  }, []);

  return (
    <div className="h-full w-full">
      {reStock ? <RestockForm setReStock={setReStock} /> : null}
      <button
        onClick={() => setFiltersActived({ ...filtersActived })}
        className="h-10 w-52"
      >
        prueba
      </button>
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag  ">
        <NavMain title="Stock" setLoginUser={""}>
          <Export />
          <Buscador searchIn={articlesListShow} functionReturn={getResults} />
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

      <div className="flex flex-col h-full overflow-auto">
        <Filters
          filtersActived={filtersActived}
          setFiltersActived={setFiltersActived}
        />
        <div className="flex flex-1">
          {router === "ARTICLES" ? (
            <StockList
              searchActived={searchActived}
              filtersActived={filters}
              articlesListShow={articlesListShow}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Stock;
