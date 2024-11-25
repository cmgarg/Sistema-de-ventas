import React, { useEffect, useRef, useState } from "react";
import { CgOptions } from "react-icons/cg";

type ContextMenuProps = {
  showOptions: boolean; // Define tus props aquí
  setShowOptions: (e: boolean) => void;
  optionsMenu: { label: string; onClick: () => void; icon: any }[];
  positionMenu: { x: number; y: number };
  onRightClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  optionsMenu,
  positionMenu,
  setShowOptions,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const onClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", onClickOut);
    return () => {
      document.removeEventListener("mousedown", onClickOut);
    };
  }, []);
  return (
    <div
      ref={menuRef}
      className="w-52 bg-gradient-to-tl  from-gray-700 via-gray-700 to-gray-600 p-2 font-semibold relative justify-start text-gray-200 border-gray-600 rounded-md border flex flex-col z-50 overflow-hidden text-sm"
      style={{
        position: "absolute",
        left: `${positionMenu.x}px`,
        top: `${positionMenu.y}px`,
      }}
    >
      {optionsMenu.map((option) => (
        <button
          className="p-2 items-center hover:bg-gray-700 hover:border-yellow-500 border-l-4 border-transparent hover:text-yellow-500 text-start flex justify-between"
          onClick={option.onClick}
        >
          <p>{option.label}</p>
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
