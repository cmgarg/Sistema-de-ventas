import React, { ReactNode } from "react";

interface CategoryProps {
  children: ReactNode;
}

const Category: React.FC<CategoryProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-1 flex-row">{children}</div>
    </div>
  );
};

export default Category;
