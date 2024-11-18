import React, { useEffect, useReducer, useState } from "react";
import ArticleRestock from "./ArticleRestock";
import { articleData, storeType } from "../../../../../../types/types";
import { batch, useSelector } from "react-redux";
import SelectM from "../../Select/Select";
import ButtonR from "../../buttons/ButtonR";
import { cn } from "../../../../../../lib/utils";
import { Button } from "../../../../../../components/app/ui/button";
import { Calendar } from "../../../../../../components/app/ui/calendar";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/app/ui/popover";
import { CalendarIcon } from "lucide-react";
type RestockFormProps = {
  setReStock: (e: boolean) => void; // Define tus props aquí
};

const RestockForm: React.FC<RestockFormProps> = ({ setReStock }) => {
  const articles: articleData[] = useSelector(
    (state: storeType) => state.articleState
  );
  const [articleSelect, setArticleSelect] = useState<articleData>();
  const [unitSelect, setUnitSelect] = useState<{
    value: string;
    label: string;
    abrevUnit: string;
  }>({ value: "", label: "", abrevUnit: "" });
  const [amount, setAmount] = useState<number | string>(0);
  const [batche, setBatche] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<any>();
  const [errors, setErrors] = useState<string[]>([]);
  const [optionsUnit, setOptionsUnit] = useState<
    { value: string; label: string; abrevUnit: string }[]
  >([]);

  const onChangeAmount = (e: string) => {
    setAmount(e);
  };
  const onChangeBatche = (e: string) => {
    setBatche(e);
  };
  const onArticleSelect = (e: articleData) => {
    setArticleSelect(e);
  };

  const onChangeSelection = (e: any) => {
    setUnitSelect(e);
  };
  const optionsUnitAvailable = () => {
    const options = [];
    if (articleSelect) {
      if (articleSelect.article.forBulk.active) {
        options.push({ value: "xBulk", label: "Bultos", abrevUnit: "Bto" });
      }
      if (articleSelect.article.pallet.active) {
        options.push({ value: "xPalet", label: "Palets", abrevUnit: "Pal" });
      }
      options.push(articleSelect.article.stock.unit);
    }
    return setOptionsUnit(options);
  };

  const endRestock = () => {
    if (articleSelect && unitSelect.value && amount) {
      window.api.enviarEvento("article_restock", {
        articleCode: articleSelect.code,
        amount: { value: amount, unit: unitSelect },
        batch: batche,
        expirationDate: expirationDate,
      });
    } else {
      console.log("PORONgA");
    }
  };
  useEffect(() => {
    optionsUnitAvailable();
  }, [articleSelect]);

  useEffect(() => {
    console.log(expirationDate);
  }, [expirationDate]);
  useEffect(() => {
    console.log(unitSelect);
  }, [unitSelect]);

  useEffect(() => {
    window.api.recibirEvento("response-restock-article", (res) => {
      if (res) {
        console.log("COOOORRECTO");
        setReStock(false);
      }
    });

    return () => {
      window.api.removeAllListeners("response-restock-article");
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center">
      <div className="w-96 space-y-2 pt-2 bg-[#2f2f2fff] rounded-lg border border-gray-600 text-sm relative">
        <div className="absolute right-0 top-0 w-32 text-sm">
          {articleSelect ? (
            <p>Stock actual | {articleSelect.article.stock.amount}</p>
          ) : null}
        </div>
        <div className="flex flex-col justify-start px-2">
          <div className="w-full cursor-pointer flex flex-col">
            <div className="">
              <p>Articulo</p>
            </div>
            <div className="h-10">
              <ArticleRestock
                articles={articles}
                errors={errors}
                setArticleSelect={onArticleSelect}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex space-x-2 px-2 ">
          <div className="flex w-52 flex-col ">
            <div className="flex justify-between">
              <div>
                <p>Cantidad</p>
              </div>
              <div className="h-full w-20 flex items-end">
                <p className="text-[10px]">Unidad</p>
              </div>
            </div>
            <div className="flex bg-[#707070ff] h-10 rounded-md border items-center border-gray-600 shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
              <div className="h-full flex-1">
                <input
                  type="text"
                  className="h-full w-full bg-[#707070ff] rounded-md  pl-2"
                  value={amount}
                  onChange={(e) => onChangeAmount(e.target.value)}
                />
              </div>
              <div className="w-[1px] h-8 bg-[#606060ff] rounded-full"></div>
              <div className="flex w-20 flex-col relative">
                <SelectM
                  options={optionsUnit}
                  onChangeSelection={onChangeSelection}
                  value={unitSelect.label}
                  className="bg-[#707070ff] border-none"
                  placeholder={"..."}
                  slice={3}
                  todos={false}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div>
              <p>Lote</p>
            </div>
            <div className="w-full">
              <input
                type="text"
                value={batche}
                className="h-10 rounded-md border border-gray-600 bg-[#707070ff] outline-none shadow-[0_2px_5px_rgba(0,0,0,0.50)] pl-2"
                onChange={(e) => onChangeBatche(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="h-10 w-full px-2">
          <label
            htmlFor="stock"
            className="select-none flex justify-start flex-1 h-5 text-xs"
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
                  "w-1/2 justify-center relative shadow-[0_2px_5px_rgba(0,0,0,0.50)] border text-white hover:text-yellow-500 border-gray-600 min-h-8 max-h-8 items-center pt-2 bg-gradient-to-l from-gray-800 via-gray-800 to-gray-600 text-xs font-normal h-8 ",
                  !expirationDate && "text-muted-foreground"
                )}
              >
                <div className="absolute left-2 ">
                  <CalendarIcon size={15} />
                </div>
                {expirationDate ? (
                  <div className="flex-1 absolute right-2 items-center">
                    <p>{expirationDate}</p>
                  </div>
                ) : (
                  <div className="flex-1 h-full absolute right-0 left-0 top-[1px] flex justify-center items-center">
                    <span className=" text-xs">Fecha de caducidad</span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-gradient-to-t from-gray-800 via-gray-800 to-gray-600 text-white p-0">
              <Calendar
                mode="single"
                selected={expirationDate}
                onSelect={(e) => {
                  setExpirationDate(
                    format(e, "PPP", {
                      locale: es,
                    })
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-12 w-full flex justify-end items-center pr-2 space-x-2">
          <ButtonR
            width="w-20"
            height="h-7"
            bgColor="bg-gradient-to-l  from-gray-700 via-gray-700 to-gray-600"
            textSize="text-sm"
            onClick={() => {
              setReStock(false);
            }}
            title="Cancelar"
          />
          <ButtonR
            width="w-24"
            height="h-7"
            bgColor="bg-gradient-to-l  from-yellow-700 via-yellow-700 to-yellow-600"
            textSize="text-sm"
            title="Finalizar"
            onClick={endRestock}
          />
        </div>
      </div>
    </div>
  );
};

export default RestockForm;
