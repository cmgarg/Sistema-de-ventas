import { depositType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";

type CreateDepositProps = {
  onChangeCreateDeposit: (e: boolean) => void; // Define tus props aquí
};

const CreateDeposit: React.FC<CreateDepositProps> = ({
  onChangeCreateDeposit,
}) => {
  const [errorShow, setErrorShow] = useState<string[]>([]);
  const [depositData, setDepositData] = useState<depositType>({
    name: "",
    address: "",
    sectors: [],
  });

  const setChangeData = (f: string, v: string) => {
    const includes = ["name", "address"];

    if (includes.includes(f)) {
      switch (f) {
        case "name":
          setDepositData({
            ...depositData,
            name: v,
          });
          break;
        case "address":
          setDepositData({
            ...depositData,
            address: v,
          });
          break;
        default:
          break;
      }
    }
  };

  const CreateDeposit = () => {
    let errors = [];
    if (!depositData.name) {
      errors.push("DEPOSITNAME");
    }
    if (!depositData.address) {
      errors.push("DEPOSITADDRESS");
    }
    if (errors.length > 0) {
      setErrorShow(errors);
    } else {
      window.api.enviarEvento("create-deposit", depositData);
    }
  };

  useEffect(() => {
    window.api.recibirEvento("response-create-deposit", (res) => {
      if (res.value) {
        console.log("Deposito creado");
        window.api.enviarEvento("get-deposits");
        onChangeCreateDeposit(false);
      } else {
        console.log("ERROR");
      }
    });
  }, []);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="w-2/6 h-3/4 bg-slate-600 flex flex-col bg-gradient-to-t from-blue-950 to-blue-900 rounded-lg border border-slate-800">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full flex-1 justify-evenly px-2 relative">
            <div className="absolute right-3 top-3 h-5 text-sm text-red-300 font-bold">
              {errorShow.includes("DEPOSITNAME") && "Introduzca el nombre"}
            </div>
            <label htmlFor="nameDeposit" className="font-semibold">
              Nombre deposito
            </label>
            <input
              type="text"
              name="nameDeposit"
              value={depositData.name}
              onChange={(e) => setChangeData("name", e.target.value)}
              className="h-12   rounded-lg bg-slate-900 border border-slate-800 outline-none pl-2"
            />
          </div>
          <div className="flex flex-col w-full flex-1 justify-evenly px-2 relative">
            <div className="absolute right-3 top-3 h-5 text-sm text-red-300 font-bold">
              {errorShow.includes("DEPOSITADDRESS") &&
                "Introduzca la direccion."}
            </div>

            <label htmlFor="nameDeposit" className="font-semibold">
              Direccion
            </label>
            <input
              type="text"
              name="nameDeposit"
              value={depositData.address}
              onChange={(e) => setChangeData("address", e.target.value)}
              className="h-12   rounded-lg bg-slate-900 border border-slate-800 outline-none pl-2"
            />
          </div>
        </div>
        <div className="w-full flex p-2 h-12 space-x-2 overflow-hidden rounded-b-lg">
          <button
            className="flex-1 h-8 rounded-lg bg-red-600"
            onClick={() => onChangeCreateDeposit(false)}
          >
            Cerrar
          </button>
          <button
            className="h-8 rounded-lg flex-1 bg-green-600"
            onClick={CreateDeposit}
          >
            Crear
          </button>
        </div>
      </div>
      {/* Component content here */}
    </div>
  );
};

export default CreateDeposit;
