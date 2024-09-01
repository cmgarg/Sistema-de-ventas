import { supplierType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import { TbTruck } from "react-icons/tb";
import ButtonR from "../../../../../buttons/ButtonR";

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
  const [saveSecure, setSaveSecure] = useState(false);

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
    <div className="absolute z-50 flex justify-center items-center backdrop-brightness-50 right-0 top-0 bottom-0 left-0">
      <div className="w-1/2 bg-[#2f2f2fff] flex flex-col rounded-lg p-2 relative">
        {saveSecure ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-950 rounded-lg z-50 flex justify-center items-center">
            <div className="text-red flex justify-center flex-col flex-1 items-center h-full p-2">
              <div className="flex flex-1 justify-center items-center text-xl">
                <p>¿Seguro que quieres guardar?</p>
              </div>
              <div className="w-full flex justify-end space-x-2">
                <ButtonR
                  onClick={() => {
                    setSaveSecure(false);
                  }}
                  bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
                  height="h-10"
                  width="w-28"
                  title="Cancelar"
                ></ButtonR>
                <ButtonR
                  onClick={updateSupplier}
                  title="Guardar"
                  bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500"
                  height="h-10"
                ></ButtonR>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex p-2">
          <div className="font-bold flex-1 text-3xl">
            <p>EDITANDO PROVEEDOR</p>
          </div>
          <TbTruck size={30} className="text-yellow-500" />
        </div>
        <div className="p-2 text-sm w-full flex space-x-2">
          <div className="flex flex-col w-64 space-y-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="nameSupp">Nombre</label>
              <input
                type="text"
                name="nameSupp"
                className="h-10 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg p-2 outline-none"
                value={supplierData.name}
                onChange={(e) => setChangeData("name", e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="phoneNumber">Telefono</label>
              <input
                type="text"
                name="phoneNumber"
                className="h-10 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg p-2 outline-none"
                value={supplierData.phoneNumber}
                onChange={(e) => setChangeData("phoneNumber", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-64 space-y-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="h-10 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg p-2 outline-none"
                value={supplierData.email}
                onChange={(e) => setChangeData("email", e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="direccion">Direccion</label>
              <input
                type="text"
                name="direccion"
                className="h-10 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg p-2 outline-none"
                value={supplierData.address}
                onChange={(e) => setChangeData("address", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex w-full font-bold justify-end space-x-2 pt-5">
          <ButtonR
            onClick={() => {
              editSupplierForm(false);
            }}
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-xs"
            height="h-7"
            width="w-28"
            title="Cancelar"
          ></ButtonR>

          <ButtonR
            onClick={() => setSaveSecure(true)}
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-xs"
            height="h-7"
            width="w-32"
            title="Guardar"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default EditSupplier;
