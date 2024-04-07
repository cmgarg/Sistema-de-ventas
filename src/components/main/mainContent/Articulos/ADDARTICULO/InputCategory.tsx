import React, { useEffect, useState } from "react";
import AutoSuggest from "react-autosuggest";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  categorysAndBrands: object[];
};

const InputCategory = ({
  style,
  setChangeData,
  articuloData,
  categorysAndBrands,
}: propsInput) => {
  const [suggestion, setSuggestion] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [suggestionActived, setSuggestionActived] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [errorMessage, setErrorMessage] = useState({
    actived: false,
    message: "El articulo no existe",
    type: "",
  });

  const getSuggestions = (value: string) => {
    console.log(value);
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    console.log(value, "soldano");

    const brands = categorysAndBrands.filter((e) => {
      return e.typeFilter === "category";
    });
    console.log(brands);

    return inputLength === 0
      ? []
      : brands.filter((brand) => {
          return brand.value.toLowerCase().slice(0, inputLength) === inputValue;
        });
  };
  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div {...containerProps} className="w-full absolute top-full">
      {children}
    </div>
  );
  function renderSuggestion(suggestion: string, isHighlighted) {
    return (
      <div
        className={`w-full  z-50 flex justify-around ${
          !isHighlighted.isHighlighted
            ? "bg-slate-100 text-black"
            : "bg-slate-900 text-white"
        }`}
      >
        <p>{suggestion.label}</p>
      </div>
    );
  }
  const handleSuggestionSelected = (event, { suggestionValue }) => {};
  const verifExisting = (a: string) => {
    const categorys = categorysAndBrands.filter(
      (e) => e.typeFilter === "category"
    );
    const findCategory = categorys.filter(
      (e) => e.value.toLowerCase() === a.toLowerCase()
    );

    return findCategory.length > 0;
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : 0
      );
      setNewValue(suggestion[selectedIndex].label);
    }
    if (event.key === "Enter") {
      if (verifExisting(newValue)) {
        setChangeData("category", newValue);
      } else if (suggestion.length === 0) {
        setErrorMessage({
          actived: true,
          message: "No existe el Articulo",
          type: "articulo",
        });
      }
    }
  };

  useEffect(() => {
    if (suggestion.length > 0) {
      setSuggestionActived(true);
    } else {
      setSuggestionActived(false);
    }
    console.log(suggestion);
  }, [suggestion]);

  return (
    <div className="w-full h-9">
      <label htmlFor="brand">Categoria</label>
      <AutoSuggest
        suggestions={suggestion} //AGREGAR CANTIDAD FALOPERO
        onSuggestionsFetchRequested={({ value }) => {
          setSuggestion(getSuggestions(value));
        }}
        onSuggestionsClearRequested={() => setSuggestion([])}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        highlightFirstSuggestion={true}
        getSuggestionValue={(suggestion) => suggestion}
        inputProps={{
          className: `${style} rounded-lg w-full ${
            suggestionActived && "rounded-b-none"
          }`,
          placeholder: "Categoria. . . ",
          onKeyDown: handleKeyDown,
          value: newValue,
          onChange: (_, { newValue }) => setNewValue(newValue),
        }}
        onSuggestionSelected={handleSuggestionSelected}
      />
      <button
        type="button"
        className="w-10 h-9 bg-red-200"
        onClick={() => {
          verifExisting("Bebidas");
        }}
      >
        prrueba
      </button>
    </div>
  );
};

export default InputCategory;
