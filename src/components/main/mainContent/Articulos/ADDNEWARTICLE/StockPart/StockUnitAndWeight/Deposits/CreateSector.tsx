import { articleData, depositType } from "@/types";
import { Value } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";

type CreateSectorProps = {
  onChangeCreateDeposit: (e: boolean) => void; // Define tus props aquí
  depositSelect: depositType;
  updateSectors: (
    e: {
      name: string;
      sectorId: string;
      products: articleData[];
    }[]
  ) => void;
};

const CreateSector: React.FC<CreateSectorProps> = ({
  depositSelect,
  updateSectors,
  onChangeCreateDeposit,
}) => {
  const [sectorData, setSectorData] = useState<{
    name: string;
    sectorId: string;
    products: articleData[];
  }>({
    name: "",
    sectorId: "",
    products: [],
  });

  const createSector = () => {
    window.api.enviarEvento("create-sector-in-deposit", {
      deposit_id: depositSelect._id,
      sector: sectorData,
    });
  };

  const setChangeData = (f: string, v: string) => {
    const includes = ["name"];

    if (includes.includes(f)) {
      switch (f) {
        case "name":
          setSectorData({
            ...sectorData,
            name: v,
          });
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    window.api.recibirEvento(
      "response-create-sector-in-deposit",
      (res: any) => {
        if (res.value === false) {
          console.log(res.message);
        } else {
          const sectors = [...depositSelect.sectors, { ...res }];
          console.log(sectors, "SECTORES A ACTUALIZAR", sectorData);
          updateSectors(sectors);
          onChangeCreateDeposit(false);
        }
      }
    );
  }, []);
  useEffect(() => {
    console.log(sectorData);
  }, [sectorData]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center rounded-lg backdrop-blur-sm">
      <div className="w-full h-full rounded-lg flex flex-col bg-gradient-to-t to-slate-900 from-cyan-800 border border-slate-700">
        <div className="flex-1 p-2">
          <label htmlFor="sector" className="font-semibold">
            Sector
          </label>
          <input
            type="text"
            name="sector"
            onChange={(e) => setChangeData("name", e.target.value)}
            value={sectorData.name}
            className="h-10 w-full bg-slate-800 rounded-lg px-2 border border-slate-600"
          />
        </div>
        <button
          onClick={createSector}
          className="h-5 w-full text-sm font-semibold bg-cyan-600 rounded-b-lg"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateSector;
