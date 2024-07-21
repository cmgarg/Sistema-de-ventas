import { depositType } from "@/types";
import React, { useEffect, useState } from "react";

type CreateDepositProps = {
  onChangeCreateDeposit: (e: boolean) => void; // Define tus props aquí
};

const CreateDeposit: React.FC<CreateDepositProps> = ({
  onChangeCreateDeposit,
}) => {
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
    window.api.enviarEvento("create-deposit", depositData);
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
      <div className="w-96 h-4/5 bg-slate-600 flex flex-col bg-gradient-to-t from-slate-800 rounded-lg to-red-950 border border-slate-800">
        <div className="font-bold text-3xl pl-2 w-full flex justify-center">
          <p>Creando deposito</p>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full flex-1 justify-evenly px-2">
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
          <div className="flex flex-col w-full flex-1 justify-evenly px-2">
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
        <div className="w-full flex h-7 overflow-hidden rounded-b-lg">
          <button
            className="h-full flex-1 bg-red-700"
            onClick={() => onChangeCreateDeposit(false)}
          >
            Cerrar
          </button>
          <button className="h-full flex-1 bg-cyan-700" onClick={CreateDeposit}>
            Crear
          </button>
        </div>
      </div>
      {/* Component content here */}
    </div>
  );
};

export default CreateDeposit;
