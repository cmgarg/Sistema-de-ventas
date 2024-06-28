import {
  brandType,
  categoryType,
  supplierType,
} from "../../../../../../../../types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { TbTruckDelivery } from "react-icons/tb";

type propsInput = {
  style: string;
  setChangeData: (e: string, value: string) => void;
  articuloData: object;
  suppliers: supplierType[];
  setSupplierForm: (e: boolean) => void;
  value?: string;
};

const InputSupplier = ({
  style,
  setChangeData,
  setSupplierForm,
  suppliers,
  articuloData,
  value,
}: propsInput) => {
  const [newValue, setNewValue] = useState<string>("");

  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z]*$/.test(newValue)) {
      setNewValue(newValue);
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
  useEffect(() => {
    const supp = suppliers.map((e: supplierType) => {
      if (e.name.toLowerCase() === newValue.toLowerCase()) {
        return e;
      }
    });
    if (supp) {
      setChangeData("supplier", supp[0]);
    }
  }, [newValue]);

  return (
    <Downshift
      onChange={(selection) => {
        onChangeNewValue(selection || "teta");
      }}
      inputValue={value || newValue}
      itemToString={(item) =>
        item ? compareSelectItemWithInputValue(item.name) : newValue
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
            className="w-full absolute top-full rounded-b-sm"
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
                        key: item.name,
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
                      {item.name}
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
