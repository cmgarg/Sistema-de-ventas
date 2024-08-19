import React, { useEffect, useState } from "react";
import {
  Action,
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import SelectM from "../../../../../Select/Select";
import { capitalizeFirstLetter } from "../../../../../../../../usefulFunctions";
import CreateSector from "./CreateSector";

type EditDepositEstablishedProps = {
  deposits: depositType[];
  depositToEdit: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
    };
  };
  dispatchDeposit: React.Dispatch<Action>;
  alternEditDepositEstablished: (e: {
    active: boolean;
    depositToEdit: {
      idObject: string;
      name: string;
      depositId: string;
      address: string;
      sector: {
        name: string;
        sectorId: string;
      };
    };
  }) => void;
  onChangeCreateDeposit: (e: boolean) => void;
};

const EditDepositEstablished: React.FC<EditDepositEstablishedProps> = ({
  deposits,
  dispatchDeposit,
  alternEditDepositEstablished,
  onChangeCreateDeposit,
  depositToEdit,
}) => {
  //GENERADOR DE ID

  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  //ESTADO DEL FORMULARIO PARA CREAR SECTOR
  const [sectorCreateForm, setSectorCreateForm] = useState(false);
  //DEPOSIT TO ESTABLISH
  const [depositToEstablish, setDepositToEstablish] = useState({
    idObject: "",
    name: "",
    depositId: "",
    address: "",
    sector: {
      name: "",
      sectorId: "",
    },
  });
  //DEPOSITO ESTADOS

  const [depositSelect, setDepositSelect] = useState<depositType>({
    name: "",
    address: "",
    sectors: [],
  });
  const [depositsToSelect, setDepositsToSelect] = useState<
    { value: string; label: string }[]
  >([]);
  //ESTADOS SECTORES
  const [sectors, setSectors] = useState<
    {
      name: string;
      sectorId: string;
      products: articleData[];
    }[]
  >([]);
  const [sectorsToSelect, setSectorsToSelect] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [sectorSelect, setSectorSelect] = useState<{
    name: string;
    sectorId: string;
  }>({ name: "", sectorId: "" });
  //FUNCIONES DEPOSITOS
  //obteniendo depositos de la base de datos
  //al seleccionar un deposito
  const selectionDeposit = (value: string) => {
    const depositSelect = deposits.find(
      (deposit) => deposit._id === value || deposit.name === value
    );
    if (depositSelect) {
      setDepositSelect(depositSelect);
      setSectors([...depositSelect.sectors]);
      setDepositToEstablish({
        ...depositToEstablish,
        name: depositSelect.name,
        depositId: depositSelect._id ? depositSelect._id : "",
        address: depositSelect.address,
        sector: {
          name: "",
          sectorId: "",
        },
      });
    }
  };
  //al seleccionar un sector
  const selectionSector = (value: string) => {
    const sectorSelect = sectors.find((sector) => sector.sectorId === value);
    if (sectorSelect) {
      setDepositToEstablish({
        ...depositToEstablish,
        sector: sectorSelect,
      });
    }
  };
  const loadDeposits = () => {
    const depositsToLoad = deposits.map((deposit) => {
      return {
        value: deposit._id ? deposit._id : deposit.name.toLowerCase(),
        label: capitalizeFirstLetter(deposit.name),
      };
    });
    if (depositsToLoad) {
      setDepositsToSelect(depositsToLoad);
    }
  };
  const loadSectors = () => {
    const sectorsToLoad = sectors.map((sector) => {
      return {
        value: sector.sectorId ? sector.sectorId : sector.name.toLowerCase(),
        label: capitalizeFirstLetter(sector.name),
      };
    });
    setSectorsToSelect(sectorsToLoad);
  };
  //ACTUALIZAR SECOTORES
  const updateSectors = (
    e: {
      name: string;
      sectorId: string;
      products: articleData[];
    }[]
  ) => {
    return setSectors([...e]);
  };
  //ESTABLECER DEPOSITO,
  const establishNewDeposit = () => {
    console.log("VAMOS A GUARDAR", depositToEstablish);
    dispatchDeposit({ type: "EDIT_DEPOSIT", payload: depositToEstablish });

    alternEditDepositEstablished({
      active: false,
      depositToEdit: depositToEdit,
    });
  };
  //ALTERNAR FORMULARIO PARA CREAR SECTORES
  const alternSectorCreateForm = (e: boolean) => {
    setSectorCreateForm(e);
  };
  useEffect(() => {
    setDepositToEstablish(depositToEdit);
    setDepositSelect({
      name: depositToEdit.name,
      address: depositToEdit.address,
      sectors: deposits.filter((s) => s._id === depositToEdit.depositId)[0]
        .sectors,
    });
    setSectors(
      deposits.filter((s) => s._id === depositToEdit.depositId)[0].sectors
    );
  }, []);

  useEffect(() => {
    console.log("CARGANDO DEPOSITOS");
    loadDeposits();
  }, [deposits]);
  useEffect(() => {
    console.log("CARGANDO SECTORES");

    loadSectors();
  }, [sectors]);
  useEffect(() => {
    console.log(depositToEstablish, "DEPOSITO A ESTABLECER");
  }, [depositToEstablish]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-brightness-50 z-40">
      {sectorCreateForm && (
        <CreateSector
          depositSelect={depositSelect}
          onChangeCreateSector={alternSectorCreateForm}
          updateSectors={updateSectors}
        />
      )}
      <div className="flex flex-col w-2/6 h-3/4 bg-slate-900 rounded-lg border border-slate-700 relative ">
        <div className="flex-1 flex flex-col justify-evenly p-2 relative">
          <div className="absolute top-2 right-2 space-x-2 flex">
            <div
              className="text-sm bg-amber-600 rounded-lg p-1 font-bold select-none cursor-pointer"
              onClick={() => onChangeCreateDeposit(true)}
            >
              <p>Crear deposito</p>
            </div>
          </div>
          <div>
            <p>Deposito</p>
          </div>
          <SelectM
            todos={false}
            options={depositsToSelect}
            onChangeSelection={selectionDeposit}
            className="bg-blue-950 font-bold text-xl"
            placeholder="Deposito"
            slice={-1}
            value={depositSelect.name}
          />
        </div>
        <div className={`flex-1 flex flex-col justify-evenly relative p-2 `}>
          <div className="absolute top-2 right-2 space-x-2 flex">
            <div
              onClick={() => alternSectorCreateForm(true)}
              className="text-sm bg-blue-600 rounded-lg p-1 font-bold select-none cursor-pointer"
            >
              <p>Crear Sector</p>
            </div>
          </div>
          <div className="pl-2">
            <p>Sector</p>
          </div>
          <SelectM
            todos={false}
            options={sectorsToSelect}
            onChangeSelection={selectionSector}
            className="bg-blue-950 font-bold text-xl"
            placeholder="Sector"
            slice={-1}
            value={""}
          />
        </div>
        <div className="w-full flex h-12 space-x-2 rounded-b-lg p-2">
          <button
            onClick={() =>
              alternEditDepositEstablished({
                active: false,
                depositToEdit: depositToEdit,
              })
            }
            className="bg-red-600 w-1/2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={establishNewDeposit}
            className="bg-green-600 w-1/2 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepositEstablished;