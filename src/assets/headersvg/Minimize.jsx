import React from "react";

export default function Minimize({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
    >
      <rect
        x="5"
        y="2"
        width="9"
        height="9"
        fill="none"
        stroke={"#fff"}
        strokeWidth={0.9}
      />
      <rect
        x="1"
        y="6"
        width="9"
        height="9"
        fill={color}
        stroke={"#fff"}
        strokeWidth={0.9}
      />
    </svg>
  );
}
