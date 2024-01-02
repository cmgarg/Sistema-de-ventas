import React from "react";

interface PuntoSVGProps {
  width?: string;
  height?: string;
  fill?: string;
}

export default function PuntoSVG({
  width = "10",
  height = "10",
  fill = "currentColor",
}: PuntoSVGProps) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        fill={fill}
        className="bi bi-circle-fill"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="8" />
      </svg>
    </div>
  );
}
