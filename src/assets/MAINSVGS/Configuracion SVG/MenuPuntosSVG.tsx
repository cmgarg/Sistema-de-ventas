import React from "react";

interface MenuPuntosSVGProps {
  width?: string;
  height?: string;
  fill?: string;
}

export default function MenuPuntosSVG({
  width = "25",
  height = "25",
  fill = "currentColor",
}: MenuPuntosSVGProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 16 16"
      >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
    </div>
  );
}
