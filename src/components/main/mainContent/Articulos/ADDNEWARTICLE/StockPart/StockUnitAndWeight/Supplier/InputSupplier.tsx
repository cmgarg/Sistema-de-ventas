import {
  Action,
  articleData,
  brandType,
  categoryType,
  supplierType,
} from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import { cn } from "../../../../../../../../../lib/utils";
import { Button } from "../../../../../../../../../components/app/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../../../../../../components/app/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../../../../components/app/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { isEqual } from "lodash";

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
  stateArticle,
  suppliers,
  value,
}: propsInput) => {
  const [open, setOpen] = React.useState(false);

  const onChangeNewValue = (sup: supplierType) => {
    dispatch({ type: "SET_SUPPLIER", payload: sup });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-gradient-to-l from-gray-800 via-gray-800 to-gray-700 border border-gray-600 flex hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between w-52"
        >
          {stateArticle.supplier.name
            ? suppliers.find(
                (framework) => framework.name === stateArticle.supplier.name
              )?.name
            : "Selecciona categoria"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0  border border-gray-600 bg-black ">
        <Command className="bg-gray-800 text-white">
          <CommandInput placeholder="Buscando categoria..." />
          <CommandList className="bg-slate-950 ">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {suppliers.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  className={`${
                    framework.name === stateArticle.supplier.name
                      ? "bg-yellow-400"
                      : "text-white font-semibold"
                  }  
                            `}
                  onSelect={(currentValue) => {
                    onChangeNewValue(framework);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-black",
                      stateArticle.supplier.name === framework.name
                        ? "opacity-100 text-white"
                        : "opacity-0"
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputSupplier;
