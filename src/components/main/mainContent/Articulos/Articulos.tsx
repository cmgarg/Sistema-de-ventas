import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Agregar from "../buttons/Agregar";
import Buscador from "../../../buscador/Buscador";
import AsideMain from "../../asidemain/AsideMain";
import Export from "../buttons/Export";
import ArticleList from "./ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { articleData, storeType } from "../../../../../types/types";
import EditArticleForm from "./EDITARTICLE/EditArticleForm";
import ForAddNewArticle from "./ADDNEWARTICLE/ForAddNewArticleMain";

interface ArticulosProps {}

const Articulos: React.FC<ArticulosProps> = ({}) => {
  const articles = useSelector((state: storeType) => state.articleState);
  const categorys = useSelector((state: storeType) => state.categoryState);
  const subCategorys = useSelector(
    (state: storeType) => state.subCategoryState
  );
  const brands = useSelector((state: storeType) => state.brandState);

  const formatterCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  const formatMoney = (n: number | string) => {
    return typeof n === "string"
      ? formatterCurrency.format(Number(n))
      : formatterCurrency.format(n);
  };

  const [activeModal, setActiveModal] = useState<boolean>(false);

  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: articleData[];
  }>({
    actived: false,
    results: [],
  });

  const [articleToEdit, setArticleToEdit] = useState<{
    active: boolean;
    articleToEdit: {
      id: string;
      idArticle: string;
      code: string;
      barcode: string;
    };
  }>({
    active: false,
    articleToEdit: {
      id: "",
      idArticle: "",
      code: "",
      barcode: "",
    },
  });

  const [resDeleteArticle, setResDeleteArticle] = useState<{
    delete: boolean;
    active: boolean;
  }>({
    delete: false,
    active: false,
  });

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }

  const onChangeModalEdit = (p: boolean) => {
    setArticleToEdit((prev) => ({
      ...prev,
      active: p,
    }));
  };

  function editArticleOn(e: {
    active: boolean;
    articleToEdit: {
      id: string;
      idArticle: string;
      code: string;
      barcode: string;
    };
  }) {
    setArticleToEdit(e);
  }

  function resultFindArticles(e: articleData[], actived: boolean) {
    let object = { actived: actived, results: e };
    setSearchActived(object);
    console.log(object, "aca");
  }

  useEffect(() => {
    console.log(articles, "craneo");
    console.log(articles, "DAAAAAAAALEEEEEE");

    console.log(categorys, "()()()()()()())(((())))");
    console.log(brands, "%&%&%&%&%&%&%&%&");
  }, [articles, categorys, brands]);

  useEffect(() => {
    window.api.recibirEvento("response-delete-article", (e: boolean) => {
      if (e) {
        setResDeleteArticle({ delete: true, active: true });
        window.api.enviarEvento("get-articles");
      } else {
        setResDeleteArticle({ delete: false, active: true });
      }
    });
  }, []);

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2">
        <NavMain title="Articulos" setLoginUser={""}>
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
        <div className="w-full p-5">
          {activeModal && <ForAddNewArticle onChangeModal={onChangeModal} />}
          {articleToEdit.active && (
            <EditArticleForm
              onChangeModal={onChangeModalEdit}
              categorys={categorys}
              brands={brands}
              articles={articles}
              articleToEdit={articleToEdit.articleToEdit} 
            ></EditArticleForm>
          )}
          <ArticleList
            articles={articles}
            searchActived={searchActived}
            editArticleOn={editArticleOn}
            setResDeleteArticle={setResDeleteArticle}
          />
          {resDeleteArticle.active && (
            <div className="absolute z-50 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
              <div className="bg-slate-950 w-2/5 h-2/5 rounded-md flex flex-col justify-around items-center">
                <div className="text-4xl w-full flex justify-center">
                  <p
                    className={`${
                      resDeleteArticle.delete
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {resDeleteArticle.delete
                      ? "Se borro correctamente"
                      : "Error al borrar"}
                  </p>
                </div>
                {resDeleteArticle.delete ? (
                  <div className="flex-1 flex items-center">
                    te borre un icono
                  </div>
                ) : (
                  <div className="flex-1 flex items-center">
                    te borre un icono
                  </div>
                )}
                <button
                  className="w-full bg-green-300 rounded-b-md flex justify-center text-black font-bold hover:bg-green-200"
                  onClick={() => {
                    setResDeleteArticle({ delete: false, active: false });
                  }}
                >
                  <p>Aceptar</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articulos;
