import React, { ReactNode } from "react";

interface CategoryProps {
  children: ReactNode;
}

const Category: React.FC<CategoryProps> = ({ children }) => {
  return (
    <div className="flex px-1">
      <div className="flex flex-1 flex-row space-x-2 items-center relative h-14">
        {children}
      </div>
    </div>
  );
};

export default Category;
