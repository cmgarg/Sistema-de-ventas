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
  const [menuVisible, setMenuContextualVisible] = useState(false);

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

  return (
    <div className="flex flex-col relative space-y-5 select-none" ref={menuRef}>
      <div
        onClick={() => {
          toggleMenuVisible(menuVisible ? false : true);
        }}
        className="w-full"
      >
        {title}
      </div>
      {menuVisible && (
        <div className="flex flex-col w-52 absolute top-1 bg-gray-700 z-50  shadow-md shadow-black rounded-b-lg pb-3 pt-1">
          {menuVisible && children}
        </div>
      )}
    </div>
  );
};

export default MenuContextual2;
