import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Agregar from "../buttons/Agregar";
import Buscador from "../../../buscador/Buscador";
import AsideMain from "../../asidemain/AsideMain";
import AddArticuloForm from "./ADDARTICULO/AddArticuloForm";
import Export from "../buttons/Export";
import ArticleList from "./ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { articleData, storeType } from "@/types";

interface ArticulosProps {}

const Articulos: React.FC<ArticulosProps> = ({}) => {
  const articles = useSelector((state: storeType) => state.articleState);

  const [activeModal, setActiveModal] = useState(false);

  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: articleData[];
  }>({
    actived: false,
    results: [],
  });
  const [articleToEdit, setArticleToEdit] = useState<{
    active: boolean;
    id: string;
  }>({
    active: false,
    id: "",
  });
  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function onChangeArticle(e: { active: boolean; id: string }) {
    setArticleToEdit(e);
  }
  function resultFindArticles(e: object[], actived: boolean) {
    let object = { actived: actived, results: e };
    setSearchActived(object);
    console.log(object, "aca");
  }
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  //////////////////////////////
  useEffect(() => {
    console.log(articles, "craneo");
  }, []);

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2">
        <NavMain title="Articulos">
          <Buscador
            searchIn={articles}
            functionReturn={resultFindArticles}
          ></Buscador>
          <Export></Export>
          <Agregar title="Articulo" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row pb-5 row-start-2 row-end-7">
        <AsideMain isActive={false}></AsideMain>
        <div className="w-full px-5 relative">
          {activeModal && (
            <AddArticuloForm onChangeModal={onChangeModal}></AddArticuloForm>
          )}
          <ArticleList articles={articles} searchActived={searchActived} />
        </div>
      </div>
    </div>
  );
};

export default Articulos;
