import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/app/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../../../components/app/ui/command";
import { cn } from "../../../../../../lib/utils";
import { Button } from "../../../../../../components/app/ui/button";
import { useSelector } from "react-redux";
import { storeType } from "../../../../../../types/types";
type SelectBrandProps = {
  filtersActived: { category: string; brand: string; subCategory: string }; // Define tus props aquí
  setFiltersActived: (e: {
    category: string;
    brand: string;
    subCategory: string;
  }) => void;
};

const SelectBrand: React.FC<SelectBrandProps> = ({
  filtersActived,
  setFiltersActived,
}) => {
  const brands = useSelector((state: storeType) => state.brandState);
  const [openBrandSelect, setOpenBrandSelect] = useState(false);

  return (
    <Popover open={openBrandSelect} onOpenChange={setOpenBrandSelect}>
      <PopoverTrigger
        asChild
        className="bg-gradient-to-l from-gray-800 via-gray-800 to-gray-700 border-y-[0px] border-x-2 h-full rounded-none border-gray-600 flex hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openBrandSelect}
          className=" justify-between w-52"
        >
          {filtersActived.brand ? filtersActived.brand : "Marca"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52 p-0  border border-gray-600 bg-black "
        onMouseDown={(e) => e.stopPropagation()} // Evita que el clic cierre el menú
      >
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
                    framework.value === filtersActived.brand
                      ? "bg-yellow-400"
                      : "text-white font-semibold"
                  }  
                              `}
                  onSelect={(currentValue) => {
                    setFiltersActived({
                      ...filtersActived,
                      brand: currentValue,
                    });
                    setOpenBrandSelect(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-black",
                      filtersActived.brand === framework.value
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

export default SelectBrand;
