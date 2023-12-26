import React, { useState } from "react";
interface BiñetaProps {
  title: string;
  children: React.ReactNode;
}

const Biñeta: React.FC<BiñetaProps> = ({ title, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ X: 0, Y: 0 });

  function handleMouseMove(e: MouseEvent) {
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
          style={{ left: `${position.X - 25}px`, top: `${position.Y + 20}px` }}
          className="fixed px-2 py-1 bg-gray-700 text-white text-sm rounded-md z-50 shadow-sm shadow-black"
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Biñeta;
