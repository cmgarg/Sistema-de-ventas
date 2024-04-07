import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
interface ArticuloInfoProps {}

const ArticuloInfo: React.FC<ArticuloInfoProps> = ({}) => {
  console.log("BUENAS TARDES");
  const [articulo, setArticulo] = useState({
    articulo: "",
    brand: { value: "", label: "" },
    costo: "",
    venta: "",
    stock: "",
    ventas: [],
  });
  const { id } = useParams();

  function getClienteInfo() {
    window.api.enviarEvento("get-articleById", id);
  }
  useEffect(() => {
    console.log(id, "hola");
    getClienteInfo();
    console.log("buenas tardes");
    window.api.recibirEvento("article-foundById", (e) => {
      setArticulo(e[0]);
      console.log(e, "KIKO");
    });
    console.log(articulo);
  }, []);

  return (
    <div className="flex flex-col flex-1 text-slate-50">
      <div className="flex-2">
        <NavMain title={`${articulo.articulo}`}>
          <Export></Export>
        </NavMain>
      </div>
      <div className="flex-1 flex flex-col p-1 mt-5 space-y-5">
        <div className="flex border border-gray-600 rounded-lg">
          <div className="flex-1 border-r border-gray-600">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b border-gray-600">
              <p>
                <span>Marca: </span>
                {articulo.brand.value}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Costo: </span>${articulo.costo}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl border-b border-gray-600 text-center flex justify-start pl-5 items-center">
              <p>
                <span>Venta: </span>${articulo.venta}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Stock: </span>
                {articulo.stock}
              </p>
            </div>
          </div>
        </div>
        {/* {"SPEARACION"} */}
        <div className="flex-1 p-1 space-y-5">
          <div className="w-full text-3xl">
            <h1>Ventas [{articulo.ventas.length}]</h1>
          </div>
          <div className="flex-1">
            <TableMain>
              <TableHead>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Articulo</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Cantidad</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Comprador</p>
                </div>
              </TableHead>
              {articulo.ventas.map((compra) => (
                <TableRow key={compra._id}>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{compra.articulo.nombreArticulo}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{compra.cantidad}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{compra.comprador.nombre}</p>
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

export default ArticuloInfo;
