import { supplierType } from "@/types";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaRoad } from "react-icons/fa";
import { TbTrash, TbTruck } from "react-icons/tb";
import CreateSupplier from "./Supplier/CreateSupplier";
import { IoAdd, IoClose } from "react-icons/io5";

type SupplierProps = {
  setSupplierForm: (e: boolean) => void;
  suppliers: supplierType[];
};

const Supplier: React.FC<SupplierProps> = ({ setSupplierForm, suppliers }) => {
  const [supplierFormCreate, setSupplierCreate] = useState<boolean>(false);
  const [supplierData, setSupplierData] = useState<supplierType>({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [showError, setShowError] = useState({
    message: "",
    active: false,
  });

  //ONCHANGE
  const setChangeData = (f: string, v: string) => {
    const includes = ["name", "phoneNumber", "email", "address"];

    if (includes.includes(f)) {
      switch (f) {
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

  const loadSuppliers = () => {
    window.api.enviarEvento("get-suppliers");
  };

  const deleteSupplier = (supplierToDelete: supplierType) => {
    window.api.enviarEvento(
      "delete-supplier",
      (res: { message: string; value: boolean }) => {
        if (res.value) {
          setShowError({
            message: res.message,
            active: true,
          });
        } else {
          setShowError({
            message: res.message,
            active: false,
          });
        }
      }
    );
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="flex pb-2 space-y-5 h-5/6 w-5/6 flex-col relative rounded-lg bg-slate-900 rounde-lg border-2 border-slate-800">
        <div className="h-14 flex w-full">
          <div className="w-full justify-between flex items-center p-1">
            <div className="font-bold text-3xl">
              <p>PROVEEDORES</p>
            </div>
            <div className="flex-1 h-full flex justify-end space-x-5">
              <button
                onClick={() => setSupplierCreate(true)}
                className="h-10 w-10 flex justify-center items-center bg-teal-800 font-bold rounded-full"
              >
                <IoAdd size={30} />
              </button>
              <button
                onClick={() => {
                  setSupplierForm(false);
                }}
                className="h-10 w-10 flex justify-center items-center rounded-full bg-rose-800"
              >
                <IoClose size={30} />
              </button>
            </div>
          </div>
        </div>
        {showError.active && (
          <div className="absolute top-0 right-0 left-0 bottom-0 z-50 bg-slate-950 rounded-lg flex flex-col">
            <div className="text-rose-600 text-2xl font-bold flex-1 flex justify-center items-center">
              <p>{showError.message}</p>
            </div>
            <div className="flex w-full">
              <button className="flex-1 bg-cyan-700 rounded-b-lg">
                Aceptar
              </button>
            </div>
          </div>
        )}
        <div className="w-full h-full flex-col relative flex overflow-auto">
          <div className="w-full h-10 sticky top-0 bg-slate-900 text-slate-200 font-bold border-y flex pl-2 items-center">
            <div className="flex-1 flex justify-start">
              <p>Nombre</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Telefono</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Email</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Direccion</p>
            </div>
            <div className="w-11"></div>
          </div>
          <div className="flex-1 w-full bg-slate-800 flex flex-col">
            {suppliers.map((supplier) => (
              <div className="w-full h-10 font-medium text-sm bg-indigo-950 border-slate-600 border-y flex pl-2 items-center">
                <div className="flex-1 flex justify-start">
                  <p>{supplier.name}</p>
                </div>
                <div className="flex-1 flex justify-center">
                  {supplier.phoneNumber}
                </div>
                <div className="flex-1 flex justify-center">
                  {supplier.email}
                </div>

                <div className="flex-1 flex justify-center">
                  <p>{supplier.address}</p>
                </div>
                <div className="flex flex-col items-center w-7 h-full">
                  <button className="bg-rose-900 rounded-l-full flex-1 w-full flex items-center justify-center hover:bg-rose-600">
                    <TbTrash size={15} />
                  </button>
                  <button className="bg-cyan-900 rounded-l-full flex-1 w-full flex items-center justify-center hover:bg-cyan-600">
                    <BiEdit size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {supplierFormCreate && (
        <CreateSupplier
          setChangeData={setChangeData}
          setSupplierCreate={setSupplierCreate}
          supplierData={supplierData}
        />
      )}
    </div>
  );
};

export default Supplier;
