import React, { useEffect, useState } from "react";
import CategoryAndBrand from "./InputBrandAndCategory/CategoryAndBrand";
import Modals from "../Modals";
import { Action, articleData } from "../../../../../../../types/types";
import Impuestos from "./Impuestos";
import SaleAndCost from "./SaleAndCost";
import CategoryAndBrandForm from "./InputBrandAndCategory/CategoryAndBrandForm";

type ArticleProps = {
  errorToSave: { active: boolean; type: string; message: string };
  stateArticle: articleData;
  router: string;
  errorIn: string[];
  dispatch: React.Dispatch<Action>;
};

const Article: React.FC<ArticleProps> = ({
  stateArticle,
  errorIn,
  dispatch,
  errorToSave,
}) => {
  const [addBrandInput, setAddBrandInput] = useState(false);
  const [addCategoryInput, setAddCategoryInput] = useState(false);
  const [addSubCategoryInput, setAddSubCategoryInput] = useState(false);

  const inputStyle =
    "bg-[#707070ff] focus:bg-[#909090ff] font-normal rounded-md  shadow-[0_2px_5px_rgba(0,0,0,0.50)] px-2 h-10 outline-none";
  return (
    <div className="flex flex-1 flex-col pt-2 bg-yellow-500">
      <div className="flex flex-col w-full space-y-5">
        <div className="flex flex-1 space-x-5 px-2">
          <div className="flex-1 flex flex-col">
            <label htmlFor="name">Articulo</label>
            <input
              type="text"
              spellCheck="false"
              className={` ${inputStyle} ${
                errorIn.includes("ARTICLENAME")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
              value={stateArticle.article.name}
              onChange={(e) => {
                dispatch({ type: "SET_NAME", payload: e.target.value });
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="barcode" className="select-none">
              Código
            </label>
            <input
              type="text"
              spellCheck="false"
              className={`${inputStyle} ${
                errorIn.includes("BARCODE")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
              name="barcode"
              value={stateArticle.barcode}
              onChange={(e) => {
                dispatch({ type: "SET_BARCODE", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 border-t border-slate-700 ">
          <CategoryAndBrand
            stateArticle={stateArticle}
            errorToSave={errorToSave}
            inputStyle={inputStyle}
            setAddBrandInput={setAddBrandInput}
            setAddCategoryInput={setAddCategoryInput}
            setAddSubCategoryInput={setAddSubCategoryInput}
            errorIn={errorIn}
            dispatch={dispatch}
          />
          <div className="flex flex-1 h-full p-2">
            <div className="flex-1 flex flex-col h-24 border-r border-slate-800 pr-2 relative">
              <div className="absolute right-0 bottom-0 h-10 w-10"></div>
              <p className="select-none">Descripción</p>
              <textarea
                value={stateArticle.article.description}
                autoCorrect={""}
                spellCheck={false}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DESCRIPTION",
                    payload: e.target.value,
                  });
                }}
                className="flex-1 bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg px-2 pt-1 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <SaleAndCost
        dispatch={dispatch}
        stateArticle={stateArticle}
        errorIn={errorIn}
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
    </div>
  );
};

export default Article;
