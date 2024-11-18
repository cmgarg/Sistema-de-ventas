import Downshift from "downshift";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { clientData } from "../../../../../../types/types";
import { cn } from "../../../../../../lib/utils";
import { Button } from "../../../../../../components/app/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../../../components/app/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/app/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { isEqual } from "lodash";
interface MenuClientsFormProps {
  style: string;
  clients: clientData[];
  setBuyer: (c: clientData) => void;
  buyer: clientData;
  value?: string;
}

const MenuClientsForm: React.FC<MenuClientsFormProps> = ({
  clients,
  style,
  setBuyer,
  buyer,
  value,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<clientData>();

  return (
    clients.length > 0 && (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className="bg-gradient-to-l from-gray-800 via-gray-800 to-gray-700 border border-gray-600 flex hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between w-96"
          >
            {optionSelected ? optionSelected.name : "Selecciona comprador"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0  border border-gray-600 bg-black ">
          <Command className="bg-gray-800 text-white">
            <CommandInput placeholder="Buscando marca..." />
            <CommandList className="bg-slate-950 ">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {clients.map((framework) => (
                  <CommandItem
                    key={framework._id}
                    value={framework.name}
                    className={`${
                      optionSelected && framework._id === optionSelected._id
                        ? "bg-yellow-400"
                        : "text-white font-semibold"
                    }  
                              `}
                    onSelect={(currentValue) => {
                      setBuyer(framework);
                      setOpen(false);
                      setOptionSelected(framework);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-black",
                        optionSelected && optionSelected._id === framework._id
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
    )
  );
};

export default MenuClientsForm;
