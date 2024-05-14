import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { articleData } from "@/types";
interface ArticuloInfoProps {}

const ArticuloInfo: React.FC<ArticuloInfoProps> = ({}) => {
  console.log("BUENAS TARDES");
  const [article, setArticle] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      stock: {
        amount: 0,
        unit: "",
      },
    },
    brand: {
      value: "",
      label: "",
    },
    code: "",
    category: {
      value: "",
      label: "",
    },
    dateToRegister: "",
    sales: [],
  });
  const { code } = useParams();

  function getClienteInfo() {
    window.api.enviarEvento("get-articleByCode", code);
  }
  useEffect(() => {
    getClienteInfo();
    console.log("buenas tardes");
    window.api.recibirEvento("response-get-articleByCode", (e) => {
      setArticle(e[0]);
      console.log(e, "KIKO");
    });
    console.log(article);
  }, []);

  return (
    <div className="flex flex-col flex-1 text-slate-50">
      <div className="flex-2">
        <NavMain title={`${article.article.name}`}>
          <Export></Export>
        </NavMain>
      </div>
      <div className="flex-1 flex flex-col p-1 mt-5 space-y-5">
        <div className="flex border border-gray-600 rounded-lg">
          <div className="flex-1 border-r border-gray-600">
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center border-b border-gray-600">
              <p>
                <span>Marca: </span>
                {article.brand.label}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <p>
                <span>Costo: </span>${article.article.costo}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 h-20 text-2xl border-b border-gray-600 text-center flex justify-start pl-5 items-center">
              <p>
                <span>Venta: </span>${article.article.venta}
              </p>
            </div>
            <div className="flex-1 h-20 text-2xl text-center flex justify-start pl-5 items-center">
              <div className="flex space-x-2">
                <span>Stock: </span>
                <div className="flex space-x-1">
                  <p>{article.article.stock.amount}</p>
                  <p>{article.article.stock.unit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {"SPEARACION"} */}
        <div className="flex-1 p-1 space-y-5">
          <div className="w-full text-3xl">
            <h1>Ventas [{article.sales.length}]</h1>
          </div>
          <div className="flex-1">
            <TableMain>
              <TableHead>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Comprador</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Comprado</p>
                </div>
                <div className="flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
                  <p className="text-center">Comprador</p>
                </div>
              </TableHead>
              {article.sales.map((buy) => (
                <TableRow key={buy._id}>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{buy.comprador.name}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{buy.totalCost}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1 pl-2">
                    <p>{buy.quantity}</p>
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
