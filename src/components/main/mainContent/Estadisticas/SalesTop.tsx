import React, { useEffect, useState } from "react";
import MoreIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/MoreIcon";

interface SalesTopProps {
  //PROPS
}

const SalesTop: React.FC<SalesTopProps> = ({}) => {
  const [articulos, setArticulos] = useState<object[]>([]);

  function obtenerArticulos() {
    window.api.enviarEvento("get-articles");
  }
  useEffect(() => {
    obtenerArticulos();
    window.api.recibirEvento("response-get-articles", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  return (
    <div className="flex flex-col select-none w-full relative bg-slate-800 items-center cursor-pointer text-white border-x-2 border-slate-500 px-1">
      <h4>Mas vendidos</h4>
      {articulos.map((e) => {
        return (
          <div className="w-full h-10 bg-slate-600 flex flex-row justify-around">
            falopa
          </div>
        );
      })}
    </div>
  );
};

export default SalesTop;
