import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    marca: "",
    costo: "",
    venta: "",
    stock: "",
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
      <div className="flex-1 flex flex-col space-y-5  bg-slate-900">
        <div className="bg-slate-800 flex">
          <div className="flex-1 border-r-2 border-slate-700">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b-2  border-slate-700">
              <p>
                <span>Marca: </span>
                {articulo.marca}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Costo: </span>${articulo.costo}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b-2 border-slate-700">
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
              </TableHead>
            </TableMain>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticuloInfo;
