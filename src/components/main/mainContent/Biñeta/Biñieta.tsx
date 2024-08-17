import React, { useState } from "react";
interface BiñetaProps {
  title: string;
  children: React.ReactNode;
  bg?: string;
}

const Biñeta: React.FC<BiñetaProps> = ({ title, children, bg }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ X: 0, Y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setPosition({ X: e.clientX, Y: e.clientY });
    setShowTooltip(true);
  }
  function handelMouseLeave() {
    setShowTooltip(false);
  }
  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handelMouseLeave}>
      {showTooltip && (
        <div
          style={{ left: `${position.X - 25}px`, top: `${position.Y - -35}px` }}
          className={`fixed px-2 py-1 ${
            bg ? bg : "bg-gray-700"
          } text-white text-sm rounded-md z-50 shadow-sm shadow-black select-none`}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Biñeta;
