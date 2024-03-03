import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Agregar from "../buttons/Agregar";
import Buscador from "../../../buscador/Buscador";
import AsideMain from "../../asidemain/AsideMain";
import TableHead from "../../tablaMain/TableHead";
import TableMain from "../../tablaMain/TableMain";
import TableRow from "../../tablaMain/TableRow";
import AddArticuloForm from "./ADDARTICULO/AddArticuloForm";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import Export from "../buttons/Export";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";

interface ArticulosProps {}

const Articulos: React.FC<ArticulosProps> = ({}) => {
  const [activeModal, setActiveModal] = useState(false);

  const [articulos, setArticulos] = useState<object[]>([]);
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: object[];
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
  function obtenerArticulos() {
    window.api.enviarEvento("get-articles");
  }
  function onChangeArticle(e: { active: boolean; id: string }) {
    setArticleToEdit(e);
  }

  function addArticles(article: object) {
    setArticulos([...articulos, article]);
  }
  function resultFindArticles(e: object[], actived: boolean) {
    let object = { actived: actived, results: e };
    setSearchActived(object);
    console.log(object, "aca");
  }
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  ///carga de articulos
  useEffect(() => {
    obtenerArticulos();
    window.api.recibirEvento("response-get-articles", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  //////////////////////////////

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 pt-2">
        <NavMain title="Articulos">
          <Buscador
            searchIn={articulos}
            functionReturn={resultFindArticles}
          ></Buscador>
          <Export></Export>
          <Agregar title="Articulo" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 p-5 relative">
          {activeModal && (
            <AddArticuloForm
              onChangeModal={onChangeModal}
              addArticles={addArticles}
            ></AddArticuloForm>
          )}
          <ArticleList
            articulos={articulos}
            setArticulos={setArticulos}
            articleToEdit={articleToEdit}
            setArticleToEdit={onChangeArticle}
            searchActived={searchActived}
          />
        </div>
      </div>
    </div>
  );
};

export default Articulos;
