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
      } border-t bg-[#2f2f2fff] border-gray-900 justify-center text-lg items-center transition-all hover:brightness-150 cursor-pointer ${
        deploy ? "" : "h-12"
      } ${padding ? "px-2" : ""}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <div className="relative z-[5] w-full flex">{children}</div>
    </div>
  );
};

export default TableRow;
