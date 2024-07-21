import {
  Action,
  articleData,
  brandType,
  categoryType,
} from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";

type propsInput = {
  style: string;
  brands: brandType[];
  brandError: { message: string; type: string; active: boolean };
  dispatch: React.Dispatch<Action>;
  errorIn: string[];
  stateArticle: articleData;
  value?: string;
};

const InputBrand = ({
  style,
  dispatch,
  errorIn,
  brands,
  stateArticle,
  value,
}: propsInput) => {
  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z]*$/.test(newValue)) {
      dispatch({
        type: "SET_BRAND",
        payload: {
          label:
            newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase(),
          value: newValue.toLowerCase(),
        },
      });
    }
  };

  const compareSelectItemWithInputValue = (i: string): string => {
    const inputLength = stateArticle.brand.label.length;
    const itemValue = i;

    if (stateArticle.brand.label) {
      return itemValue.toLowerCase().slice(0, inputLength) ===
        stateArticle.brand.label.toLowerCase()
        ? itemValue
        : stateArticle.brand.label;
    } else {
      return itemValue;
    }
  };

  return (
    <Downshift
      onChange={(selection) => {
        onChangeNewValue(selection || "teta");
      }}
      inputValue={value}
      itemToString={(item) =>
        item
          ? compareSelectItemWithInputValue(item.label)
          : stateArticle.brand.label
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
        <div className="flex-1 flex flex-col">
          <label {...getLabelProps()} className="select-none">
            Marca
          </label>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input
              {...getInputProps()}
              className={`${style} ${isOpen ? "rounded-b-none" : ""} w-full ${
                errorIn.includes("BRAND")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
            />
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm"
          >
            {isOpen
              ? brands
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

export default InputBrand;
