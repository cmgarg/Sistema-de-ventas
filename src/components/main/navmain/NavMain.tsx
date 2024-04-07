import React, { ReactNode } from "react";
import UsuarioIniciado from "./UsuarioIniciado";

interface MainContentProps {
  children: ReactNode;
  title?: string;
}

const NavMain: React.FC<MainContentProps> = ({
  children,
  title,
  setLoginUser,
}) => {
  return (
    <div className="flex-1 flex flex-row h-10 items-center justify-between space-x-5 px-5">
      <div className=" flex-1">
        <div className="h-full text-slate-50 flex justify-start items-center">
          <p className="text-4xl">{title}</p>
        </div>
      </div>
      <div className=" flex-1 flex justify-center">
        <div className="flex flex-row space-x-5">{children}</div>
      </div>
      <div className=" flex-1 flex justify-end">
        <UsuarioIniciado setLoginUser={setLoginUser} />
      </div>
    </div>
  );
};

export default NavMain;
