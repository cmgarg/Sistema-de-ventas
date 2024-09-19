import React, { ReactNode, useState, HTMLAttributes } from "react";

interface TableRowProps {
  children: ReactNode;
  deploy?: boolean;
  padding?: boolean;
}
type myComponentProps = TableRowProps & HTMLAttributes<HTMLDivElement>;

const TableRow: React.FC<myComponentProps> = (props) => {
  const { children, deploy, padding, ...divProps } = props;
  const [hoverState, setHoverState] = useState<boolean>(false);

  return (
    <div
      {...divProps}
      className={`flex relative flex-row text-[#fff8dcff] ${
        hoverState && ""
      } border-t bg-[#2f2f2fff] border-gray-900 justify-center text-lg items-center transition-all cursor-pointer ${
        deploy ? "" : "h-12"
      } ${padding ? "px-2" : ""}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <div
        className={`absolute z-20 right-0 top-0 bottom-0 left-0 transition-opacity bg-gradient-to-t from-gray-800 via-gray-800 to-gray-800  duration-300   ${
          hoverState ? " opacity-80" : "opacity-0"
        }`}
      ></div>
      <div className="relative z-20 w-full flex">{children}</div>
    </div>
  );
};

export default TableRow;
