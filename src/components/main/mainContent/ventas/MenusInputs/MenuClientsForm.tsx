import Downshift from "downshift";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { clientData } from "../../../../../../types/types";

interface MenuClientsFormProps {
  style: string;
  clients: clientData[];
  setClientData: (c: clientData) => void;
  value?: string;
}

const MenuClientsForm: React.FC<MenuClientsFormProps> = ({
  clients,
  style,
  setClientData,
  value,
}) => {
  const [newValue, setNewValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z\s]*$/.test(newValue)) {
      setNewValue(newValue);
    }
  };

  const searchInClients = (i: string) => {
    const toSearch = [...clients];
    const inputLength = i.length;

    const result = toSearch.filter((object) => {
      return Object.values(object).some((val) => {
        if (typeof val === "string") {
          return val
            .toLowerCase()
            .slice(0, inputLength)
            .includes(i.toLowerCase());
        } else if (typeof val === "object") {
          return Object.values(val).some((u: any) => {
            if (typeof u === "string") {
              return u
                .toLowerCase()
                .slice(0, inputLength)
                .includes(i.toLowerCase());
            }
          });
        }
      });
    });

    if (result.length > 0 && result.length < 2) {
      const clientData: clientData = {
        name: result[0].name,
        email: result[0].email,
        address: result[0].address,
        phone: result[0].phone,
        _id: result[0]._id,
        DNI: result[0].DNI,
        birthdate: result[0].birthdate,
        shopping: result[0].shopping,
      };
      setClientData(clientData);
      onChangeNewValue(clientData.name);
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
    console.log(clients);
  }, [clients]);

  return (
    <Downshift
      onSelect={(selectedItem) => {
        onChangeNewValue(selectedItem);
        searchInClients(selectedItem.name);
        setIsOpen(false);
      }}
      onInputValueChange={(e, stateAndHelpers) => {
        setIsOpen(true);
        onChangeNewValue(e);
      }}
      inputValue={value || newValue}
      itemToString={(item) =>
        item ? compareSelectItemWithInputValue(item.name) : newValue
      }
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        inputValue,
        openMenu,
        highlightedIndex,
        selectedItem,
        getLabelProps,
        getRootProps,
      }) => (
        <div className="relative flex flex-row border-b-2 border-slate-700">
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
            className="w-full h-12"
          >
            <input
              {...getInputProps()}
              className={`${style} h-12 w-full bg-teal-900 text-2xl rounded-t-md`}
              placeholder="Cliente..."
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  searchInClients(newValue);
                }
              }}
            />
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm"
          >
            {isOpen
              ? clients
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
                        },
                      })}
                      className={`${
                        highlightedIndex === index
                          ? "bg-teal-800"
                          : "bg-teal-950"
                      } ${
                        highlightedIndex === index
                          ? "text-slate-50"
                          : "text-slate-200"
                      }${
                        highlightedIndex === index
                          ? "bg-red-200"
                          : "font-normal"
                      } flex h-12 text-lg px-1 items-center`}
                    >
                      <div className="flex-1 flex justify-start">
                        <p>{item.name}</p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <p>{item.address}</p>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <p>{item.DNI}</p>
                      </div>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default MenuClientsForm;
