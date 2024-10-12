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
    <div className="flex-1 text-white flex flex-row h-[3rem] items-center justify-center relative">
      <div className="absolute left-4">
        <div className=" flex justify-start items-center">
          <p className="text-4xl">{title}</p>
        </div>
      </div>
      <div className="flex justify-center flex-1">
        <div className="flex flex-1 flex-row justify-center space-x-5">
          {children}
        </div>
      </div>
      <div className="flex">
        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default NavMain;
