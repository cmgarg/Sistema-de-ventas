import React, { ReactNode } from "react";
import OrdenarPor from "../mainContent/buttons/OrdenarPor";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-row bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-500 text-[#000] rounded-lg rounded-b-none justify-center text-lg font-bold h-12 sticky top-0 z-30 px-2">
      {children}
    </div>
  );
};

export default TableHead;
