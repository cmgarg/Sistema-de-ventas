import React, { useState } from "react";
import ButtonCheck from "../../ButtonCheck";
import { articleData, unitType } from "../../../../../../../../../types";

type CantidadPorProps = {
  articuloDataState: articleData;
  setChangeData: (data: string, value: any) => void;
};

const CantidadPor: React.FC<CantidadPorProps> = ({
  articuloDataState,
  setChangeData,
}) => {
  const [paletteOn, setPaletteOn] = useState(false);
  const [bultoOn, setBultoOn] = useState(false);
  const [unidadOn, setUnidadOn] = useState(false);

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
            {paletteOn ? (
              <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
                <input
                  type="text"
                  name="palette"
                  className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
                  value={
                    articuloDataState.palette
                      ? `${articuloDataState.palette.value}`
                      : "0"
                  }
                  onChange={(e) => {
                    setChangeData("paletteValue", e.target.value);
                  }}
                  disabled={!articuloDataState.palette ? true : false}
                />
                <button
                  onClick={() => setPaletteOn(false)}
                  className="bg-red-600 rounded-lg p-2 text-xs"
                >
                  No establecer
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPaletteOn(true)}
                className="w-full bg-green-900 h-14 rounded-lg px-2"
              >
                Establecer
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 relative space-y-1">
          <div className="flex h-5">
            <label htmlFor="costo" className="select-none">
              x BULTO
            </label>
          </div>
          {bultoOn ? (
            <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
              <input
                type="text"
                name="palette"
                className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
                value={
                  articuloDataState.palette
                    ? `${articuloDataState.palette.value}`
                    : "0"
                }
                onChange={(e) => {
                  setChangeData("paletteValue", e.target.value);
                }}
                disabled={!articuloDataState.palette ? true : false}
              />
              <button
                onClick={() => setBultoOn(false)}
                className="bg-red-600 rounded-lg p-2 text-xs"
              >
                No establecer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setBultoOn(true)}
              className="w-full bg-green-900 h-14 rounded-lg px-2"
            >
              Establecer
            </button>
          )}
        </div>
        <div className="flex-1 relative space-y-1">
          <div className="flex h-5">
            <label htmlFor="costo" className="select-none">
              x {articuloDataState.article.stock.unit.label}
            </label>
          </div>
          {unidadOn ? (
            <div className="flex bg-slate-900 border border-slate-700 rounded-lg h-14 w-full">
              <input
                type="text"
                name="palette"
                className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
                value={
                  articuloDataState.palette
                    ? `${articuloDataState.palette.value}`
                    : "0"
                }
                onChange={(e) => {
                  setChangeData("paletteValue", e.target.value);
                }}
                disabled={!articuloDataState.palette ? true : false}
              />
              <button
                onClick={() => setUnidadOn(false)}
                className="bg-red-600 rounded-lg p-2 text-xs"
              >
                No establecer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setUnidadOn(true)}
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
