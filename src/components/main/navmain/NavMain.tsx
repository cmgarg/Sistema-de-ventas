import React from "react";
import Buscador from "../../buscador/Buscador";

interface MainContentProps {}

const NavMain: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="flex flex-row flex-1 bg-slate-500 h-20 items-center space-x-5 px-5">
      <div className="w-10 h-10 bg-red-300 rounded-full flex justify-center items-center">
        +
      </div>
      <Buscador></Buscador>
    </div>
  );
};

export default NavMain;
