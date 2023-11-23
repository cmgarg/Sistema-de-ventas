import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <div className="flex flex-row font-normal bg-slate-400 odd:bg-slate-700 even:bg-slate-500 text-slate-50 justify-center text-xl h-7 last:rounded-b-lg">
      {children}
    </div>
  );
};

export default TableRow;
