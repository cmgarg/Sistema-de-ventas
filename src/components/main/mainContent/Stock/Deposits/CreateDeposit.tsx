import { depositType } from "../../../../../../types/types";
import React, { useEffect, useState } from "react";
import ButtonR from "../../buttons/ButtonR";

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
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 backdrop-brightness-50">
      <div className="w-80 h-60 flex flex-col bg-[#2f2f2fff] rounded-lg p-2">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full flex-1 justify-center relative">
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
              className="rounded-lg  h-10 w-full bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] outline-none pl-2"
            />
          </div>
          <div className="flex flex-col w-full flex-1 justify-center relative">
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
              className="rounded-lg h-10 w-full bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] outline-none pl-2"
            />
          </div>
        </div>
        <div className="w-full flex justify-end space-x-2 rounded-b-lg">
          <ButtonR
            width="w-24"
            height="h-7"
            bgColor="bg-gradient-to-l from-gray-800 via-gray-700 shadow-[0_2px_5px_rgba(0,0,0,0.50)] to-gray-500 text-sm"
            title="Cerrar"
            onClick={() => onChangeCreateDeposit(false)}
          ></ButtonR>
          <ButtonR
            width="w-28"
            height="h-7"
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 shadow-[0_2px_5px_rgba(0,0,0,0.50)] to-yellow-500 text-sm"
            title="Crear"
            onClick={CreateDeposit}
          ></ButtonR>
        </div>
      </div>
      {/* Component content here */}
    </div>
  );
};

export default CreateDeposit;
