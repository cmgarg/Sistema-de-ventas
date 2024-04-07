import React, { useEffect, useState } from "react";
import AutoSuggest from "react-autosuggest";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  categorysAndBrands: object[];
  brandError: { message: string; type: string; active: boolean };
};

const InputBrand = ({
  style,
  setChangeData,
  articuloData,
  categorysAndBrands,
  brandError,
}: propsInput) => {
  const [suggestion, setSuggestion] = useState([]);
  const [newValue, setNewValue] = useState<string>("");
  const [suggestionActived, setSuggestionActived] = useState(false);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log(value, "soldano");

    const brands = categorysAndBrands.filter((e) => {
      return e.typeFilter === "brand";
    });
    console.log(brands);

    const brandsString = brands.map((e) => e.value);

    return inputLength === 0
      ? []
      : brandsString.filter((brand) => {
          return brand.toLowerCase().slice(0, inputLength) === inputValue;
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
          isHighlighted.isHighlighted
            ? "bg-slate-100 text-black"
            : "bg-slate-900 text-white"
        }`}
      >
        <p>{suggestion}</p>
      </div>
    );
  }
  const handleSuggestionSelected = (event, { suggestionValue }) => {
    if (event.target.key !== "Enter") {
      setChangeData("brand", suggestionValue);
    }
  };

  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z]*$/.test(newValue)) {
      setNewValue(newValue);
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
  useEffect(() => {
    setChangeData("brand", newValue);
  }, [newValue]);

  return (
    <div className="w-full relative">
      <label
        htmlFor="brand"
        className="flex items-end space-x-2 justify-between pr-2"
      >
        <p>Marca </p>
        {brandError.active && brandError.type === "brand" && (
          <p className="text-red-200 text-xs">{brandError.message}</p>
        )}
      </label>

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
          } ${
            brandError.active &&
            (brandError.type === "brand" || "all") &&
            "border border-red-200"
          }`,
          name: "brand",
          placeholder: "Marca. . . ",
          value: newValue,
          onChange: (_, { newValue }) => {
            onChangeNewValue(newValue);
          },
        }}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};

export default InputBrand;
