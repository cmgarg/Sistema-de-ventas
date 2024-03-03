import React from "react";

interface UsuarioSVGProps {
  width?: string;
  height?: string;
  fill?: string;
}

export default function UsuarioSVG({
  width = "25",
  height = "25",
  fill = "currentColor",
}: UsuarioSVGProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        className="bi bi-shuffle"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    </div>
  );
}
