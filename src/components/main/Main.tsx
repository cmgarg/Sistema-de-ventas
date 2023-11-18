import React, { useEffect, useState } from "react";
import ClientesContent from "./mainContent/clientes/ClientesContent";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="flex flex-col flex-1 bg-gray-300">
      <ClientesContent></ClientesContent>
    </div>
  );
};

export default MainContent;
