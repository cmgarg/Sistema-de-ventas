import React, { ReactNode } from "react";
import OrdenarPor from "../mainContent/buttons/OrdenarPor";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex flex-row space-x-px text-slate-500 justify-center text-3xl rounded-lg h-12 relative">
      {children}
      <div className="w-12 h-11 bg-gray-700 rounded-lg flex justify-center items-center select-none cursor-pointer absolute right-0">
        <OrdenarPor></OrdenarPor>
      </div>
    </div>
  );
};

export default TableHead;
