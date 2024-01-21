import React, { ReactNode } from "react";

interface CategoryProps {
  children: ReactNode;
}

const Category: React.FC<CategoryProps> = ({ children }) => {
  return (
    <div className="flex px-1 bg-slate-700">
      <div className="flex flex-1 flex-row">{children}</div>
    </div>
  );
};

export default Category;
