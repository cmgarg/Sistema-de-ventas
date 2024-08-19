import React, { useState } from "react";
import { Action, articleData } from "../../../../../../../../../types/types";

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
    <div className="flex flex-col flex-1">
      <div className="flex justify-start font-bold text-2xl pl-2">
        <p>Cantidad</p>
      </div>
      <div className="flex flex-1 space-x-1 pl-1">
        <div className="flex-1 flex">
          <div className="flex-1 relative space-y-1">
            <div className="flex flex-1 h-5">
              <label htmlFor="costo" className="select-none">
                x PALETTE
              </label>
            </div>
            {stateArticle.article.pallet.active ? (
              <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
                <input
                  type="text"
                  name="palette"
                  className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
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
                  className="bg-red-600 rounded-lg p-2 text-xs"
                >
                  No establecer
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  dispatch({ type: "SET_PALETTEACTIVE", payload: true })
                }
                className="w-full bg-green-900 h-14 rounded-lg px-2"
              >
                Establecer
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 relative space-y-1">
          <div className="flex h-5">
            <label htmlFor="bulk" className="select-none">
              x BULTO
            </label>
          </div>
          {stateArticle.article.forBulk.active ? (
            <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
              <input
                type="text"
                name="bulk"
                className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
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
                className="bg-red-600 rounded-lg p-2 text-xs"
              >
                No establecer
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "SET_BULKACTIVE", payload: true })
              }
              className="w-full bg-green-900 h-14 rounded-lg px-2"
            >
              Establecer
            </button>
          )}
        </div>
        <div className="flex-1 relative space-y-1">
          <div className="flex h-5">
            <label htmlFor="costo" className="select-none">
              x {stateArticle.article.stock.unit.label}
            </label>
          </div>
          {stateArticle.article.quantityperunit.active ? (
            <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
              <input
                type="text"
                name="palette"
                className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
                value={
                  stateArticle.article.quantityperunit.active
                    ? `${stateArticle.article.quantityperunit.value}`
                    : "0"
                }
                onChange={(e) => {
                  dispatch({
                    type: "SET_QUANTITYPERUNITVALUE",
                    payload: e.target.value,
                  });
                }}
                disabled={
                  !stateArticle.article.quantityperunit.active ? true : false
                }
              />
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_QUANTITYPERUNITACTIVE",
                    payload: false,
                  })
                }
                className="bg-red-600 rounded-lg p-2 text-xs"
              >
                No establecer
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "SET_QUANTITYPERUNITACTIVE", payload: true })
              }
              className="w-full bg-green-900 h-14 rounded-lg px-2"
            >
              Establecer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CantidadPor;
