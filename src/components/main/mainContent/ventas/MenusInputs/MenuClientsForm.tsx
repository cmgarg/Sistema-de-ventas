import React, { useEffect, useRef, useState } from "react";
import AutoSuggest from "react-autosuggest";

interface MenuClientsForm {
  style: string;
  clientes: any[];
  setChangeData: (data: string, value: any) => void;
  setEditClient: (e: boolean) => void;
}

const MenuClientsForm: React.FC<MenuClientsForm> = ({
  style,
  clientes,
  setChangeData,
  setEditClient,
}) => {
  const [inputValue, setInputValue] = useState({ nombre: "", idClient: "" });
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestionActived, setSuggestionActived] = useState(false);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : clientes.filter(
          (cliente) =>
            cliente.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const handleKeyDown = (event) => {
    console.log(event.key);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : 0
      );
    }
    if (event.key === "Enter") {
      setChangeData("comprador", inputValue);
      setEditClient(false);
    }
  };
  const handleSuggestionSelected = (event, { suggestionValue }) => {
    setInputValue({
      nombre: suggestionValue,
      idClient: suggestion[selectedIndex]._id,
    });
  };
  function renderSuggestion(
    suggestion: { nombre: string; idClient: string },
    isHighlighted
  ) {
    console.log(isHighlighted.isHighlighted);

    return (
      <div
        className={`w-full bg-slate-900 right-0 z-50 ${
          isHighlighted.isHighlighted ? "bg-slate-100 text-black" : ""
        }`}
      >
        {suggestion.nombre}
      </div>
    );
  }

  useEffect(() => {
    if (suggestion.length > 0) {
      setSuggestionActived(true);
      console.log("BUENAS NOCHES");
      console.log(suggestion); ////////////////HACER LO MISMO CON LOS ARTICULOS
    } else {
      setSuggestionActived(false);
      console.log("BUENAS PUTAS");
    }
  }, [suggestion]);

  return (
    <div>
      <label htmlFor="comprador">Comprador</label>
      <AutoSuggest
        suggestions={suggestion}
        onSuggestionsFetchRequested={({ value }) => {
          setSuggestion(getSuggestions(value));
        }}
        onSuggestionsClearRequested={() => setSuggestion([])}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion={true}
        getSuggestionValue={(suggestion) => suggestion.nombre}
        inputProps={{
          placeholder: "Comprador",
          value: inputValue.nombre,
          className: `${style} w-full rounded-lg ${
            (suggestionActived && "rounded-b-none") || ""
          }`,
          onChange: (_, { newValue }) =>
            setInputValue({ ...inputValue, nombre: newValue }),
          onKeyDown: handleKeyDown,
        }}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};

export default MenuClientsForm;
