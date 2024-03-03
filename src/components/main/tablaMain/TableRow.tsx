import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  console.log(children, "papa");
  return (
    <div className="flex hover:bg-slate-900 relative flex-row border-t border-slate-600 bg-slate-950 text-slate-50 justify-center text-xl h-10">
      {children}
    </div>
  );
};

export default TableRow;
