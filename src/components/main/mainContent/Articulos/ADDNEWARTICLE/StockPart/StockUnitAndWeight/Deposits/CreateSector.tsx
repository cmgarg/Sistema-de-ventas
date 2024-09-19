import {
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import ButtonR from "../../../../../buttons/ButtonR";

type CreateSectorProps = {
  onChangeCreateSector: (e: boolean) => void; // Define tus props aquí
  depositSelect: depositType;
  updateSectors: (
    e: {
      name: string;
      sectorId: string;
      products: {
        article: articleData;
        amount: {
          value: number;
          saveCount: string;
        };
      }[];
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
    products: {
      article: articleData;
      amount: {
        value: number;
        saveCount: string;
      };
    }[];
  }>({
    name: "",
    sectorId: "",
    products: [],
  });
  const [errorShow, setErrorShow] = useState<{
    active: boolean;
    errors: string[];
  }>({
    active: false,
    errors: [],
  });
  const createSector = () => {
    const errors = [];
    if (!sectorData.name) {
      errors.push("SECTOR-NAME");
    }
    if (errors.length > 0) {
      setErrorShow({
        active: true,
        errors: errors,
      });
    } else {
      window.api.enviarEvento("create-sector-in-deposit", {
        deposit_id: depositSelect._id,
        sector: sectorData,
      });
    }
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
          products: {
            article: articleData;
            amount: {
              value: number;
              saveCount: string;
            };
          }[];
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
    if (errorShow.active) {
      setTimeout(() => {
        setErrorShow({
          active: false,
          errors: [],
        });
      }, 3000);
    }
  }, [errorShow]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center rounded-lg backdrop-brightness-50">
      <div className="w-64 p-2 space-y-2 rounded-lg flex flex-col bg-[#2f2f2fff] border border-slate-700 ">
        <div className="flex-1">
          <div className="flex w-full justify-between">
            <label htmlFor="sector" className="font-semibold">
              Sector
            </label>
            <div className="pr-2 text-red-400 text-xs font-thin">
              {errorShow.active ? (
                <p>
                  {errorShow.errors.includes("SECTOR-NAME")
                    ? "Nombre no establecido."
                    : null}
                </p>
              ) : null}
            </div>
          </div>
          <input
            type="text"
            name="sector"
            onChange={(e) => setChangeData("name", e.target.value)}
            value={sectorData.name}
            className="h-10 w-full bg-[#707070ff] rounded-lg px-2 outline-none  border border-slate-600"
          />
        </div>
        <div className="flex space-x-2 justify-end">
          <ButtonR
            onClick={() => onChangeCreateSector(false)}
            width="w-24"
            height="h-7"
            bgColor="bg-gradient-to-l from-gray-800 via-gray-700 shadow-[0_2px_5px_rgba(0,0,0,0.50)] to-gray-500 text-sm"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            onClick={createSector}
            width="w-24"
            height="h-7"
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 shadow-[0_2px_5px_rgba(0,0,0,0.50)] to-yellow-500 text-sm"
            title="Crear"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default CreateSector;
