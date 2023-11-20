// Tooltip.jsx
import React, { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(false)}
    >
      {children}
      {show && (
        <div className=" flex flex-row absolute left-11 top-0 z-50">
          <div className="flex items-center justify-items-end">
            <div className=" w-2 m-0 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                class="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </div>
          </div>
          <div className=" p-1 bg-black text-white text-sm" style={{ whiteSpace: 'nowrap' }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
