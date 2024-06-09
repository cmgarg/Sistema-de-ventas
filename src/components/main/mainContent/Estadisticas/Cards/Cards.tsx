import React from "react";

type CardsProps = {
  // Define tus props aquí
};

const Cards: React.FC<CardsProps> = (props) => {
  return (
    <div className="w-full h-1/4 bg-slate-700 flex p-2 space-x-2">
      <div className="flex-1 flex flex-col h-full border border-slate-800 rounded-lg">
        <div className="h-10 text-lg bg-slate-800">Titulo</div>
        <div className="flex-1 bg-slate-950 text-xl text-red-200">Dato</div>
        <div className="h-5 w-full">info adicional</div>
      </div>
      <div className="flex-1 flex flex-col h-full border border-slate-800 rounded-lg">
        <div className="h-10 text-lg bg-slate-800">Titulo</div>
        <div className="flex-1 bg-slate-950 text-xl text-red-200">Dato</div>
        <div className="h-5 w-full">info adicional</div>
      </div>
      <div className="flex-1 flex flex-col h-full border border-slate-800 rounded-lg">
        <div className="h-10 text-lg bg-slate-800">Titulo</div>
        <div className="flex-1 bg-slate-950 text-xl text-red-200">Dato</div>
        <div className="h-5 w-full">info adicional</div>
      </div>
      <div className="flex-1 flex flex-col h-full border border-slate-800 rounded-lg">
        <div className="h-10 text-lg bg-slate-800">Titulo</div>
        <div className="flex-1 bg-slate-950 text-xl text-red-200">Dato</div>
        <div className="h-5 w-full">info adicional</div>
      </div>
    </div>
  );
};

export default Cards;
