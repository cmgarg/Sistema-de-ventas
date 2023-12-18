import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const TableMain: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="bg-slate-600 border-2 border-slate-600 rounded-xl">
      {children}
    </div>
  );
};

export default TableMain;
