import React, { ReactNode, useEffect, useState } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import { Link } from "react-router-dom";

interface StockListProps {
  filtersActived: { category: string; brand: string };
  searchActived: { actived: boolean; results: object[] };
}

const StockList: React.FC<StockListProps> = ({
  filtersActived,
  searchActived,
}) => {
  // HACEEEER QUE EL BUSCADOR FUNCIONE
  //ORDENAR LISTA
  const [articulos, setArticulos] = useState<object[]>([]);

  const [articlesFilter, setArticlesFilter] = useState<object[]>([]);

  const [orderFor, setOrderFor] = useState<string>("");

  //elimina venta del estado

  useEffect(() => {
    window.api.recibirEvento("response-get-articles", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);

  useEffect(() => {
    //NO SE FILTRA BIEN
    let articlesFilered = [];
    if (filtersActived.brand && filtersActived.category === "") {
      console.log(filtersActived.brand, "AGUANTEEEEEEEEE MILEI");
      console.log(articulos, "LOS ARTICULOS ");
      const filter = articulos.filter((e) => {
        let lowerCase = e.brand.value.toLowerCase();
        console.log(lowerCase === filtersActived.brand, "BOOOLEANOOO");
        return e.brand.value.toLowerCase() === filtersActived.brand;
      });
      articlesFilered = filter;
    } else if (filtersActived.category && filtersActived.brand === "") {
      let filter = articulos.filter((e) => {
        let lowerCase = e.category.value.toLowerCase();
        return lowerCase === filtersActived.category;
      });
      articlesFilered = filter;
    } else if (filtersActived.brand && filtersActived.category) {
      const filter = articulos.filter((e) => {
        console.log(
          e.brand.value === filtersActived.brand &&
            e.category.value === filtersActived.category
        );
        let lowerCaseBrand = e.brand.value.toLowerCase();
        let lowerCaseCategory = e.category.value.toLowerCase();

        return (
          lowerCaseBrand === filtersActived.brand &&
          lowerCaseCategory === filtersActived.category
        );
      });
      articlesFilered = filter;
    }
    setArticlesFilter([...articlesFilered]);
    console.log(articlesFilter, "BOOOOOOOOOOO", articlesFilered);
  }, [filtersActived]);
  function agregarPrueba() {
    let arr = [];

    for (let i = 0; i < 30; i++) {
      arr.push({
        articulo: "Gaseosa",
        costo: "400",
        venta: "800",
        stock: "200",
        brand: { value: "Mocoreta", label: "Mocoreta" },
        category: { value: "Bebidas", label: "Bebidas" },
        ventas: [],
        _id: "88zOUgvxxDqZJCE3",
      });
    }

    let articulosAll = [...arr];

    setArticulos(articulosAll);
  }
  function onChangeOrderFor(e: string) {
    setOrderFor(e);
    sortArticleFor(e);
  }
  function sortArticleFor(e: string) {
    let salesToOrder = [...articulos];

    if (e === "stock") {
      if (orderFor === "stock") {
        salesToOrder.sort((a: object, b: object) => a.stock - b.stock);
        setOrderFor("");
        console.log("koku");
      } else {
        salesToOrder.sort((a: object, b: object) => b.stock - a.stock);
        console.log("yuya");
      }

      setArticulos([...salesToOrder]);
    } else if (e === "costo") {
      if (orderFor === "costo") {
        salesToOrder.sort((a: object, b: object) => a.costo - b.costo);
        setOrderFor("");
      } else {
        salesToOrder.sort((a: object, b: object) => b.costo - a.costo);
      }

      setArticulos([...salesToOrder]);
    }
  }
  useEffect(() => {
    console.log(searchActived.results, "RESULTADOS DE LA BUSQUEDAD");
  }, [searchActived]);

  return (
    //PODER ORDENAR LAS LISTAS
    <TableMain>
      <TableHead>
        <div className="bg-slate-500 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Articulo</p>
        </div>
        <div className="bg-slate-500 flex-1 pl-2 flex items-center justify-center">
          <p className="text-center">Marca</p>
        </div>
        <div
          className="bg-slate-500 flex-1 pl-2 flex items-center justify-center"
          onClick={() => {
            onChangeOrderFor("costo");
          }}
        >
          <p className="text-center">Costo</p>
        </div>
        <div
          className="bg-slate-500 flex-1 pl-2 flex items-center justify-center"
          onClick={() => {
            onChangeOrderFor("stock");
          }}
        >
          <p className="text-center">Cantidad</p>
        </div>
      </TableHead>
      <div className="first:bg-white">
        {articlesFilter.length > 0 &&
        (filtersActived.brand || filtersActived.category) ? ( //MOSTRAR RESULTADOS
          articlesFilter.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex items-center flex-1 border-x-2 border-slate-400">
                <Link
                  to={`/articulo/${fila.idArticle}`}
                  className="flex-1 text-center"
                >{`${fila.articulo}`}</Link>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2 border-x-2 border-slate-400">
                <p>{fila.brand.label}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2 border-x-2 border-slate-400">
                <p>${fila.costo}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2 border-x-2 border-slate-400">
                <p>{fila.stock}</p>
              </div>
            </TableRow>
          ))
        ) : searchActived.actived && searchActived.results.length > 0 ? (
          searchActived.results.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex items-center flex-1">
                <Link
                  to={`/articulo/${fila.idArticle}`}
                  className="flex-1 text-center"
                >{`${fila.articulo}`}</Link>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.brand.label}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>${fila.costo}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.stock}</p>
              </div>
            </TableRow>
          ))
        ) : !filtersActived.category && !filtersActived.brand ? (
          articulos.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex items-center flex-1 pl-2 space-x-1">
                <Link
                  to={`/articulo/${fila._id}`}
                  className="flex-1 text-center"
                >{`${fila.articulo}`}</Link>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.brand.label}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>${fila.costo}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.stock}</p>
              </div>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>No hay resultados</p>
            </div>
          </TableRow>
        )}
      </div>
    </TableMain>
  );
};

export default StockList;
