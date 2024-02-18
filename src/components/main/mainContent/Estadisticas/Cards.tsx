import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../app/ui/card";

import { ShadowIcon } from "@radix-ui/react-icons";

type salesType = {
  article: string;
  amount: string;
  sold: number;
  date: string;
};

type params = {
  sales: salesType[];
};

export function Cards({ sales }: params) {
  const [lastSale, setLastSale] = useState<salesType>({
    article: "Undefined",
    amount: "0",
    sold: 0,
    date: "0-0-0",
  });
  const [totalSales, setTotalSales] = useState<Number>();

  function getLastSale() {
    const copySales = [...sales];

    copySales.map((e) => {
      const dateConverter = e.date.split("-").reverse().join("-");
      e.date = dateConverter;
    });

    const lastSale = copySales.reduce((a, b) => {
      return new Date(a.date) > new Date(b.date) ? a : b;
    });

    setLastSale(lastSale);
  }

  function getTotalSales() {
    const copySales = [...sales];

    let sumaSold = 0;

    copySales.forEach((e) => {
      sumaSold += e.sold;
    });
    setTotalSales(sumaSold);
  }
  useEffect(() => {
    if (sales.length > 0) {
      getLastSale();
      getTotalSales();
    }
  }, [sales]);

  const stylesCards =
    "border border-gray-600 text-white space-y-1 flex  flex-col justify-evenly pl-2 pr-2";
  //SEGUIR APRENDIENDO
  return (
    <div className="grid grid-cols-4 gap-2 row-span-1 col-span-10">
      <Card className={stylesCards}>
        <div className="flex text-xl justify-between flex-row items-end">
          <p>Total Vendido</p>
          <p className="text-2xl text-green-200">$</p>
        </div>
        <div className="w-full justify-start flex">
          <p className="text-slate-300 text-5xl font-semibold">
            ${totalSales ? totalSales : 0}
          </p>
        </div>
        <div>
          <p className="text-gray-400 font-normal text-xs">
            20% mas que el mes anterior
          </p>
        </div>
      </Card>
      <Card className={stylesCards}>
        <div className="flex text-xl justify-between flex-row items-end">
          <p>Ultima venta</p>
          <p className="text-gray-500">
            <ShadowIcon color="#ff0" height={20} width={20}></ShadowIcon>
          </p>
        </div>
        <div className="w-full justify-start flex">
          <p className="text-green-300 text-5xl font-semibold">
            ${lastSale.sold}
          </p>
        </div>
        <div>
          <p className="text-gray-400 font-normal text-xs">
            Articulo: {lastSale.article}
          </p>
        </div>
      </Card>
      <Card className={stylesCards}>
        <p>Vendedor</p>
      </Card>
      <Card className={stylesCards}>
        <p>Vendedor</p>
      </Card>
      <button onClick={getTotalSales}>MOSTRAR</button>
    </div>
  );
}
