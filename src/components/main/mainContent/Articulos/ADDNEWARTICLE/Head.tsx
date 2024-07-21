import React from "react";
import { articleData, unitType } from "../../../../../../types/types";

type HeadProps = {
  setRouter: (e: string) => void;
  router: string;
  onChangeModal: (e: boolean) => void;
  errorIn: string[];
  setErrorIn: (e: string[]) => void;
  stateArticle: articleData;
};

const Head: React.FC<HeadProps> = ({
  setRouter,
  router,
  setErrorIn,
  onChangeModal,
  stateArticle,
}) => {
  const saveNewArticle = () => {
    console.log("SAVE NEW ARTICLE");
    const errors: string[] = [];
    if (stateArticle.article.name === "") errors.push("ARTICLENAME");
    if (stateArticle.barcode === "") errors.push("BARCODE");
    if (stateArticle.brand.value === "") errors.push("BRAND");
    if (stateArticle.category.value === "") errors.push("CATEGORY");
    if (stateArticle.article.costo === 0) errors.push("COST");
    if (stateArticle.article.stock.amount === 0) errors.push("STOCK");
    console.log(errors, "ERRORES A VER");
    if (errors.length > 0) {
      return setErrorIn([...errors]);
    } else {
      console.log("AVEEEEEEEEEEEER");
      window.api.enviarEvento("save-article", stateArticle);
    }
  };
  return (
    <div className="h-14 text-3xl bg-slate-950 text-white w-full flex font-bold border-b border-slate-700 app-region-drag">
      <div className="flex h-full">
        <button
          onClick={() =>
            router !== "article" ? setRouter("article") : () => {}
          }
          className="w-52 flex justify-center items-center border-r bg-teal-900 hover:bg-teal-800 app-region-no-drag"
        >
          <p>Articulo</p>
        </button>
        <button
          onClick={() => (router !== "stock" ? setRouter("stock") : () => {})}
          className="w-52 flex justify-center items-center bg-teal-900 hover:bg-teal-800 rounded-r-full app-region-no-drag"
        >
          <p>Stock</p>
        </button>
      </div>
      <div className="flex-1 h-full flex text-xl justify-center items-center bg-slate-950">
        <p>AGREGANDO ARTICULO</p>
      </div>
      <div>
        <button
          onClick={() => onChangeModal(false)}
          className="w-52 bg-rose-700 h-full hover:bg-rose-800 rounded-l-full app-region-no-drag"
        >
          <p>Cancelar</p>
        </button>
        <button
          onClick={saveNewArticle}
          className="w-52 bg-cyan-600 h-full hover:bg-cyan-800 app-region-no-drag"
        >
          <p>Agregar</p>
        </button>
      </div>
    </div>
  );
};

export default Head;
