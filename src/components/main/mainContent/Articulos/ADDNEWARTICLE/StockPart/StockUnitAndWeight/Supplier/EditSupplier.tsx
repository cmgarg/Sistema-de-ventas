import { supplierType } from "@/types";
import React, { useEffect, useState } from "react";
import { TbTruck } from "react-icons/tb";

interface EditSupplierProps {
  supplierToEdit: supplierType;
  editSupplierForm: (supplierData: boolean) => void;
}

const EditSupplier: React.FC<EditSupplierProps> = ({
  supplierToEdit,
  editSupplierForm,
}) => {
  const [supplierData, setSupplierData] = useState<supplierType>({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    _id: "",
  });

  const setChangeData = (e: string, v: any) => {
    const includes = ["name", "phoneNumber", "email", "address"];

    if (includes.includes(e)) {
      console.log("QUE PASA LOCO");
      switch (e) {
        case "name":
          setSupplierData({
            ...supplierData,
            name: v,
          });
          break;
        case "phoneNumber":
          setSupplierData({
            ...supplierData,
            phoneNumber: v,
          });
          break;
        case "email":
          setSupplierData({
            ...supplierData,
            email: v,
          });
          break;
        case "address":
          setSupplierData({
            ...supplierData,
            address: v,
          });
          break;

        default:
          break;
      }
    }
  };

  const updateSupplier = () => {
    console.log("QUEEE", supplierData);
    window.api.enviarEvento("update-supplier", supplierData);
  };

  useEffect(() => {
    setSupplierData(supplierToEdit);
    window.api.recibirEvento("response-update-supplier", (res) => {
      if (res.value) {
        console.log("Proveedor actualizado");
        window.api.enviarEvento("get-suppliers");
        editSupplierForm(false);
      } else {
        console.log("ERROR");
      }
    });
  }, []);

  return (
    <div className="absolute z-50 bg-slate-950">
      <div className="flex p-2">
        <div className="font-bold flex-1 text-3xl text-slate-200">
          <p>EDITANDO PROVEEDOR</p>
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
            editSupplierForm(false);
          }}
          className="h-full bg-rose-700 rounded-bl-lg flex-1 hover:bg-rose-600"
        >
          Cancelar
        </button>

        <button
          onClick={updateSupplier}
          className="h-full bg-cyan-700 rounded-br-lg flex-1 hover:bg-cyan-600"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default EditSupplier;
