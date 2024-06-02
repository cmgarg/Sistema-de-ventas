import React from "react";

interface UsuarioSecSVGProps {
  width?: string;
  height?: string;
  fill?: string;
}

export default function UsuarioSecSVG({
  width = "20",
  height = "20",
  fill = "currentColor",
}: UsuarioSecSVGProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 16 16"
      >
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
      </svg>
    </div>
  );
}
