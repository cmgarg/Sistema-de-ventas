import React, { ReactNode } from "react";
import OrdenarPor from "../mainContent/buttons/OrdenarPor";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex flex-row text-slate-300 justify-center text-3xl h-12 sticky top-0 z-40">
      {children}
    </div>
  );
};

export default TableHead;
