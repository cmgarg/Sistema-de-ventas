import React, { useState } from "react";

type ButtonRProps = {
  onClick?: (a?: any, b?: any, c?: any) => void;
  children?: React.ReactNode; // Define tus props aquí
  title?: string;
  biñeta?: string;
  borderSize?: string;
  bgColor?: string;
  textSize?: string;
  bgIconColor?: string;
  width?: string;
  height?: string;
};

const ButtonR: React.FC<ButtonRProps> = ({
  children,
  onClick,
  title,
  textSize,
  bgColor,
  width,
  bgIconColor,
  height,
}) => {
  const [borderNone, setBorderNone] = useState<boolean>(false);
  const [hoverActive, setHoverActive] = useState(false);

  const mouseDownEvent = () => {
    setBorderNone(true);
    setHoverActive(false);
  };
  const mouseUpEvent = () => {
    setBorderNone(false);
    setHoverActive(true);
  };
  const onMouseEnter = () => {
    setHoverActive(true);
  };
  const onMouseLeave = () => {
    setHoverActive(false);
    setBorderNone(false);
  };
  return (
    <div
      onClick={onClick ? onClick : () => {}}
      className={`flex ${height ? height : "h-12"} ${
        width ? width : "w-52"
      } text-white font-bold rounded-full  cursor-pointer overflow-hidden`}
      onMouseDown={mouseDownEvent}
      onMouseUp={mouseUpEvent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex-1 flex justify-center items-center  ${
          textSize ? textSize : "text-base"
        } select-none rounded-full relative     `}
      >
        <div
          className={`absolute  ${hoverActive ? "bg-white  opacity-5" : ""} ${
            borderNone ? "bg-black  opacity-5" : ""
          } top-0 left-0 z-50 right-0 bottom-0 rounded-full`}
        ></div>
        {title ? (
          <div
            className={`flex-1 w-3/4  flex justify-center items-center h-full ${
              bgColor && title ? bgColor : " "
            }`}
          >
            <p>{title}</p>
          </div>
        ) : null}
        {children ? (
          <div
            className={`${title ? "w-1/4" : "w-full rounded-l-full"} ${
              bgIconColor ? bgIconColor : "bg-gray-800"
            }  rounded-r-full h-full flex items-center justify-center text-white `}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ButtonR;
