import React, { useEffect, useRef, useState } from "react";
import AutoSuggest from "react-autosuggest";

interface MenuArticlesForm {
  style: string;
  setChangeData: (data: string, value: any) => void;
  addProduct: (product: object) => void;
  amount: string;
}

const MenuArticlesForm: React.FC<MenuArticlesForm> = ({
  style,
  setChangeData,
}) => {
  const [inputValue, setInputValue] = useState({
    nombreArticulo: "",
    idArticle: "",
    costoArticle: "",
    amount: "",
  });
  const [articulos, setArticulos] = useState([]);

  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestionActived, setSuggestionActived] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    actived: false,
    message: "El articulo no existe",
    type: "",
  });

  const verifExisting = (a: object) => {
    let filterArticles = articulos.filter((article) => {
      return article.articulo.toLowerCase() === a.nombreArticulo.toLowerCase();
    });
    let [articleInfo] = filterArticles;
    let object = {};
    if (filterArticles.length > 0) {
      object = {
        nombreArticulo: articleInfo.articulo,
        idArticle: articleInfo._id,
        costoArticle: articleInfo.costo,
        amount: a.amount,
      };

      setInputValue(object);

      return true;
    }
    return false;
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : articulos.filter(
          (articulo) =>
            articulo.articulo.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const onChangeAmount = (e: string) => {
    let verifNumber = /^[0-9]*$/.test(e);

    console.log(e, "AKA FIJATE", verifNumber);

    if (verifNumber) {
      setInputValue({ ...inputValue, amount: e });
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : 0
      );
      setInputValue({
        ...inputValue,
        nombreArticulo: suggestion[selectedIndex].articulo,
        idArticle: suggestion[selectedIndex]._id,
        costoArticle: suggestion[selectedIndex].costo,
        amount: "",
      });
    }
    if (event.key === "Enter") {
      if (verifExisting(inputValue)) {
        if (parseInt(inputValue.amount) > 0) {
          let sumaCantidad =
            parseInt(inputValue.costoArticle) * parseInt(inputValue.amount);

          setChangeData("articulo", {
            ...inputValue,
            costoArticle: sumaCantidad,
          });
        } else {
          setErrorMessage({
            actived: true,
            message: "Cantidad no especificada",
            type: "cantidad",
          });
        }
      } else if (suggestion.length === 0) {
        setErrorMessage({
          actived: true,
          message: "No existe el Articulo",
          type: "articulo",
        });
      }
    }
  };

  const handleSuggestionSelected = (event, { suggestionValue }) => {
    if (event.target.key !== "Enter") {
      setInputValue({ ...inputValue, nombreArticulo: suggestionValue });
    }
  };
  function renderSuggestion(
    suggestion: { nombre: string; idClient: string },
    isHighlighted
  ) {
    console.log(isHighlighted.isHighlighted);

    return (
      <div
        className={`w-full  z-50 flex justify-around ${
          !isHighlighted.isHighlighted
            ? "bg-slate-100 text-black"
            : "bg-slate-900 text-white"
        }`}
      >
        <p>{suggestion.articulo}</p>
        <p>{suggestion.costo}</p>
      </div>
    );
  }

  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div {...containerProps} className="w-full absolute top-full">
      {children}
    </div>
  );

  const getArticles = () => {
    window.api.enviarEvento("get-articles");
  };

  useEffect(() => {
    if (suggestion.length > 0) {
      setSuggestionActived(true);
    } else {
      setSuggestionActived(false);
    }
  }, [suggestion]);

  useEffect(() => {
    getArticles();
    window.api.recibirEvento("response-get-articles", (e) => {
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage({
        ...errorMessage,
        actived: false,
      });
    }, 3000);
    console.log("ILLOJUAN PETE");
  }, [inputValue]);

  return (
    <div className="relative flex items-end">
      <div className="w-full">
        <div className="flex justify-between items-end">
          <label htmlFor="comprador">Articulo</label>
          {errorMessage.actived && (
            <p className="text-red-200 text-sm">{errorMessage.message}</p>
          )}
        </div>
        <AutoSuggest
          suggestions={suggestion} //AGREGAR CANTIDAD FALOPERO
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestion(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => setSuggestion([])}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          highlightFirstSuggestion={true}
          getSuggestionValue={(suggestion) => suggestion.articulo}
          inputProps={{
            className: `${style} rounded-l-lg w-full ${
              errorMessage.actived &&
              errorMessage.type === "articulo" &&
              "border border-red-200"
            } ${(suggestionActived && "rounded-b-none") || ""}`,
            placeholder: "Articulo. . . ",
            value: inputValue.nombreArticulo,
            onChange: (_, { newValue }) =>
              setInputValue({ ...inputValue, nombreArticulo: newValue }),
            onKeyDown: handleKeyDown,
          }}
          onSuggestionSelected={handleSuggestionSelected}
        />
      </div>
      <div className="h-9 w-20 border-l border-l-gray-600 right-10">
        <input
          type="text"
          name="amount"
          value={inputValue.amount}
          onChange={(e) => {
            onChangeAmount(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className={`w-20 appearance-none text-xl pl-2 h-full rounded-r-lg outline-none text-gray-500 bg-slate-700 ${
            errorMessage.type === "cantidad" &&
            errorMessage.actived &&
            "border border-red-200"
          }`}
        />
      </div>
    </div>
  );
};

export default MenuArticlesForm;
