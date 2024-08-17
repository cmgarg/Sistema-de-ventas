import {
  Action,
  articleData,
  brandType,
  categoryType,
  supplierType,
} from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { TbTruckDelivery } from "react-icons/tb";

type propsInput = {
  style: string;
  dispatch: React.Dispatch<Action>;
  inputValueSupplierInput: string;
  suppliers: supplierType[];
  stateArticle: articleData;
  setSupplierForm: (e: boolean) => void;
  setInputValueSupplierInput: (e: string) => void;
  errorIn: string[];
  value?: string;
};

const InputSupplier = ({
  style,
  dispatch,
  setSupplierForm,
  inputValueSupplierInput,
  setInputValueSupplierInput,
  suppliers,
  value,
}: propsInput) => {
  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z0-9]*$/.test(newValue)) {
      setInputValueSupplierInput(newValue);
      dispatch({ type: "SET_SUPPLIER", payload: newValue.toLowerCase() });
      console.log("ENVIANDO A DISPATCH", newValue);
    }
  };

  const compareSelectItemWithInputValue = (i: string): string => {
    const inputLength = inputValueSupplierInput.length;
    const itemValue = i;

    if (inputValueSupplierInput) {
      return itemValue.toLowerCase().slice(0, inputLength) ===
        inputValueSupplierInput.toLowerCase()
        ? itemValue
        : inputValueSupplierInput;
    } else {
      return itemValue;
    }
  };

  return (
    <Downshift
      onChange={(selection) => {
        onChangeNewValue(selection || "teta");
        console.log("AJAM", selection);
      }}
      inputValue={inputValueSupplierInput}
      itemToString={(item) =>
        item
          ? compareSelectItemWithInputValue(item.name)
          : inputValueSupplierInput
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
        <div className="flex-1 flex flex-col relative">
          <div className="flex space-x-5 w-full justify-between">
            <label {...getLabelProps()} className="select-none">
              Proveedor
            </label>
            <button
              onClick={() => setSupplierForm(true)}
              className="flex items-center space-x-2 bg-cyan-700 rounded-lg px-2 mb-1"
            >
              <p className="text-sm font-bold">PROVEEDORES</p>
              <TbTruckDelivery size={20} />
            </button>
          </div>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input
              {...getInputProps()}
              className={`${style} ${isOpen ? "rounded-b-none" : ""} w-full`}
            />
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm z-50"
          >
            {isOpen
              ? suppliers
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item._id,
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
                      } flex px-2 text-xl`}
                    >
                      <p className="flex-1 text-left">{item.name}</p>
                      <p className="flex-1 text-right">{item.phoneNumber}</p>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default InputSupplier;
