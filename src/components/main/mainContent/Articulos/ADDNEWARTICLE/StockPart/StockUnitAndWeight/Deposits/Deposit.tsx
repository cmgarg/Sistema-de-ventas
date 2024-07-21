import {
  articleData,
  depositType,
  Action,
} from "../../../../../../../../../types/types";
import SelectM from "../../../../../Select/Select";
import React, { useEffect, useState } from "react";
import CreateDeposit from "./CreateDeposit";
import CreateSector from "./CreateSector";
import { TrashIcon } from "@radix-ui/react-icons";

import { IoAdd, IoAddCircle } from "react-icons/io5";
import { BiTrash, BiX } from "react-icons/bi";
import Biñeta from "../../../../../Biñeta/Biñieta";

type DepositsProps = {
  id: string;
  unLoadDeposit: (id: string) => void;
  deposits: depositType[];
  dispatchDeposit: React.Dispatch<Action>;
  depositObject?: {
    idObject: string;
    name: string;
    depositId: string;
    sector: {
      name: string;
      sectorId: string;
    };
  };
  updateDeposit: (deposit: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
    };
  }) => void;
  // Define tus props aquí
};

const Deposit: React.FC<DepositsProps> = ({
  deposits,
  id,
  updateDeposit,
  depositObject,
  unLoadDeposit,
}) => {
  const [depositSelect, setDepositSelect] = useState<depositType>({
    name: "",
    address: "",
    sectors: [],
  });
  const [optionsSelect, setOptionsSelect] = useState<
    { label: string; value: string }[]
  >([]);
  const [optionsSectors, setOptionsSectors] = useState<
    { label: string; value: string }[]
  >([]);
  const [sectorForm, setSectorForm] = useState(false);
  const [sectorSelect, setSectorSelect] = useState<{
    name: string;
    sectorId: string;
    products: articleData[];
  }>({ name: "", sectorId: "", products: [] });
  const onChangeSelection = (e: string) => {
    console.log(e);
    const [newDepositSelect] = deposits.filter((d) => {
      return d.name.toLowerCase() === e.toLowerCase();
    });
    if (newDepositSelect) {
      setDepositSelect(newDepositSelect);
      console.log("ESTE ES MI INDEX al actualizar deposito", id);
      setSectorSelect({
        name: "",
        sectorId: "",
        products: [],
      });
      updateDeposit({
        idObject: id,
        name: newDepositSelect.name || "",
        depositId: newDepositSelect._id || "",
        address: depositSelect.address || "",
        sector: {
          name: "",
          sectorId: "",
        },
      });
    }
    console.log(
      newDepositSelect,
      "DEPOSITO SELECCIONADO",
      "SEUPUESTO SELECCI0ONADO",
      e
    );
    if (newDepositSelect) {
      console.log("ACA NO LLEGA");
      if (newDepositSelect.sectors) {
        loadSectors(newDepositSelect.sectors);
      }
      // depositChange(index, newDepositSelect, "deposit");
    }
  };

  const onChangeSelectionSector = (e: string) => {
    const [sector] = depositSelect?.sectors.filter((sec) => {
      return `${sec.name}` === e;
    });

    if (sector) {
      setSectorSelect(sector);
      updateDeposit({
        idObject: id,
        name: depositSelect.name || "",
        depositId: depositSelect._id || "",
        address: depositSelect.address || "",
        sector: {
          name: sector.name || "",
          sectorId: sector.sectorId || "",
        },
      });
      if (sector.name) {
        // depositChange(index, sector, "sector", depositSelect);
      }
    }
  };
  const onChangeCreateSector = (e: boolean) => {
    setSectorForm(e);
  };
  const loadDeposits = () => {
    const options = deposits.map((deposit) => ({
      label: deposit.name,
      value: deposit._id ? deposit._id : deposit.name,
    }));
    setOptionsSelect(options);
  };
  const loadSectors = (
    sectors: {
      name: string;
      sectorId: string;
      products: articleData[];
    }[]
  ) => {
    let newSectors: { label: string; value: string }[] = [];
    sectors.map((s) => {
      newSectors.push({ label: `${s.name}`, value: `${s.sectorId}` });
    });
    setOptionsSectors(newSectors);
  };
  const updateSectors = (
    e: {
      name: string;
      sectorId: string;
      products: articleData[];
    }[]
  ) => {
    let newSectors = [...e];
    let newSectorsOptions: { label: string; value: string }[] = [];
    newSectors.map((s) => {
      newSectorsOptions.push({ label: `${s.name}`, value: s.sectorId });
    });
    console.log("SE EJECUTA EL ACTUALIZADOR DE SECTORES", e);

    setOptionsSectors(newSectorsOptions);
  };
  useEffect(() => {
    console.log("ESTE ES MI INDEX", id);

    loadDeposits();

    if (depositObject) {
      const deposit = deposits.find(
        (deposit) => deposit._id === depositObject.depositId
      );
      if (deposit) {
        setDepositSelect(deposit);
        setSectorSelect({ ...depositObject.sector, products: [] });
        loadSectors(deposit.sectors);
      }
    }
  }, []);

  return (
    <div
      key={id}
      className="mt-5 flex flex-col relative right-2 w-2/6 justify-center items-center"
    >
      <div className="flex flex-col w-10/12 relative">
        <div className="flex flex-col w-full justify-start">
          <div className="flex w-full flex-col bg-gradient-to-t to-slate-800 from-slate-900 rounded-t-lg">
            <div className="pl-2 border-t border-slate-800 text-base rounded-t-lg flex justify-between">
              <p>| Deposito</p>
              <button
                onClick={() => unLoadDeposit(id)}
                className="flex rounded-tr-lg h-7 items-center"
              >
                <Biñeta title="Borrar">
                  <BiX size={20} className="text-rose-500 " />
                </Biñeta>
              </button>
            </div>
            <SelectM
              onChangeSelection={onChangeSelection}
              options={optionsSelect}
              placeholder=""
              slice={-1}
              value={depositSelect ? depositSelect.name : ""}
              todos={false}
              className="border-none h-7 w-full rounded-tl-lg rounded-tr-lg rounded-b-none text-sm font-bold"
            />
          </div>
          <div className="flex flex-col w-full rounded-b-lg bg-gradient-to-t to-slate-900 from-cyan-800">
            <div className="pl-2 border-t-4 text-base border-cyan-700 rounded-t-lg flex justify-between">
              <p>| Sector</p>

              <button
                className="text-sm text-cyan-500 rounded-br-lg h-7"
                onClick={() => onChangeCreateSector(true)}
              >
                <Biñeta title="Crear sector">
                  <IoAdd size={20} />
                </Biñeta>
              </button>
            </div>
            <div className="flex w-full border-t border-slate-800">
              <SelectM
                onChangeSelection={onChangeSelectionSector}
                options={optionsSectors}
                placeholder={`${sectorSelect.name || "pene"}`}
                slice={-1}
                value={sectorSelect ? `${sectorSelect.name}` : "....."}
                todos={false}
                className="h-7 flex-1 border-none rounded-b-lg rounded-t-none text-sm font-medium"
              />
            </div>
          </div>
        </div>
        {sectorForm ? (
          <CreateSector
            updateSectors={updateSectors}
            depositSelect={depositSelect}
            onChangeCreateDeposit={onChangeCreateSector}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Deposit;
