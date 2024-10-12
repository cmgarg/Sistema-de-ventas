import {
  Action,
  articleData,
  brandType,
  categoryType,
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
  const [open, setOpen] = React.useState(false);
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
          {stateArticle.brand.label
            ? brands.find(
                (framework) => framework.value === stateArticle.brand.value
              )?.label
            : "Selecciona marca"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0  border border-gray-600 bg-black ">
        <Command className="bg-gray-800 text-white">
          <CommandInput placeholder="Buscando marca..." />
          <CommandList className="bg-slate-950 ">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {brands.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className={`${
                    framework.value === stateArticle.brand.value
                      ? "bg-yellow-400"
                      : "text-white font-semibold"
                  }  
                              `}
                  onSelect={(currentValue) => {
                    dispatch({
                      type: "SET_BRAND",
                      payload: isEqual(framework, stateArticle.brand)
                        ? { label: "", value: "" }
                        : framework,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-black",
                      stateArticle.brand.value === framework.value
                        ? "opacity-100 text-white"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputBrand;
