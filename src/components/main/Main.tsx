import React from "react";
import NavMain from "./navmain/NavMain";
import AsideMain from "./asidemain/AsideMain";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="flex flex-col flex-1 bg-gray-300">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain></NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={true}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5">hola h</div>
      </div>
    </div>
  );
};

export default MainContent;
