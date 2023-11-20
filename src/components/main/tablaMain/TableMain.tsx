import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const TableMain: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="bg-white flex-1 border-2 border-slate-600 space-y-1">
      {children}
    </div>
  );
};

export default TableMain;
