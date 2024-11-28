import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectBrand from "./SelectBrand";
import SelectCategory from "./SelectCategory,";
import SelectSubCategory from "./SelectSubCategory";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
type FiltersProps = {
  filtersActived: { category: string; brand: string; subCategory: string }; // Define tus props aquí
  setFiltersActived: (e: {
    category: string;
    brand: string;
    subCategory: string;
  }) => void;
};

const Filters: React.FC<FiltersProps> = ({
  filtersActived,
  setFiltersActived,
}) => {
  const divRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (divRef.current && divRef.current.contains(event.target as Node)) {
      } else {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={divRef} className="w-full h-10 flex items-center px-2">
      <div
        className={`${
          menuOpen ? "w-auto" : "w-24"
        } h-full bg-black flex items-center hover:bg-blue-500`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-24 bg-black border border-gray-600 h-full flex items-center cursor-pointer justify-around"
        >
          <p>Filtros</p>
          {menuOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>
        {menuOpen ? (
          <SelectBrand
            filtersActived={filtersActived}
            setFiltersActived={setFiltersActived}
          />
        ) : null}
        {menuOpen ? (
          <SelectCategory
            filtersActived={filtersActived}
            setFiltersActived={setFiltersActived}
          />
        ) : null}
        {menuOpen ? (
          <SelectSubCategory
            filtersActived={filtersActived}
            setFiltersActived={setFiltersActived}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Filters;
