import React, { useEffect, useState } from "react";
import CategoryAndBrand from "./InputBrandAndCategory/CategoryAndBrand";
import Modals from "../Modals";
import { articleData } from "../../../../../../../types";
import Impuestos from "./Impuestos";
import SaleAndCost from "./SaleAndCost";
import CategoryAndBrandForm from "./InputBrandAndCategory/CategoryAndBrandForm";

type ArticleProps = {
  articleState: articleData; // Define tus props aquí
  setChangeData: (e: string, value: string) => void;
  errorToSave: { active: boolean; type: string; message: string };
};

const Article: React.FC<ArticleProps> = ({
  articleState,
  setChangeData,
  errorToSave,
}) => {
  const [addBrandInput, setAddBrandInput] = useState(false);
  const [addCategoryInput, setAddCategoryInput] = useState(false);
  const [addSubCategoryInput, setAddSubCategoryInput] = useState(false);

  const inputStyle =
    "bg-slate-900 rounded-lg border border-slate-500 px-2 h-14 outline-none";
  return (
    <div className="text-slate-50 font-thin h-full flex flex-col">
      <div className="flex flex-col text-xl p-2 space-y-5">
        <div className="flex flex-1 space-x-5">
          <div className="flex-1 flex flex-col">
            <label htmlFor="name">Articulo</label>
            <input
              type="text"
              className={`${inputStyle}  font-mono`}
              value={articleState.article.name}
              onChange={(e) => {
                setChangeData("article", e.target.value);
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="articulo" className="select-none">
              Código
            </label>
            <input
              type="text"
              className={`${inputStyle}`}
              name="articulo"
              value={articleState.article.name}
              onChange={(e) => {
                setChangeData("article", e.target.value);
              }}
            />
          </div>
        </div>
        <CategoryAndBrand
          articuloDataState={articleState}
          errorToSave={errorToSave}
          inputStyle={inputStyle}
          setAddBrandInput={setAddBrandInput}
          setAddCategoryInput={setAddCategoryInput}
          setAddSubCategoryInput={setAddSubCategoryInput}
          setChangeData={setChangeData}
        />
      </div>
      <SaleAndCost
        articleState={articleState}
        setChangeData={setChangeData}
        inputStyle={inputStyle}
      />
      {addBrandInput || addCategoryInput || addSubCategoryInput ? (
        <CategoryAndBrandForm
          addBrandInput={addBrandInput}
          addCategoryInput={addCategoryInput}
          addSubCategoryInput={addSubCategoryInput}
          setAddBrandInput={setAddBrandInput}
          setAddCategoryInput={setAddCategoryInput}
          setAddSubCategoryInput={setAddSubCategoryInput}
        />
      ) : null}
      <div className="flex h-60 border-t p-2 border-slate-700 ">
        <div className="flex-1 flex flex-col h-full border-r border-slate-800 pr-2 relative">
          <div className="absolute right-0 bottom-0 h-10 w-10"></div>
          <p className="select-none">Descripción</p>
          <textarea
            value={articleState.article.description}
            onChange={(e) => {
              setChangeData("description", e.target.value);
            }}
            className="flex-1 text-xl bg-slate-900 border border-slate-800 rounded-lg px-2 pt-1 outline-none"
          />
        </div>
        <Impuestos articleState={articleState} setChangeData={setChangeData} />
      </div>
    </div>
  );
};

export default Article;
