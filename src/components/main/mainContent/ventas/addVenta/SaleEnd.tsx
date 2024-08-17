import React from "react";
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

type SaleEndProps = {
  saleData: saleData;
  setPMOk: (e: boolean) => void;
  setSaleEnd: (e: boolean) => void;
  setFacturaOk: (e: boolean) => void;
  addSales: (e: saleData) => void;
};

const SaleEnd: React.FC<SaleEndProps> = ({
  saleData,
  setSaleEnd,
  setPMOk,
  setFacturaOk,
  addSales,
}) => {
  const backClick = () => {
    setSaleEnd(false);
    setPMOk(false);
    setFacturaOk(false);
  };

  const endSale = () => {
    window.api.enviarEvento("sale-process", saleData);

    addSales(saleData);
  };
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 backdrop-blur-md">
      <div className="flex relative flex-col h-2/3 w-1/2 bg-slate-950 rounded-lg border border-slate-700 text-slate-50">
        <div className="flex-1 flex-col w-full h-full overflow-auto custom-scrollbar">
          <div
            className="absolute bottom-full right-full w-20 h-12 cursor-pointer hover:text-blue-500"
            onClick={backClick}
          >
            <BiArrowBack className="h-full w-full" />
          </div>
          <div className="flex w-full h-20 justify-between p-2">
            <div className="flex justify-start flex-1 space-x-2">
              <div className="w-14 h-14 overflow-hidden rounded-full">
                <img
                  src={saleData.seller.image}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-thin">Vendedor</p>
                <p>{saleData.seller.name}</p>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col">
                <p className="font-thin text-right">Comprador</p>
                <p>
                  {saleData.buyer.client.active
                    ? saleData.buyer.client.clientData.name
                    : "Consumidor final"}
                </p>
              </div>
              <div>
                <div className="h-14 w-14 rounded-full overflow-hidden flex justify-center items-center">
                  {saleData.buyer.client.active ? (
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
                {saleData.articles.map((item) => (
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
                      value={saleData.sold}
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
          <div className="w-full flex">
            <div className="flex-1 flex flex-col items-center h-20">
              <p className="font-thin">Metodo de pago</p>
              <div className="flex-1 flex items-center justify-center text-3xl">
                <p>{saleData.pM}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center h-20">
              <p className="font-thin">Tipo de factura</p>
              <div className="flex-1 flex items-center justify-center text-3xl">
                <p>
                  {saleData.billData?.billType === "TYPEC"
                    ? "C"
                    : saleData.billData?.billType === "TYPEA"
                    ? "A"
                    : "B"}
                </p>
              </div>
            </div>
          </div>
          <div className="h-12 w-full pt-2 flex justify-end absolute top-full right-0">
            <button
              onClick={endSale}
              className="h-7 bg-green-700 px-2 rounded-lg flex items-center hover:bg-green-600 justify-center"
            >
              <p>Finalizar venta</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEnd;
