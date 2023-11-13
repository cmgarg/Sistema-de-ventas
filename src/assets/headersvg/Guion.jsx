import React from "react";

export default function Guion({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <rect x="4" y="7" width="10" height="1" fill={color} />
        </g>
      </g>
    </svg>
  );
}
