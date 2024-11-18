import React, { ReactNode } from "react";
import { AiFillAlert } from "react-icons/ai";
import { sendNotification } from "../Main";

interface MainContentProps {
  children: ReactNode;
  title?: string;
  setLoginUser: string;
}

const NavMain: React.FC<MainContentProps> = ({
  children,
  title,
  setLoginUser,
}) => {
  return (
    <div className="flex-1 text-white flex flex-row h-full items-center justify-center relative">
      <div className="absolute h-full flex items-center left-2">
        <div className=" flex justify-start items-center">
          <p className="text-xl">{title}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-1 flex-row justify-center space-x-2 items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavMain;
