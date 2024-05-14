import { categoryType } from "../../../../../../types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  categorys: categoryType[];
  categoryError: { message: string; type: string; active: boolean };
  value?: string;
};

const InputCategory = ({
  style,
  setChangeData,
  articuloData,
  categorys,
  categoryError,
  value,
}: propsInput) => {
  const [suggestion, setSuggestion] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [suggestionActived, setSuggestionActived] = useState(false);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    console.log(categorys, "///////////");

    const categorysString = categorys.map((e) => e.label);

    return inputLength === 0
      ? []
      : categorysString.filter((category) => {
          return category.toLowerCase().slice(0, inputLength) === inputValue;
        });
  };
  const renderSuggestionsContainer = ({ containerProps, children }: any) => (
    <div {...containerProps} className="w-full absolute top-full">
      {children}
    </div>
  );
  function renderSuggestion(suggestion: string, isHighlighted: any) {
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
  const handleSuggestionSelected = (
    event: any,
    { suggestionValue }: { suggestionValue: string }
  ) => {
    if (event.target.key !== "Enter") {
      setChangeData("category", suggestionValue);
    }
  };
  const compareSelectItemWithInputValue = (i: string): string => {
    const inputLength = newValue.length;
    const itemValue = i;

    if (newValue) {
      return itemValue.toLowerCase().slice(0, inputLength) ===
        newValue.toLowerCase()
        ? itemValue
        : newValue;
    } else {
      return itemValue;
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
    <Downshift
      onChange={(selection) => {
        onChangeNewValue(selection || "teta");
      }}
      inputValue={value || newValue}
      itemToString={(item) =>
        item ? compareSelectItemWithInputValue(item.label) : newValue
      }
      onInputValueChange={(e, stateAndHelpers) => {
        onChangeNewValue(e);
      }}
      onSelect={(selectedItem) => {
        onChangeNewValue(selectedItem || "teta");
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getLabelProps,
        getRootProps,
      }) => (
        <div className="w-full flex flex-col">
          <label {...getLabelProps()}>Categoria</label>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input
              {...getInputProps()}
              className={`${style} ${isOpen ? "rounded-b-none" : ""} 'w-full'`}
            />
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm"
          >
            {isOpen
              ? categorys
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.label,
                        index,
                        item,
                        style: {
                          border: selectedItem === item ? "2px blue" : "normal",
                          paddingLeft: "0.250rem",
                        },
                      })}
                      className={`${
                        highlightedIndex === index
                          ? "bg-teal-900"
                          : "bg-teal-950"
                      } ${
                        highlightedIndex === index
                          ? "text-slate-50"
                          : "text-slate-200"
                      }${
                        highlightedIndex === index
                          ? "bg-red-200"
                          : "font-normal"
                      }`}
                    >
                      {item.label}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default InputCategory;
