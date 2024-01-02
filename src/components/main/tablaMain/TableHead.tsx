import React, { ReactNode } from "react";
import OrdenarPor from "../mainContent/buttons/OrdenarPor";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex flex-row space-x-px text-slate-500 justify-center text-3xl rounded-lg h-12 relative">
      {children}
    </div>
  );
};

export default TableHead;
