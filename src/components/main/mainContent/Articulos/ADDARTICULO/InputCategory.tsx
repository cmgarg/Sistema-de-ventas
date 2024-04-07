import React, { useEffect, useState } from "react";
import AutoSuggest from "react-autosuggest";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  categorysAndBrands: object[];
  categoryError: { message: string; type: string; active: boolean };
};

type categoryType = {
  label: string;
  typeFilter: string;
  value: string;
  _id: string;
};

const InputCategory = ({
  style,
  setChangeData,
  articuloData,
  categorysAndBrands,
  categoryError,
}: propsInput) => {
  const [suggestion, setSuggestion] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [suggestionActived, setSuggestionActived] = useState(false);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const brands = categorysAndBrands.filter((e) => {
      return e.typeFilter === "category";
    });
    console.log(brands);

    const brandsString = brands.map((e) => e.label);

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
  function renderSuggestion(suggestion: categoryType, isHighlighted) {
    console.log(isHighlighted, "LOCOLON");
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
      setChangeData("category", suggestionValue);
    }
  };
  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z]*$/.test(newValue)) {
      setNewValue(newValue);
    }
  };
  useEffect(() => {
    setChangeData("category", newValue);
  }, [newValue]);
  return (
    <div className="w-full relative">
      <label
        htmlFor="category"
        className="flex space-x-2 items-end justify-between pr-2"
      >
        <p>Categoria</p>
        {categoryError.active && categoryError.type === "category" && (
          <p className="text-red-200 text-xs">{categoryError.message}</p>
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
            categoryError.active &&
            (categoryError.type === "category" || "all") &&
            "border border-red-200"
          }`,
          name: "category",
          placeholder: "Categoria. . . ",
          value: newValue,
          onChange: (_, { newValue }) => onChangeNewValue(newValue),
        }}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};

export default InputCategory;
