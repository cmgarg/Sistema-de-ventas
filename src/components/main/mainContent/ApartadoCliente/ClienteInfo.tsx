import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";

interface Articulo {
  nombreArticulo: string;
}

interface Compra {
  articulo: Articulo;
  cantidad: number;
}

interface CompraData {
  compra: Compra;
  dateOfRegister: string;
}

interface Cliente {
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  telefono: string;
  compras: CompraData[];
}

interface ClienteInfoProps {}

const ClienteInfo: React.FC<ClienteInfoProps> = () => {
  console.log("BUENAS TARDES");
  
  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    telefono: "",
    compras: [],
  });
  
  const { id } = useParams();
  
  function getClienteInfo() {
    window.api.enviarEvento("obtener-clienteById", id);
  }
  
  useEffect(() => {
    console.log(id);
    getClienteInfo();

    window.api.recibirEvento("cliente-encontradoById", (e: Cliente[]) => {
      setCliente(e[0]);
      console.log(e, "KIKO");
    });
  }, [id]);
  
  useEffect(() => {
    console.log(cliente.compras[0]);
  }, [cliente]);

  return (
    <div className="flex flex-col flex-1 text-slate-50">
      <div className="flex-2">
        <NavMain title={`${cliente.nombre} ${cliente.apellido}`} setLoginUser={""}>
          <Export />
        </NavMain>
      </div>
      <div className="flex-1 flex flex-col space-y-5 bg-slate-900">
        <div className="bg-slate-800 flex">
          <div className="flex-1 border-r-2 border-slate-700">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b-2 border-slate-700">
              <p>
                <span>Direccion: </span>
                {cliente.direccion}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Email: </span>
                {cliente.email}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b-2 border-slate-700">
              <p>
                <span>Telefono: </span>
                {cliente.telefono}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Direccion: </span>
                {cliente.direccion}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-slate-900 p-1">
          <div className="w-full text-3xl bg-slate-900">
            <h1>Compras</h1>
          </div>
          <div className="flex-1">
            <TableMain>
              <TableHead>
                <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Articulo</p>
                </div>
                <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Cantidad</p>
                </div>
                <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Fecha</p>
                </div>
              </TableHead>
              {cliente.compras.map((com, index) => (
                <TableRow key={index}>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{com.compra.articulo.nombreArticulo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{com.compra.cantidad}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{com.dateOfRegister}</p>
                  </div>
                </TableRow>
              ))}
            </TableMain>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
