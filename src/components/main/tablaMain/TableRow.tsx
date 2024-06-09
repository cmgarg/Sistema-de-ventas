import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
  deploy?: boolean;
  padding?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, deploy, padding }) => {
  console.log(children, "papa");
  return (
    <div
      className={`flex hover:bg-slate-900 relative flex-row border-t bg-slate-950 border-slate-600  text-slate-50 justify-center text-lg items-center ${
        deploy ? "" : "h-12"
      } ${padding ? "px-2" : ""}`}
    >
      {children}
    </div>
  );
};

export default TableRow;
