import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const TableMain: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="rounded-b-lg bg-slate-300 bg-opacity-10 max-w-full max-h-full overflow-auto custom-scrollbar relative">
      {children}
    </div>
  );
};

export default TableMain;
