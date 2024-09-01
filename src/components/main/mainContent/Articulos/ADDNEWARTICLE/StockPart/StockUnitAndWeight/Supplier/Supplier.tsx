import { supplierType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import { BiEdit, BiPhoneCall } from "react-icons/bi";
import { FaRoad } from "react-icons/fa";
import { TbTrash, TbTruck } from "react-icons/tb";
import CreateSupplier from "./CreateSupplier";
import { IoAdd, IoClose } from "react-icons/io5";
import EditSupplier from "./EditSupplier";
import { Action } from "../../../../../../../../../types/types";
import ButtonR from "../../../../../buttons/ButtonR";

type SupplierProps = {
  setSupplierForm: (e: boolean) => void;
  suppliers: supplierType[];
  dispatch: React.Dispatch<Action>;
};

const Supplier: React.FC<SupplierProps> = ({
  setSupplierForm,
  suppliers,
  dispatch,
}) => {
  const [supplierFormCreate, setSupplierCreate] = useState<boolean>(false);
  const [editSupplierForm, setEditSupplierForm] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<supplierType>({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    _id: "",
  });
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
    const includes = ["name", "phoneNumber", "email", "address", "reset"];

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
        case "reset":
          setSupplierData({
            name: "",
            phoneNumber: "",
            email: "",
            address: "",
          });
          break;

        default:
          break;
      }
    }
  };

  const onEditSupplier = (supplierToEdit: supplierType) => {
    setSupplierToEdit(supplierToEdit);
    setEditSupplierForm(true);
  };

  const deleteSupplier = (supplierToDelete: supplierType) => {
    window.api.enviarEvento("delete-supplier", supplierToDelete);
  };
  useEffect(() => {
    window.api.recibirEvento(
      "response-delete-supplier",
      (res: { message: string; value: boolean }) => {
        if (res.value) {
          setShowError({
            message: res.message,
            active: true,
          });
          window.api.enviarEvento("get-suppliers");
        } else {
          setShowError({
            message: res.message,
            active: false,
          });
        }
      }
    );
  }, []);
  useEffect(() => {
    dispatch({ type: "SET_SUPPLIER", payload: supplierData });
  }, [supplierData]);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center backdrop-brightness-50">
      <div className="flex pb-2 space-y-5 h-5/6 w-11/12 flex-col relative rounded-lg bg-[#2f2f2fff] rounde-lg border-2 border-slate-800 p-2">
        <div className="h-10 flex w-full">
          <div className="w-full justify-between flex items-center p-1">
            <div className="font-bold text-3xl">
              <p>PROVEEDORES</p>
            </div>
            <div className="flex-1 h-full flex justify-end space-x-5">
              <ButtonR
                title="Agregar"
                onClick={() => setSupplierCreate(true)}
                height="h-9"
                bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-sm"
                width="w-52"
                bgIconColor="bg-yellow-800 text-[#fff8dcff]"
              >
                <IoAdd size={30} className="text-[#fff8dcff]" />
              </ButtonR>
              <ButtonR
                onClick={() => {
                  setSupplierForm(false);
                }}
                height="h-7"
                width="w-10"
                bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
              >
                <IoClose size={30} className="text-red-400" />
              </ButtonR>
            </div>
          </div>
        </div>
        {showError.active && (
          <div className="absolute justify-center items-center top-0 bottom-0 left-0 right-0 z-50 rounded-lg flex flex-col backdrop-brightness-50">
            <div className="flex border border-gray-800 flex-col p-2 justify-center w-96 h-52 rounded-lg  bg-gray-950">
              <div className="text-lg font-bold flex-1 flex justify-center items-center">
                <p className="text-center">{showError.message}.</p>
              </div>
              <div className="flex w-full justify-end">
                <ButtonR
                  onClick={() => setShowError({ message: "", active: false })}
                  bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500"
                  width="w-32"
                  height="h-7"
                  title="
                  Aceptar"
                ></ButtonR>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-full flex-col relative flex overflow-auto">
          <div className="w-full h-10 rounded-t-lg sticky top-0 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-500 text-[#000] font-bold flex pl-2 items-center">
            <div className="flex-1 flex justify-start">
              <p>Nombre</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Email</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Telefono /</p>
              <p>Direccion</p>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-900 rounded-b-lg flex flex-col shadow-inner">
            {suppliers.map((supplier, index) => (
              <div className="w-full relative h-10 space-x-2 bg-[#2f2f2fff] font-medium text-xs border-gray-700 border-y flex pl-2 items-center">
                <div className="flex-1 flex justify-start">
                  <p>{supplier.name}</p>
                </div>
                <div className="flex-1 flex justify-start">
                  <p>{supplier.email}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex-1 flex justify-center items-center space-x-2">
                    <BiPhoneCall />
                    <p>{supplier.phoneNumber}</p>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <p>{supplier.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 absolute right-0">
                  <ButtonR
                    onClick={() => deleteSupplier(supplier)}
                    width="w-min"
                    height="h-min"
                    bgIconColor="bg-transparent"
                  >
                    <TbTrash size={15} />
                  </ButtonR>
                  <ButtonR
                    onClick={() => onEditSupplier(supplier)}
                    width="w-min"
                    height="h-min"
                    bgIconColor="bg-transparent"
                  >
                    <BiEdit size={15} />
                  </ButtonR>
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
      {editSupplierForm && (
        <EditSupplier
          editSupplierForm={setEditSupplierForm}
          supplierToEdit={supplierToEdit}
        />
      )}
    </div>
  );
};

export default Supplier;
