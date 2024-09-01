import { supplierType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import { TbTruck } from "react-icons/tb";
import ButtonR from "../../../../../buttons/ButtonR";

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
  const [errorShow, setErrorShow] = useState<{
    type: string[];
    message: string;
    active: boolean;
  }>({
    type: [],
    message: "",
    active: false,
  });
  const saveSupplier = () => {
    const error = [];
    if (!supplierData.name) {
      error.push("SUPPLIER_NAME");
    }
    if (!supplierData.address) {
      error.push("SUPPLIER_ADDRESS");
    }
    if (!supplierData.email) {
      error.push("SUPPLIER_EMAIL");
    }
    if (!supplierData.phoneNumber) {
      error.push("SUPPLIER_PHONENUMBER");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplierData.email)) {
      error.push("SUPPLIER_EMAIL_INVALID");
    }
    if (error.length < 1) {
      window.api.enviarEvento("save-supplier", supplierData);

      setChangeData("reset", "");
    } else {
      setErrorShow({
        type: error,
        message: "Error al guardar el proveedor",
        active: true,
      });
    }
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

  useEffect(() => {
    if (errorShow.active) {
      setTimeout(
        () =>
          setErrorShow({
            type: [],
            message: "",
            active: false,
          }),
        3000
      );
    }
  }, [errorShow]);

  const inputStyle =
    "h-10 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg p-2 outline-none focus:bg-[#505050ff]";
  return (
    <div className="absolute z-50 flex justify-center items-center backdrop-brightness-50 right-0 top-0 bottom-0 left-0">
      <div className="w-1/2 bg-[#2f2f2fff] flex flex-col rounded-lg p-2 relative">
        <div className="flex p-2">
          <div className="font-bold flex-1 text-3xl">
            <p>CREANDO PROVEEDOR</p>
          </div>
          <TbTruck size={40} className="text-yellow-700" />
        </div>
        <div className="h-5 pl-2 text-red-400 text-sm">
          {errorShow.active ? <p>Error al guardar el proveedor</p> : null}
        </div>
        <div className="p-2 flex flex-col space-y-2">
          <div className="flex w-full space-x-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="nameSupp" className="flex space-x-2">
                <p>Nombre</p>
                {errorShow.type.includes("SUPPLIER_NAME") ? (
                  <p className="text-red-400 text-xs">Requerido</p>
                ) : null}
              </label>
              <input
                type="text"
                name="nameSupp"
                className={
                  inputStyle +
                  `${
                    errorShow.type.includes("SUPPLIER_NAME")
                      ? " outline outline-red-300"
                      : ""
                  }`
                }
                value={supplierData.name}
                onChange={(e) => setChangeData("name", e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="phoneNumber" className="flex space-x-2">
                <p>Telefono</p>
                {errorShow.type.includes("SUPPLIER_PHONENUMBER") ? (
                  <p className="text-red-400 text-xs">Requerido</p>
                ) : null}
              </label>
              <input
                type="text"
                name="phoneNumber"
                className={
                  inputStyle +
                  `${
                    errorShow.type.includes("SUPPLIER_PHONENUMBER")
                      ? " outline outline-red-300"
                      : ""
                  }`
                }
                value={supplierData.phoneNumber}
                onChange={(e) => setChangeData("phoneNumber", e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full space-x-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="email" className="flex space-x-2">
                <p>Email</p>
                {errorShow.type.includes("SUPPLIER_EMAIL") ? (
                  <p className="text-red-400 text-xs">Requerido</p>
                ) : errorShow.type.includes("SUPPLIER_EMAIL_INVALID") ? (
                  <p className="text-red-400">Email invalido</p>
                ) : null}
              </label>
              <input
                type="text"
                name="email"
                className={
                  inputStyle +
                  `${
                    errorShow.type.includes("SUPPLIER_EMAIL")
                      ? " outline outline-red-300"
                      : ""
                  }`
                }
                value={supplierData.email}
                onChange={(e) => setChangeData("email", e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="direccion" className="flex space-x-2">
                <p>Direccion</p>
                {errorShow.type.includes("SUPPLIER_ADDRESS") ? (
                  <p className="text-red-400 text-xs">Requerido</p>
                ) : null}
              </label>
              <input
                type="text"
                name="direccion"
                className={
                  inputStyle +
                  `${
                    errorShow.type.includes("SUPPLIER_ADDRESS")
                      ? " outline outline-red-300"
                      : ""
                  }`
                }
                value={supplierData.address}
                onChange={(e) => setChangeData("address", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex justify-end w-full font-bold">
          <ButtonR
            onClick={() => {
              setSupplierCreate(false);
            }}
            title="Cancelar"
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
            height="h-7"
            width="w-32"
          ></ButtonR>

          <ButtonR
            onClick={saveSupplier}
            title="Crear"
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500"
            height="h-7"
            width="w-40"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default CreateSupplier;
