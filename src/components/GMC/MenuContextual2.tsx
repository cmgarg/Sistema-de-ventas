import React, { ReactNode, useEffect, useRef, useState } from "react";

interface MenuContextual2Props {
  children?: ReactNode;
  title: ReactNode;
}

const MenuContextual2: React.FC<MenuContextual2Props> = ({
  children,
  title,
}) => {
  const menuRef = useRef();
  const menuRefFlex = useRef();
  const [menuVisible, setMenuContextualVisible] = useState(false);

  const [menuPosition, setMenuPosition] = useState("left-0 top-full");

  function updateMenuPosition() {
    if (menuRefFlex.current) {
      const menuRect = menuRefFlex.current.getBoundingClientRect();
      const rightEdgeDistance = window.innerWidth - menuRect.right;
      const bottomEdgeDistance = window.innerHeight - menuRect.bottom;
      console.log(rightEdgeDistance, bottomEdgeDistance + "AGUANTE");

      if (rightEdgeDistance < 200) {
        setMenuPosition("right-0 top-full");
        console.log("SE CUMPLE ESTO OSEAAAA");
      }
      if (bottomEdgeDistance < 200) {
        setMenuPosition("bottom-0 top-full");
        console.log("SE CUMPLE ESTO");
      }
    }
  }

  function toggleMenuVisible(bool: boolean) {
    setMenuContextualVisible(bool);
  }
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenuVisible(false);
      }
    }
    console.log(children);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    updateMenuPosition();
  }, [menuVisible]);

  return (
    <div className="flex flex-col select-none text-sm text-white" ref={menuRef}>
      <div
        onClick={() => {
          toggleMenuVisible(menuVisible ? false : true);
        }}
        className="w-full"
      >
        {title}
      </div>
      {menuVisible && (
        <div
          ref={menuRefFlex}
          className={`flex flex-col w-52 absolute ${menuPosition} bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg pb-3 pt-1 pl-1`}
        >
          {menuVisible && children}
        </div>
      )}
    </div>
  );
};

export default MenuContextual2;
