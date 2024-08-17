import { supplierType } from "../../../../../../../../../types/types";
import React, { useEffect } from "react";
import { TbTruck } from "react-icons/tb";

type CreateSupplierProps = {
  supplierData: supplierType;
  setChangeData: (e: string, v: string) => void;
  setSupplierCreate: (e: boolean) => void;
};

const CreateSupplier: React.FC<CreateSupplierProps> = ({
  supplierData,
  setChangeData,
  setSupplierCreate,
}) => {
  const saveSupplier = () => {
    window.api.enviarEvento("save-supplier", supplierData);
  };

  useEffect(() => {
    window.api.recibirEvento("response-save-supplier", (r) => {
      if (r.value) {
        setSupplierCreate(false);
      } else {
        console.log("ERORR PUTO");
      }
    });
  }, []);

  return (
    <div className="absolute z-50 bg-slate-950">
      <div className="flex p-2">
        <div className="font-bold flex-1 text-3xl text-slate-200">
          <p>CREANDO PROVEEDOR</p>
        </div>
        <TbTruck size={40} className="text-teal-700" />
      </div>
      <div className="p-2">
        <div className="flex w-full space-x-5 ">
          <div className="flex flex-1 flex-col">
            <label htmlFor="nameSupp">Nombre</label>
            <input
              type="text"
              name="nameSupp"
              className="h-14 bg-slate-900 rounded-lg p-2 outline-none"
              value={supplierData.name}
              onChange={(e) => setChangeData("name", e.target.value)}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="phoneNumber">Telefono</label>
            <input
              type="text"
              name="phoneNumber"
              className="h-14 bg-slate-900 rounded-lg p-2 outline-none"
              value={supplierData.phoneNumber}
              onChange={(e) => setChangeData("phoneNumber", e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full space-x-5">
          <div className="flex flex-1 flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="h-14 bg-slate-900 rounded-lg p-2 outline-none"
              value={supplierData.email}
              onChange={(e) => setChangeData("email", e.target.value)}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="direccion">Direccion</label>
            <input
              type="text"
              name="direccion"
              className="h-14 bg-slate-900 rounded-lg p-2 outline-none"
              value={supplierData.address}
              onChange={(e) => setChangeData("address", e.target.value)}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex w-full font-bold h-10">
        <button
          onClick={() => {
            setSupplierCreate(false);
          }}
          className="h-full bg-rose-700 rounded-bl-lg flex-1 hover:bg-rose-600"
        >
          Cancelar
        </button>

        <button
          onClick={saveSupplier}
          className="h-full bg-cyan-700 rounded-br-lg flex-1 hover:bg-cyan-600"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateSupplier;
