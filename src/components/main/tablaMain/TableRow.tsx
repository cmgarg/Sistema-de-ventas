import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  console.log(children, "papa");
  return (
    <div className="flex relative flex-row bg-slate-400 odd:bg-gray-800 even:bg-gray-600 text-slate-50 justify-center text-xl h-10 last:rounded-b-lg space-x-1">
      {children}
    </div>
  );
};

export default TableRow;
