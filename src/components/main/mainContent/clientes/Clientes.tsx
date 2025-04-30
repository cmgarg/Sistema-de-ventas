import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import Agregar from "../buttons/Agregar";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import EditarClientes from "./editarClientes/editarClientes";
import ListClient from "./ListClient";
import { clientData, storeType } from "../../../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import ButtonR from "../buttons/ButtonR";
import { IoAdd, IoAddCircle } from "react-icons/io5";
import { PiPrinter } from "react-icons/pi";
import { BiExport } from "react-icons/bi";
import ContextMenu from "../buttons/ContextMenu";
import { TrashIcon } from "@radix-ui/react-icons";
import { BsTrash } from "react-icons/bs";
import { generatePDF } from "../../GeneratePDFArticulo";
import { generateClientsPDF } from "../../GenerateClientsPDF";
import Biñeta from "../Biñeta/Biñieta";

interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const dispatch = useDispatch();

  const clients = useSelector((state: storeType) => state.clientState);

  const [activeModalForm, setActiveModalForm] = useState(false);
  const [clientsInList, setClientsInList] = useState<any[]>([]);
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
      clientType: "",
      CUIT_CUIL: "",
      nationality: "",
      payMethod: "",
      conditionIVA: "",
      rubro: "",
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
        clientType: "",
        CUIT_CUIL: "",
        conditionIVA: "",
        nationality: "",
        payMethod: "",
        rubro: "",
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

  ///////exportacion
  useEffect(() => {
    window.api.recibirEvento("response-get-clients", (res) => {
      setSearchActived({ ...searchActived, results: res });
    });

    return () => {
      window.api.removeAllListeners("response-get-clients");
    };
  }, []);
  useEffect(() => {
    if (searchActived.actived) {
      setClientsInList(searchActived.results);
    }else{
      setClientsInList(clients)
    }

    console.log(clientsInList);
  }, [searchActived, clients]);




  
  ///////////////////////export
  const exportarPDF = () => {
    console.log("Exportando PDF...");
    console.log(clientsInList,"Clientes en la listaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:" );
    if (clientsInList.length > 0) {
      generateClientsPDF("Lista de Clientes", clientsInList);
    } else {
      console.warn("No hay clientes disponibles para exportar.");
    }
  };
  


  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag">
        <NavMain title="Clientes" setLoginUser={""}>
          <Biñeta title={"Buscador"}>
          <Buscador searchIn={clients} functionReturn={getResults}></Buscador>
          </Biñeta>
          <Biñeta title={"Exportar"}>
          <ButtonR
            borderSize="border-x border-gray-600"
            textSize="text-lg"
            bgIconColor="bg-gray-700 text-[#fff8dcff]"
            height="h-8"
            width="w-10"
            onClick={ exportarPDF }
            
          >
            <BiExport size={25} className="text-[#E0E0E0]" />
          </ButtonR>
          </Biñeta>
          
          <ButtonR
            borderSize="border-x border-gray-600"
            textSize="text-sm"
            bgIconColor="bg-gray-700 text-[#fff8dcff]"
            height="h-8"
            width="w-44"
            bgColor="bg-yellow-700"
            title="Agregar cliente"
            onClick={onChangeModal}
          >
            <IoAdd size={25} className="text-[#E0E0E0]" />
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
