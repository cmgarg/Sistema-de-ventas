import React, { useRef, useState, useEffect } from "react";
import { articleData } from "../../../../../../types/types";
import VirtualizedTable from "../../../tablaMain/VirtualizedTable";

type SelectArticleProps = {
  articles: articleData[];
  errors: string[];
  setArticleSelect: (e: articleData) => void;
};

const ArticleRestock: React.FC<SelectArticleProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null); // Estado para el item focuseado
  const buttonRef = useRef<HTMLDivElement>(null);

  const changeOpen = () => {
    setIsOpen(!isOpen);
  };

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true); // Reabre el menú cada vez que se escribe
  };

  // Función para normalizar texto y eliminar tildes, pero manteniendo espacios
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Filtrar artículos basados en la búsqueda exacta, incluyendo espacios
  const filteredArticles = props.articles.filter((article) => {
    const searchNormalized = normalizeText(search);
    const articleNameNormalized = normalizeText(article.article.name);
    const articleCodeNormalized = normalizeText(article.code);
    const articleBrandNormalized = normalizeText(article.brand.label);

    return (
      articleNameNormalized.includes(searchNormalized) ||
      articleCodeNormalized.includes(searchNormalized) ||
      articleBrandNormalized.includes(searchNormalized)
    );
  });

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`w-full h-full z-50 relative ${
        props.errors.includes("ARTICLE_ERROR") ? "border border-red-500" : ""
      }`}
    >
      <button onClick={changeOpen} className="w-full h-full">
        <input
          type="text"
          value={search}
          onChange={changeSearch}
          placeholder="Selecciona un artículo"
          className="h-full w-full bg-[#707070ff] pl-2 outline-none border border-gray-600 rounded-md hover:brightness-125 shadow-[0_2px_5px_rgba(0,0,0,0.50)]"
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 rounded-lg w-full max-h-52 bg-black bg-opacity-35 h-52 overflow-auto z-50 flex flex-col rounded-b-lg">
          <VirtualizedTable
            className="rounded-b-lg overflow-hidden w-full relative z-50"
            data={filteredArticles} // Pasamos los artículos filtrados
            renderHeader={() => (
              <div className="p-2 absolute z-50 opacity-0 bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 font-bold text-center flex"></div>
            )}
            renderRow={(article, index) => (
              <div
                className={`h-10 flex text-xs justify-evenly relative z-50 items-center cursor-pointer px-2 ${
                  hoveredItemIndex === index ? "bg-yellow-500" : "bg-black" // Aplica estilos si está focuseado
                }`}
                key={article.code + article.dateToRegister}
                onClick={() => {
                  props.setArticleSelect(article);
                  setIsOpen(false);
                  setSearch(article.article.name); // Coloca el nombre seleccionado en el campo de búsqueda
                }}
                onMouseEnter={() => setHoveredItemIndex(index)} // Actualiza el item focuseado
                onMouseLeave={() => setHoveredItemIndex(null)} // Quita el focus cuando el mouse sale
              >
                <div className="flex h-full flex-1 items-center justify-start">
                  <p>{article.article.name}</p>
                </div>
                <div className="flex h-full flex-1 items-center justify-center">
                  <p>{article.code}</p>
                </div>
                <div className="flex h-full flex-1 items-center justify-end">
                  <p>{article.brand.label}</p>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleRestock;
