import React, { useEffect, useReducer, useState } from "react";
import ButtonR from "../../../../buttons/ButtonR";
import { articleData, unitType } from "../../../../../../../../types/types";
import { TbTrash } from "react-icons/tb";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../../../../../../../lib/utils";
import { Button } from "../../../../../../../../components/app/ui/button";
import { Calendar } from "../../../../../../../../components/app/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../../../components/app/ui/popover";
import SelectM from "../../../../Select/Select";

type InitialBatchesProps = {
  errorIn: string[];
  stateArticle: articleData;
  dispatch: React.Dispatch<any>;
};

const InitialBatches: React.FC<InitialBatchesProps> = ({
  errorIn,
  stateArticle,
  dispatch,
}) => {
  const [quantity, setQuantity] = useState<any>(0);
  const initialStateLotes: {
    lotNumber: string;
    quantity: number;
    quantityBulk: number;
    quantityPallet: number;
    expirationDate: Date; // Fecha de vencimiento
  } = {
    lotNumber: "",
    quantity: 0,
    quantityBulk: 0,
    quantityPallet: 0,
    expirationDate: null, // Fecha de vencimiento
  };
  const loteReducer = (
    state: {
      lotNumber: string;
      quantity: number;
      quantityBulk: number;
      quantityPallet: number;
      expirationDate: Date; // Fecha de vencimiento
    },
    action: {
      type:
        | "LOTE_NUMBER"
        | "QUANTITY"
        | "EXPIRATION_DATE"
        | "QUANTITY_BULK"
        | "QUANTITY_PALLET";
      payload: any;
    }
  ) => {
    const { type, payload } = action;
    const validatedTypes = [
      "LOTE_NUMBER",
      "EXPIRATION_DATE",
      "QUANTITY",
      "QUANTITY_PALLET",
      "QUANTITY_BULK",
    ];
    if (validatedTypes.includes(type)) {
      switch (type) {
        case "LOTE_NUMBER":
          return { ...state, lotNumber: payload };
        case "QUANTITY":
          return {
            ...state,
            quantityBulk: 0,
            quantityPallet: 0,
            quantity: payload,
          };
        case "EXPIRATION_DATE":
          return { ...state, expirationDate: payload };
        case "QUANTITY_BULK":
          return {
            ...state,
            quantity: 0,
            quantityPallet: 0,
            quantityBulk: payload,
          };
        case "QUANTITY_PALLET":
          return {
            ...state,
            quantity: 0,
            quantityBulk: 0,
            quantityPallet: payload,
          };
        default:
      }
    }
  };
  const [newLoteState, dispatchLote] = useReducer(
    loteReducer,
    initialStateLotes
  );

  const getOptionXAmount = () => {
    const optionsXAmount: {
      label: string;
      value: any;
      abrevUnit: any;
    }[] = [
      {
        label: stateArticle.article.stock.unit.label,
        value: stateArticle.article.stock.unit.value,
        abrevUnit: stateArticle.article.stock.unit.abrevUnit,
      },
    ];

    const forBulkActive = stateArticle.article.forBulk;
    const forPalletActive = stateArticle.article.pallet;
    if (forBulkActive.active) {
      optionsXAmount.push({
        label: "Bultos",
        value: "xBulk",
        abrevUnit: "Bto",
      });
    }
    if (forPalletActive.active) {
      optionsXAmount.push({
        label: "Palets",
        value: "xPalet",
        abrevUnit: "Pal",
      });
    }

    return optionsXAmount;
  };
  const [selectOption, setSelectOption] = useState<any>("");
  const selectCountOption = (e: any) => {
    console.log("ME EJECUTO LA CONCHA TUTYAAAA");
    setSelectOption(e);
  };

  const changeQuantityValue = (e: string) => {
    if (selectOption.value === "xPalet") {
      dispatchLote({ type: "QUANTITY_PALLET", payload: parseInt(e) });
    } else if (selectOption.value === "xBulk") {
      dispatchLote({ type: "QUANTITY_BULK", payload: parseInt(e) });
    } else {
      dispatchLote({ type: "QUANTITY", payload: parseInt(e) });
    }
  };
  const getTotalStock = () => {
    const value = stateArticle.batches.reduce((a, b) => {
      let convertA = Number(a);
      let convertB = 0;

      convertB =
        Number(b.quantity) +
        Number(b.quantityBulk) * stateArticle.article.forBulk.value +
        Number(b.quantityPallet) * stateArticle.article.pallet.value;

      return (convertA += convertB);
    }, 0);

    dispatch({ type: "SET_STOCK", payload: value });
  };
  useEffect(() => {
    console.log("QUE PIJA PASA", selectOption);
  }, [selectOption]);
  useEffect(() => {
    console.log("QUE PIJA PASA 45", newLoteState);
  }, [newLoteState]);
  useEffect(() => {
    changeQuantityValue(quantity);
  }, [quantity, selectOption]);

  useEffect(() => {
    getTotalStock();
  }, [
    stateArticle.batches,
    stateArticle.article.pallet,
    stateArticle.article.forBulk,
  ]);

  return (
    <div className="flex flex-col relative">
      <div
        className={`flex h-14 w-[560px] justify-center flex-col space-y-1 relative p-1 border-t border-x border-gray-600 rounded-t-md `}
      >
        <div className="w-full max-w-full flex space-x-2">
          <div className="w-24 h-10">
            <label
              htmlFor="stock"
              className="select-none flex justify-start font-bold flex-1 h-5 text-xs"
            >
              <p>Numero de lote</p>
            </label>
            <input
              type="text"
              name="stock"
              className={`outline-none bg-[#707070ff] h-4/5 w-full  rounded-sm text-slate-50 px-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)] ${
                errorIn.includes("STOCK")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
              value={newLoteState.lotNumber}
              onChange={(e) => {
                dispatchLote({ type: "LOTE_NUMBER", payload: e.target.value });
              }}
            />
          </div>
          <div className="w-36 h-10">
            <label
              htmlFor="stock"
              className="select-none flex justify-center font-bold flex-1 h-5 text-xs"
            >
              <p>Cantidad</p>
            </label>
            <div className="h-4/5 flex bg-[#707070ff] rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
              <div className="flex-1">
                <input
                  type="text"
                  name="stock"
                  className={`outline-none bg-[#707070ff] rounded-l-sm h-full w-full   text-slate-50 px-2  ${
                    errorIn.includes("STOCK")
                      ? "overline outline-red-500 outline-2"
                      : ""
                  }`}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-20 h-full">
                <SelectM
                  todos={false}
                  options={getOptionXAmount()}
                  onChangeSelection={selectCountOption}
                  className="bg-gradient-to-l from-gray-800 via-gray-800 select-none to-gray-600 border border-l-none h-8 w-full font-thin text-sm rounded-l-none rounded-r-sm"
                  placeholder=""
                  slice={-1}
                  value={""}
                />
              </div>
            </div>
          </div>
          <div className="w-44 h-10">
            <label
              htmlFor="stock"
              className="select-none flex justify-start font-bold flex-1 h-5 text-xs"
            >
              <p>Fecha caducidad</p>
            </label>
            {/* <input
              type="text"
              name="stock"
              className={`outline-none bg-[#707070ff] h-4/5 w-full  rounded-sm text-slate-50 px-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)] ${
                errorIn.includes("STOCK")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
              value={newLoteState.expirationDate}
              onChange={(e) => {
                dispatchLote({
                  type: "EXPIRATION_DATE",
                  payload: e.target.value,
                });
              }}
            /> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-center relative shadow-[0_2px_5px_rgba(0,0,0,0.50)] border border-gray-600 min-h-8 max-h-8 items-center pt-2 bg-gradient-to-l from-gray-800 via-gray-800 to-gray-600 text-xs font-normal h-5/4 ",
                    !newLoteState.expirationDate && "text-muted-foreground"
                  )}
                >
                  <div className="absolute left-2">
                    <CalendarIcon size={15} />
                  </div>
                  {newLoteState.expirationDate ? (
                    <div className="flex-1 absolute right-2">
                      <p>{newLoteState.expirationDate}</p>
                    </div>
                  ) : (
                    <div className="flex-1 h-full absolute right-0 left-0 top-[1px] flex justify-center items-center font-normal">
                      <span className="text-slate-300 text-xs">
                        Fecha de caducidad
                      </span>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-gradient-to-t from-gray-800 via-gray-800 to-gray-600 text-white p-0">
                <Calendar
                  mode="single"
                  selected={newLoteState.expirationDate}
                  onSelect={(e) =>
                    dispatchLote({
                      type: "EXPIRATION_DATE",
                      payload: format(e, "PPP", {
                        locale: es,
                      }),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-24 flex justify-center items-end pt-5">
            <ButtonR
              title="Añadir"
              bgColor="bg-gradient-to-l  from-yellow-700 via-yellow-700 to-yellow-600 text-sm"
              height="h-7"
              width="w-full"
              onClick={() =>
                dispatch({ type: "SET_BATCHE", payload: newLoteState })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex-1 h-52 max-h-52 w-[560px]  border-x border-b border-gray-600 pt-2 overflow-auto">
        <div className="w-full h-5 flex border-b border-gray-600">
          <p className="flex-1 flex justify-start pl-2">Lote</p>
          <p className="flex-1 flex justify-center">Cantidad</p>
          <p className="flex-1 flex justify-end">Fecha de caducidad</p>
          <p className="w-6 h-6 flex pr-2"></p>
        </div>
        {stateArticle.batches.map((batches, index) => (
          <div className="w-full h-8 min-h-8 flex bg-gray-700 items-center text-xs relative">
            <p className="flex-1 flex justify-start pl-2">
              {batches.lotNumber}
            </p>
            <div className="flex-1 flex justify-evenly">
              <div className="flex">
                <p>{batches.quantity}</p>
                <p>{stateArticle.article.stock.unit.abrevUnit.toLowerCase()}</p>
              </div>
              <div className="flex">
                <p>{batches.quantityBulk}</p>
                <p>bto</p>
              </div>
              <div className="flex">
                <p>{batches.quantityPallet}</p>
                <p>pal</p>
              </div>
            </div>
            <p className="flex-1 flex justify-end pr-2">
              {batches.expirationDate}
            </p>
            <div className="w-6 h-6 flex pr-2">
              <ButtonR
                width="w-full"
                height="h-full"
                bgIconColor="bg-red-600"
                onClick={() => {
                  dispatch({
                    type: "DELETE_BATCHE",
                    payload: batches.lotNumber,
                  });
                }}
              >
                <TbTrash size={15} />
              </ButtonR>
            </div>
          </div>
        ))}
      </div>
      <div className="h-5 bg-black w-full border-x border-gray-600 rounded-b-md flex justify-end pr-2 text-xs items-center">
        <p className="flex space-x-2">
          <span className="font-bold">Total :</span>
          <span>{stateArticle.article.stock.amount}</span>
        </p>
      </div>
    </div>
  );
};

export default InitialBatches;
