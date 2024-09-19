import React, { useState } from "react";
import { Action, articleData } from "../../../../../../../../../types/types";
import ButtonR from "../../../../../buttons/ButtonR";
import { MdCancel } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

type CantidadPorProps = {
  stateArticle: articleData;
  dispatch: React.Dispatch<Action>;
  errorIn: string[];
};

const CantidadPor: React.FC<CantidadPorProps> = ({
  stateArticle,
  dispatch,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-1 pl-1">
        <div className="flex">
          <div className="relative space-y-1">
            <div className="flex flex-1 h-5">
              <label htmlFor="costo" className="select-none">
                x PALETTE
              </label>
            </div>
            {stateArticle.article.pallet.active ? (
              <div className="flex border border-slate-700 rounded-lg h-10 w-32">
                <input
                  type="text"
                  name="palette"
                  className={
                    "bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] outline-none h-10 w-full rounded-l-md  border border-slate-800 px-2"
                  }
                  value={
                    stateArticle.article.pallet.active
                      ? `${stateArticle.article.pallet.value}`
                      : "0"
                  }
                  onChange={(e) => {
                    dispatch({
                      type: "SET_PALETTEVALUE",
                      payload: e.target.value,
                    });
                  }}
                  disabled={!stateArticle.article.pallet ? true : false}
                />
                <button
                  onClick={() =>
                    dispatch({ type: "SET_PALETTEACTIVE", payload: false })
                  }
                  className="w-10 h-10 bg-red-900 rounded-r-md flex justify-center items-center"
                >
                  <GiCancel size={20} />
                </button>
              </div>
            ) : (
              <ButtonR
                onClick={() =>
                  dispatch({ type: "SET_PALETTEACTIVE", payload: true })
                }
                width="w-32"
                height="h-10"
                bgColor="bg-gradient-to-l text-[#ffd700ff] from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
                title="Establecer"
              ></ButtonR>
            )}
          </div>
        </div>
        <div className="relative space-y-1">
          <div className="flex h-5">
            <label htmlFor="bulk" className="select-none">
              x BULTO
            </label>
          </div>
          {stateArticle.article.forBulk.active ? (
            <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-10 w-32">
              <input
                type="text"
                name="bulk"
                className={
                  "bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] outline-none h-10 w-full rounded-l-md  border border-slate-800 px-2"
                }
                value={
                  stateArticle.article.forBulk.active
                    ? `${stateArticle.article.forBulk.value}`
                    : "0"
                }
                onChange={(e) => {
                  dispatch({ type: "SET_BULKVALUE", payload: e.target.value });
                }}
                disabled={!stateArticle.article.forBulk.active ? true : false}
              />
              <button
                onClick={() =>
                  dispatch({ type: "SET_BULKACTIVE", payload: false })
                }
                className="w-10 h-10 bg-red-900 rounded-r-md flex justify-center items-center"
              >
                <GiCancel size={20} />
              </button>
            </div>
          ) : (
            <ButtonR
              onClick={() =>
                dispatch({ type: "SET_BULKACTIVE", payload: true })
              }
              width="w-32"
              height="h-10"
              bgColor="bg-gradient-to-l text-[#ffd700ff]  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
              title="Establecer"
            ></ButtonR>
          )}
        </div>
      </div>
    </div>
  );
};

export default CantidadPor;
