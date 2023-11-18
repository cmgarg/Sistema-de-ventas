import React, { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

const NavMain: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="flex flex-row flex-1 bg-slate-500 h-20 items-center space-x-5 px-5">
      {children}
    </div>
  );
};

export default NavMain;
