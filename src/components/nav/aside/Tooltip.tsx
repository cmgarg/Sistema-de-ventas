import React, { useState, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ top: rect.top, left: rect.right });
    setShow(true);
  };

  const handleMouseLeave = () => setShow(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      {children}
      {show &&
        ReactDOM.createPortal(
          <div
            className="fixed z-50 flex items-center"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translateY(-50%)",
            }}
          >
            <div className="w-2 m-0 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                className="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </div>
            <div className="p-1 bg-black text-white text-sm rounded-lg" style={{ whiteSpace: "nowrap" }}>
              {content}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
