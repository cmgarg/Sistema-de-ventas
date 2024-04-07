import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../app/ui/table";

type salesType = {
  amount: string;
  article: string;
  sold: number;
  date: string;
};
type params = {
  salesData: salesType[];
};

export function SalesRecen({ salesData }: params) {
  const [articulos, setArticulos] = useState<object[]>([]);

  const [articlesOrder, setArticlesOrder] = useState<object[]>([]);

  function sortArticles() {
    const copyArticles = [...articulos];

    const articulosOrdenados = copyArticles.sort((a, b) => {
      let salesA = a.ventas.length;
      let salesB = b.ventas.length;

      return salesB - salesA;
    });
    setArticlesOrder(articulosOrdenados);
  }

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

    sortArticles();
  }, []);
  return (
    <div className="grid col-span-3 row-span-5 text-slate-50 relative">
      <Table className="bg-slate-750">
        <TableHeader>
          <TableRow>
            <TableHead className="">Articulo</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Ventas</TableHead>
            <TableHead className="text-right" on>
              Monto
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articulos.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.articulo}</TableCell>
              <TableCell>{invoice.brand.label}</TableCell>
              <TableCell>{invoice.ventas.length}</TableCell>
              <TableCell className="text-right text-green-200">
                ${invoice.costo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
