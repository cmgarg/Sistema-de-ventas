import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import Agregar from "../buttons/Agregar";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import EditarClientes from "./editarClientes/editarClientes";
import Export from "../buttons/Export";
import Imprimir from "../buttons/Imprimir";
import ListClient from "./ListClient";
import { clientData, storeType } from "../../../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import ButtonR from "../buttons/ButtonR";
import { FaAddressBook } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { IoAdd, IoAddCircle } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { PiPrinter } from "react-icons/pi";
import { BiExport } from "react-icons/bi";

interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const dispatch = useDispatch();

  const clients = useSelector((state: storeType) => state.clientState);

  const [activeModalForm, setActiveModalForm] = useState(false);
  const [clientToEdit, setClienteAeditar] = useState<{
    active: boolean;
    object: clientData;
  }>({
    active: false,
    object: {
      name: "",
      address: "",
      phone: 0,
      email: "",
      birthdate: "",
      DNI: 0,
      shopping: [],
    },
  });
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: clientData[];
  }>({
    actived: false,
    results: [],
  });

  function onChangeModal(p: boolean) {
    setActiveModalForm(p);
  }
  function clienteAeditarOff() {
    setClienteAeditar({
      active: false,
      object: {
        name: "",
        address: "",
        phone: 0,
        email: "",
        birthdate: "",
        DNI: 0,
        shopping: [],
      },
    });
  }
  function onChangeClient(data: clientData) {
    setClienteAeditar({ object: data, active: true });
  }
  ////ACTIVAR A EDITAR CLIENTES
  /////////////////////////////
  //OBTENER RESULTADOS DE BUSQUEDAD
  function getResults(e: clientData[], actived: boolean) {
    let object = { actived: actived, results: e };
    setSearchActived(object);
    console.log(object, "aca");
  }

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="row-start-1 row-end-2">
        <NavMain title="Clientes" setLoginUser={""}>
          <Buscador searchIn={clients} functionReturn={getResults}></Buscador>
          <ButtonR
            borderSize="border-b-[4px]"
            textSize="text-lg"
            bgIconColor="bg-[#333] border border-[#333333]"
            height="h-10"
            width="w-10"
          >
            <BiExport size={30} className="text-[#E0E0E0]" />
          </ButtonR>
          <ButtonR
            borderSize="border-b-[4px]"
            textSize="text-lg"
            bgIconColor="bg-[#333] border border-[#333333]"
            height="h-10"
            width="w-10"
          >
            <PiPrinter size={30} className="text-[#E0E0E0]" />
          </ButtonR>
          <ButtonR
            borderSize="border-b-[4px]"
            textSize="text-lg"
            bgIconColor="bg-[#333] border border-[#333333]"
            height="h-10"
            width="w-10"
            onClick={onChangeModal}
          >
            <IoAdd size={30} className="text-[#E0E0E0]" />
          </ButtonR>
        </NavMain>
      </div>
      <div className="flex flex-row pb-5 row-start-2 row-end-7">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 p-5">
          {activeModalForm && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {clientToEdit.active && (
            <EditarClientes
              clienteAeditarOff={clienteAeditarOff}
              dispatch={dispatch}
              clientToEdit={clientToEdit.object}
            />
          )}

          <ListClient
            clientAeditar={clientToEdit}
            searchActived={searchActived}
            setClientToEdit={onChangeClient}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
};
export default ClientesContent;
