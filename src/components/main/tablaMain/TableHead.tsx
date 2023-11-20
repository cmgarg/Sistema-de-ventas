import React, { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <div className="flex flex-row bg-white space-x-2 text-slate-200 justify-center text-base">
      {children}
    </div>
  );
};

export default TableHead;
