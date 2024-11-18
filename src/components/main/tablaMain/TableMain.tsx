import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const TableMain: React.FC<TableProps> = ({ children }) => {
  const rows = React.Children.toArray(children); // Convierte los children en un array de filas

  return (
    <div className="rounded-b-lg bg-opacity-10 max-w-full border max-h-full border-[#333333] relative w-full overflow-auto">
      {children}
    </div>
  );
};

export default TableMain;
