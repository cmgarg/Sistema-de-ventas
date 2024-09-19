import React from "react";

type SubNavProps = {
  changeMainContent: (e: string) => void; // Define tus props aquí
  router: string;
};

const SubNav: React.FC<SubNavProps> = ({ changeMainContent, router }) => {
  return (
    <div className="h-10 w-fit flex border rounded-full border-gray-700">
      <div
        onClick={() => changeMainContent("ARTICLES")}
        className={`cursor-pointer border-r border-gray-700 h-full w-32 flex justify-center rounded-l-full select-none items-center text-white hover:text-gray-200 hover:bg-gray-700 ${
          router == "ARTICLES" ? "bg-yellow-600" : ""
        }`}
      >
        <p>Articulos</p>
      </div>
      <div
        onClick={() => changeMainContent("DEPOSITS")}
        className={`cursor-pointer border-r border-gray-700 h-full w-32 flex justify-center items-center select-none text-white hover:text-gray-200 hover:bg-gray-700 ${
          router == "DEPOSITS" ? "bg-yellow-600" : ""
        }`}
      >
        <p>Depositos</p>
      </div>
      <div
        onClick={() => changeMainContent("SUPPLIERS")}
        className={`cursor-pointer border-r border-gray-700 h-full w-32 flex justify-center rounded-r-full select-none items-center text-white hover:text-gray-200 hover:bg-gray-700 ${
          router == "SUPPLIERS" ? "bg-yellow-600" : ""
        }`}
      >
        <p>Proveedores</p>
      </div>
    </div>
  );
};

export default SubNav;
