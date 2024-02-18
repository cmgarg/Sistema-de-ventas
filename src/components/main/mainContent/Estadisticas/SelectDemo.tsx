import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../app/ui/select";

type params = {
  setForWhat: (e: string) => void;
};

export function SelectDemo({ setForWhat }: params) {
  return (
    <div className="absolute right-0 z-50 text-slate-50">
      <Select
        onValueChange={(e) => {
          setForWhat(e);
        }}
      >
        <SelectTrigger className="w-[180px] bg-slate-950">
          <SelectValue placeholder="Ventas" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 text-white border border-gray-600">
          <SelectGroup>
            <SelectLabel className="font-bold">Por</SelectLabel>
            <SelectItem value="dia">Dia</SelectItem>
            <SelectItem value="mes">Mes</SelectItem>
            <SelectItem value="año">Año</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
