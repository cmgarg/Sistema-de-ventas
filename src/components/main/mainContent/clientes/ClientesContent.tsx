import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import AgregarCliente from "./buttons/AgregarCliente";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const [activeModal, setActiveModal] = useState(false);

  const [clientes, setClientes] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  //////////QUEDASTE EN CREAR BUTTONS PARA AGREGAR CLIENTES
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //OBTENER CLIENTES
  function listaDeItems() {
    console.log("ME EJECUTO JJIJI");
    return (
      <table className="w-full table-auto bg-slate-50">
        <thead className="border-b-2 border-slate-800">
          <tr className="border-x-2 border-slate-800">
            <th className="border-x-2 border-slate-800">Nombre</th>
            <th>Apellido</th>
            <th className="border-x-2 border-slate-800">direccion</th>
            <th className="border-x-2 border-slate-800">telefono</th>
            <th>email</th>
            <th className="border-x-2 border-slate-800">dni</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((item, id) => (
            <tr key={id}>
              <td className="border-x-2 border-slate-800 text-center">
                {item.nombre}
              </td>
              <td className="text-center">{item.apellido}</td>
              <td className="border-x-2 border-slate-800 text-center">
                {item.direccion}
              </td>
              <td className="text-center">{item.telefono}</td>
              <td className="border-x-2 border-slate-800 text-center">
                {item.email}
              </td>
              <td className="border-x-2 border-slate-800 text-center">
                {item.dni}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    obtenerClientes();
    window.api.recibirEvento("respuesta-obtener-clientes", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE");
      const arrayClientes = [];
      e.map((e) => {
        arrayClientes.push(e);
      });
      setClientes(arrayClientes);
    });
  }, []);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain>
          <AgregarCliente onChangeModal={onChangeModal}></AgregarCliente>
          <Buscador></Buscador>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModal && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {listaDeItems()}
        </div>
      </div>
    </div>
  );
};

export default ClientesContent;
