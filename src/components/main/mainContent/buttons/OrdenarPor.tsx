import React, { ReactNode, useEffect, useState } from "react";
import Biñeta from "../Biñeta/Biñieta.js";
import MoreIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/MoreIcon.js";
import MenuContextual2 from "../../../GMC/MenuContextual2.js";
interface OrdenarPorProps {
  children: ReactNode;
}

//para ordenar la lista en lo que se eliga, a-z, mejores clientes, etc.
const OrdenarPor: React.FC<OrdenarPorProps> = ({ children }) => {
  return (
    <div
      className="w-12 h-11 bg-gray-700 rounded-lg select-none cursor-pointer relative"
      onClick={() => {}}
    >
      <div className="flex justify-center items-center h-full w-full">
        <MenuContextual2
          title={
            <Biñeta title="Ordenar por">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <MoreIcon size={25} color="#fff"></MoreIcon>
              </div>
            </Biñeta>
          }
        >
          {children}
        </MenuContextual2>
      </div>
    </div>
  );
};

export default OrdenarPor;
