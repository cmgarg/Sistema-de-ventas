import React, { useEffect } from "react";
import { saleData } from "../../../../../../types/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "../../../../../../app/ui/table";
import { NumericFormat } from "react-number-format";
import { FaBasketShopping } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import { BsBack } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import ButtonR from "../../buttons/ButtonR";

type SaleEndProps = {
  saleState: saleData;
  setSaveSaleExit: (e: boolean) => void;
  setCurrentStage: (e: "factura" | "payMethod" | "saleEnd" | "close") => void;
  saveSaleExit: boolean;
  addSales: (e: saleData) => void;
};

const SaleEnd: React.FC<SaleEndProps> = ({
  saleState,
  setSaveSaleExit,
  saveSaleExit,
  setCurrentStage,
  addSales,
}) => {
  const backClick = () => {
    setCurrentStage("payMethod");
  };

  const endSale = () => {
    window.api.enviarEvento("sale-process", saleState);
  };
  useEffect(() => {
    window.api.recibirEvento("response-sale-process", (sale) => {
      if (sale.save) {
        window.api.enviarEvento("get-sales");
        setSaveSaleExit(true);
        setCurrentStage("close");
      } else {
        //ACA QUIERO MOSTRAR UN ERROR SI NO SE GENERA LA VENTA PRO X MOTIVOS
      }
    });
  }, []);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 backdrop-blur-md">
      <div className="flex relative flex-col h-2/3 w-1/2 bg-slate-950 rounded-lg border border-slate-700 text-slate-50">
        <div className="flex-1 flex-col w-full h-full overflow-auto custom-scrollbar">
          <div className="flex w-full h-20 justify-between p-2">
            <div className="flex justify-start flex-1 space-x-2">
              <div className="w-14 h-14 overflow-hidden rounded-full">
                <img
                  src={saleState.seller.imageUrl}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-thin">Vendedor</p>
                <p>{saleState.seller.nombre}</p>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col">
                <p className="font-thin text-right">Comprador</p>
                <p>
                  {saleState.buyer.client.active
                    ? saleState.buyer.client.clientData.name
                    : "Consumidor final"}
                </p>
              </div>
              <div>
                <div className="h-14 w-14 rounded-full overflow-hidden flex justify-center items-center">
                  {saleState.buyer.client.active ? (
                    <FcBusinessman
                      size={30}
                      className="text-rose-500 h-full w-full"
                    />
                  ) : (
                    <FaBasketShopping className="text-rose-500 h-full w-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-auto custom-scrollbar min-h-52">
            <Table>
              <TableCaption>
                <p>Articulos</p>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left" colSpan={2}>
                    Articulo
                  </TableHead>
                  <TableHead className="text-center " colSpan={2}>
                    Cantidad
                  </TableHead>
                  <TableHead className="text-right " colSpan={1}>
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saleState.articles.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell colSpan={2} className="text-left">
                      {item.name}
                    </TableCell>
                    <TableCell colSpan={2} className="text-center">
                      {item.amount.value}
                    </TableCell>
                    <TableCell colSpan={1} className="text-right">
                      <NumericFormat
                        allowLeadingZeros
                        allowedDecimalSeparators={[".", "."]}
                        value={item.total}
                        decimalScale={2}
                        thousandSeparator=","
                        displayType={"text"}
                        className="text-2xl text-green-400 font-bold"
                        prefix={"$"}
                        renderText={(formattedValue) => (
                          <div>{formattedValue}</div>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right" colSpan={3}>
                    <NumericFormat
                      allowLeadingZeros
                      allowedDecimalSeparators={[".", "."]}
                      value={saleState.sold}
                      decimalScale={2}
                      thousandSeparator=","
                      displayType={"text"}
                      className="text-2xl text-green-400 font-bold"
                      prefix={"$"}
                      renderText={(formattedValue) => (
                        <div>{formattedValue}</div>
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex justify-evenly flex-1">
              <div className="w-60 flex flex-col items-center h-24 rounded-lg bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500">
                <p className="font-thin">Metodo de pago</p>
                <div className="flex-1 flex items-center justify-center text-3xl">
                  <p>{saleState.pM}</p>
                </div>
              </div>
              <div className="w-60 flex flex-col items-center h-24 rounded-lg border bg-gradient-to-br from-gray-700 via-gray-700 to-gray-500 border-gray-600">
                <p className="font-thin">Tipo de factura</p>
                <div className="flex-1 flex items-center justify-center text-3xl">
                  <p>
                    {saleState.billData?.billType === "TYPEC"
                      ? "C"
                      : saleState.billData?.billType === "TYPEA"
                      ? "A"
                      : "B"}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-10 w-full pr-2 flex items-center justify-end space-x-2">
              <ButtonR
                height="h-7"
                width="w-24"
                title="Volver"
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-sm"
                onClick={backClick}
              ></ButtonR>
              <ButtonR
                onClick={endSale}
                height="h-7"
                width="w-32"
                bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-sm"
                title="Finalizar venta"
              ></ButtonR>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEnd;
