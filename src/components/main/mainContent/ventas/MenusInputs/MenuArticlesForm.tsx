import React, { useEffect, useRef, useState } from "react";

interface MenuArticlesForm {
  style: string;
  setChangeData: (data: string, value: any) => void;
}

const MenuArticlesForm: React.FC<MenuArticlesForm> = ({
  style,
  setChangeData,
}) => {
  const [menuActived, setMenuActived] = useState(true);
  const [articlesFound, setclientesEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState({
    nombreArticulo: "",
    idArticle: "",
  });

  const [articulos, setArticulos] = useState([]);

  function getArticles() {
    window.api.enviarEvento("obtener-articulos");
  }

  const inputRef = useRef<HTMLInputElement>(null);

  function onChangeInput(value: string) {
    setInputValue({ nombreArticulo: value, idArticle: "" });
  }

  function listaArticulos() {
    console.log("PUIITO", articlesFound);
    if (articlesFound.length === 0) {
      return null; // O renderiza un mensaje de "sin resultados" en lugar de null
    }
    return (
      <div className="absolute w-full bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg flex flex-col top-full">
        {articlesFound.map((article) => (
          <button
            onClick={() => {
              setInputValue({
                nombreArticulo: article.articulo,
                idArticle: article._id,
              });
              console.log("que onda");
              setMenuActived(false);
            }}
            className="hover:bg-gray-800"
          >
            {article.articulo}
          </button>
        ))}
      </div>
    );
  }
  function searchArticles(busca: string) {
    console.log("me ejecuto locococococ", articlesFound);
    const arrayFounds = articulos.filter((article) => {
      console.log(article, "acac");

      return article.articulo
        .toLowerCase()
        .includes(busca !== "" ? busca.toLowerCase() : "|||");
    });
    setclientesEncontrados(arrayFounds);
  }

  useEffect(() => {
    setChangeData("articulo", inputValue);
    console.log(inputValue);
    console.log(articulos);
  }, [inputValue]);
  useEffect(() => {
    getArticles();
    window.api.recibirEvento("respuesta-obtener-articulos", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  return (
    <div
      onClick={() => {
        setMenuActived(true);
      }}
      onBlur={(e) => {
        setTimeout(() => setMenuActived(false), 200);
      }}
    >
      <label htmlFor="comprador" className="text-slate-600">
        Articulo
      </label>
      <div className="flex flex-row relative">
        <input
          ref={inputRef}
          className={style}
          type="text"
          name="comprador"
          value={inputValue.nombreArticulo}
          onChange={(e) => {
            searchArticles(e.target.value);
            onChangeInput(e.target.value);
          }}
        />
        {articlesFound.length > 0 && menuActived && listaArticulos()}
      </div>
    </div>
  );
};

export default MenuArticlesForm;
