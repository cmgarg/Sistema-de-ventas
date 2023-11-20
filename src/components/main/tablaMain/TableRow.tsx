import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <div className="flex flex-row bg-white space-x-2 text-slate-500 justify-center text-xl h-10">
      {children}
    </div>
  );
};

export default TableRow;
