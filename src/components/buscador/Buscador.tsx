import React from "react";

interface MainContentProps {
  searchIn?: string;
}

const Buscador: React.FC<MainContentProps> = ({ searchIn }) => {
  return (
    <div className="w-52 h-10 rounded-xl flex items-center bg-slate-400">
      <input
        className="m-2 bg-slate-400 outline-none text-slate-50 placeholder-slate-50"
        placeholder="Buscador..."
        type="text"
      ></input>
    </div>
  );
};

export default Buscador;
