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
  rounded?: boolean;
  width?: string;
  height?: string;
  disabled?: boolean;
  shadow?: boolean;
};

const ButtonR: React.FC<ButtonRProps> = ({
  children,
  onClick,
  title,
  shadow = true,
  borderSize,
  textSize,
  rounded = true,
  bgColor,
  width,
  bgIconColor,
  disabled,
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
      className={`app-region-no-drag ${borderSize ? borderSize : ""} flex ${
        height ? height : "h-12"
      } ${width ? width : "w-52"} text-white ${
        rounded ? "rounded-full" : ""
      }  relative  ${disabled ? "" : "cursor-pointer"} overflow-hidden ${
        shadow ? "shadow-[0_2px_5px_rgba(0,0,0,0.50)]" : ""
      }`}
      onMouseDown={mouseDownEvent}
      onMouseUp={mouseUpEvent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex-1 flex justify-center items-center  ${
          textSize ? textSize : "text-base"
        } select-none ${rounded ? "rounded-full" : ""} relative     `}
      >
        <div
          className={`${
            disabled
              ? "bg-black  opacity-30"
              : `  ${hoverActive ? "bg-white  opacity-5" : ""} ${
                  borderNone ? "bg-black  opacity-5" : ""
                }`
          } " absolute top-0 left-0 z-40 right-0 bottom-0 ${
            rounded ? "rounded-full" : ""
          }"`}
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
            className={`${
              title ? "w-1/4" : `w-full   ${rounded ? "rounded-l-full" : ""}`
            } ${
              bgIconColor ? bgIconColor : "bg-gray-800"
            } rounded-r-full h-full flex items-center justify-center  text-white `}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ButtonR;
