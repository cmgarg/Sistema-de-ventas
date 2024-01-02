import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Agregar from "../buttons/Agregar";
import Buscador from "../../../buscador/Buscador";
import AsideMain from "../../asidemain/AsideMain";
import TableHead from "../../tablaMain/TableHead";
import TableMain from "../../tablaMain/TableMain";
import TableRow from "../../tablaMain/TableRow";
import AddArticuloForm from "./ADDARTICULO/AddArticuloForm";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import Export from "../buttons/Export";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";

interface ArticulosProps {
  tamaño: string;
}

const Articulos: React.FC<ArticulosProps> = ({ tamaño }) => {
  const [activeModal, setActiveModal] = useState(false);

  const [articulos, setArticulos] = useState<object[]>([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function obtenerArticulos() {
    window.api.enviarEvento("obtener-articulos");
  }

  function addArticles(article: object) {
    setArticulos([...articulos, article]);
  }

  ///carga de articulos
  useEffect(() => {
    obtenerArticulos();
    window.api.recibirEvento("respuesta-obtener-articulos", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  //////////////////////////////

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Articulos">
          <Buscador></Buscador>
          <Export></Export>
          <Agregar title="Articulo" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModal && (
            <AddArticuloForm
              onChangeModal={onChangeModal}
              addArticles={addArticles}
            ></AddArticuloForm>
          )}
          <ArticleList articulos={articulos} setArticulos={setArticulos} />
        </div>
      </div>
    </div>
  );
};

export default Articulos;
