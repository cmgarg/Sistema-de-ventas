import React from "react";

type HeadProps = {
  setRouter: (e: string) => void;
  onChangeModal: (e: boolean) => void;
};

const Head: React.FC<HeadProps> = ({ setRouter, onChangeModal }) => {
  return (
    <div className="h-14 text-3xl bg-slate-950 text-white w-full flex font-bold border-b border-slate-700 app-region-drag">
      <div className="flex h-full">
        <button
          onClick={() => setRouter("article")}
          className="w-52 flex justify-center items-center border-r bg-teal-900 hover:bg-teal-800 app-region-no-drag"
        >
          <p>Articulo</p>
        </button>
        <button
          onClick={() => setRouter("stock")}
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
        <button className="w-52 bg-cyan-600 h-full hover:bg-cyan-800 app-region-no-drag">
          <p>Agregar</p>
        </button>
      </div>
    </div>
  );
};

export default Head;
