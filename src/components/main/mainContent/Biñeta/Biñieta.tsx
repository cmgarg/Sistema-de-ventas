import React, { useState } from "react";

interface BiñetaProps {
  title: string;
  children: React.ReactNode;
}

const Biñeta: React.FC<BiñetaProps> = ({ title, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ X: 0, Y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setPosition({ X: e.clientX, Y: e.clientY });
    setShowTooltip(true);
  }

  function handleMouseLeave() {
    setShowTooltip(false);
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {showTooltip && (
        <div
          style={{ left: `${position.X - 25}px`, top: `${position.Y + 20}px` }}
          className="fixed px-2 py-1 bg-gray-700 text-white text-sm rounded-md z-50 shadow-sm shadow-black select-none"
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Biñeta;
