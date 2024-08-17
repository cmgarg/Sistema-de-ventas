import { articleData, depositType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";

type CreateSectorProps = {
  onChangeCreateSector: (e: boolean) => void; // Define tus props aquí
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
  onChangeCreateSector,
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
      (res: {
        content: {
          name: string;
          sectorId: string;
          products: articleData[];
        }[];
        value: true;
        message: "Se creo el sector correctamente.";
      }) => {
        if (!res.value) {
          console.log(res.message);
        } else {
          const sectors = [...res.content];
          console.log(sectors, "SECTORES A ACTUALIZAR", sectorData);
          updateSectors(sectors);
          window.api.enviarEvento("get-deposits");
          onChangeCreateSector(false);
        }
      }
    );
  }, []);
  useEffect(() => {
    console.log(sectorData);
  }, [sectorData]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center rounded-lg backdrop-brightness-50">
      <div className="w-2/6 h-3/4 rounded-lg flex flex-col bg-gradient-to-t from-blue-950 to-blue-900 border border-slate-700 ">
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
        <div className="flex space-x-2 p-2">
          <button
            onClick={() => onChangeCreateSector(false)}
            className="h-8 flex-1 text-sm font-semibold bg-red-500 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={createSector}
            className="h-8 flex-1 text-sm font-semibold bg-green-500 rounded-lg"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSector;
