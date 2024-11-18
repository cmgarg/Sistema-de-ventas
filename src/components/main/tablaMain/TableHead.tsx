import React, { ReactNode } from "react";
import OrdenarPor from "../mainContent/buttons/OrdenarPor";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-row bg-gradient-to-l from-yellow-600 via-yellow-500 to-yellow-400 text-black rounded-lg rounded-b-none justify-center text-lg font-bold h-7 sticky top-0 z-20 px-2">
      {children}
    </div>
  );
};

export default TableHead;
