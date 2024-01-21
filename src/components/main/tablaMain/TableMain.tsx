import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const TableMain: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="bg-slate-600 rounded-b-lg border-slate-600 max-w-full max-h-full overflow-auto custom-scrollbar relative">
      {children}
    </div>
  );
};

export default TableMain;
