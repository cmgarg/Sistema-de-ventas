import React from "react";

export default function Maximize({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
    >
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          stroke={color}
          fill="none"
          stroke-width="2"
        />
      </svg>
    </svg>
  );
}
