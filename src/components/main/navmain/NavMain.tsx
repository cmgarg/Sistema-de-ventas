import React, { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
  title?: string;
}

const NavMain: React.FC<MainContentProps> = ({ children, title }) => {
  return (
    <div className="flex flex-row flex-1 bg-slate-500 h-20 items-center justify-between space-x-5 px-5">
      <div className="h-full text-slate-50 flex justify-start items-center">
        <p className="text-3xl">{title}</p>
      </div>
      <div className="flex flex-row space-x-5">{children}</div>
    </div>
  );
};

export default NavMain;
