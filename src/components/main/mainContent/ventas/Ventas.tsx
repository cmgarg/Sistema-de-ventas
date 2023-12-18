import React, { useEffect, useState } from "react";
import Buscador from "../../../buscador/Buscador";
import AgregarCliente from "../clientes/buttons/AgregarCliente";
import NavMain from "../../navmain/NavMain";



export default function Ventas() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain>
          <AgregarCliente onChangeModal={onChangeModal}></AgregarCliente>
          <Buscador></Buscador>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModalForm && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {listaDeItems()}
          {clienteAeditar.active && (
            <EditarClientes clienteAeditarOff={clienteAeditarOff} />
          )}
        </div>
      </div>
    </div>
  );
}
