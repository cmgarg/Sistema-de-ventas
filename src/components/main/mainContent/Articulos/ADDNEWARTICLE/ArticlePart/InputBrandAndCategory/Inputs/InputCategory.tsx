import {
  Action,
  articleData,
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
  categorys: categoryType[];
  categoryError: { message: string; type: string; active: boolean };
  dispatch: React.Dispatch<Action>;
  stateArticle: articleData;
  errorIn: string[];

  value?: string;
};

const InputCategory = ({
  style,
  dispatch,
  categorys,
  stateArticle,
  value,
  errorIn,
}: propsInput) => {
  const [open, setOpen] = React.useState(false);

  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z]*$/.test(newValue)) {
      dispatch({
        type: "SET_CATEGORY",
        payload: {
          label:
            newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase(),
          value: newValue.toLowerCase(),
        },
      });
    }
  };

  const compareSelectItemWithInputValue = (i: string): string => {
    const inputLength = stateArticle.category.label.length;
    const itemValue = i;

    if (stateArticle.category.label) {
      return itemValue.toLowerCase().slice(0, inputLength) ===
        stateArticle.category.label.toLowerCase()
        ? itemValue
        : stateArticle.category.label;
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
          {stateArticle.category.label
            ? categorys.find(
                (framework) => framework.value === stateArticle.category.value
              )?.label
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
              {categorys.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className={`${
                    framework.value === stateArticle.category.value
                      ? "bg-yellow-400"
                      : "text-white font-semibold"
                  }  
                              `}
                  onSelect={(currentValue) => {
                    dispatch({
                      type: "SET_CATEGORY",
                      payload: isEqual(framework, stateArticle.category)
                        ? { label: "", value: "" }
                        : framework,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-black",
                      stateArticle.category.value === framework.value
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

export default InputCategory;
