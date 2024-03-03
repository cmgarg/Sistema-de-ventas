import React, { useEffect, useState } from "react";
import AutoSuggest from "react-autosuggest";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  categorysAndBrands: object[];
};

const InputBrand = ({
  style,
  setChangeData,
  articuloData,
  categorysAndBrands,
}: propsInput) => {
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionActived, setSuggestionActived] = useState(false);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log(value, "soldano");

    const brands = categorysAndBrands.filter((e) => {
      return e.typeFilter === "brand";
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
  const handleSuggestionSelected = (event, { suggestionValue }) => {
    if (event.target.key !== "Enter") {
      setChangeData("brand", newValue);
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
      <label htmlFor="brand">Marca</label>
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
          placeholder: "Marca. . . ",
          value: articuloData.brand,
          onChange: (_, { newValue }) => setChangeData("brand", newValue),
        }}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};

export default InputBrand;
