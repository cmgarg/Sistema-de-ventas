import React, { useEffect, useState } from "react";
import {
  Action,
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import SelectM from "../../../../../Select/Select";
import { capitalizeFirstLetter } from "../../../../../../../../usefulFunctions";
import CreateSector from "./CreateSector";
import ButtonR from "../../../../../buttons/ButtonR";

type EstablishDepositProps = {
  deposits: depositType[];
  dispatchDeposit: React.Dispatch<Action>;
  alternEstablishDepositForm: (e: boolean) => void;
  onChangeCreateDeposit: (e: boolean) => void;
  stateArticle: articleData;
  depositState: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
      amount: {
        value: number;
        saveCount: string;
      };
    };
  }[];
};

const EstablishDeposit: React.FC<EstablishDepositProps> = ({
  deposits,
  dispatchDeposit,
  alternEstablishDepositForm,
  onChangeCreateDeposit,
  stateArticle,
  depositState,
}) => {
  //GENERADOR DE ID
  const [errorShow, setErrorShow] = useState<{
    active: boolean;
    error: string[];
    message: React.ReactNode;
  }>({
    active: false,
    error: [],
    message: <p></p>,
  });
  const [articleAmountAvailable, setArticleAmountAvailable] =
    useState<number>(0);
  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  const [stockInnsuficient, setStockInnsuficient] = useState<boolean>(false);
  //ESTADO DEL FORMULARIO PARA CREAR SECTOR
  const [sectorCreateForm, setSectorCreateForm] = useState(false);
  //DEPOSIT TO ESTABLISH
  const [depositToEstablish, setDepositToEstablish] = useState({
    idObject: "",
    name: "",
    depositId: "",
    address: "",
    sector: {
      name: "",
      sectorId: "",
      amount: {
        value: 0,
        saveCount: "",
      },
    },
  });
  //DEPOSITO ESTADOS

  const [depositSelect, setDepositSelect] = useState<depositType>({
    name: "",
    address: "",
    sectors: [],
  });
  const [depositsToSelect, setDepositsToSelect] = useState<
    { value: string; label: string }[]
  >([]);
  //ESTADO POR CANTIDAD
  const [amountOptionSelect, setAmountOptionSelect] = useState();

  const getOptionXAmount = () => {
    const optionsXAmount = [
      {
        label: stateArticle.article.stock.unit.label,
        value: stateArticle.article.stock.unit.label,
      },
    ];

    const forBulkActive = stateArticle.article.forBulk;
    const forPalletActive = stateArticle.article.pallet;
    if (forBulkActive.active) {
      optionsXAmount.push({ label: "Bultos", value: "xBulk" });
    }
    if (forPalletActive.active) {
      optionsXAmount.push({ label: "Palets", value: "xPalet" });
    }

    return optionsXAmount;
  };
  const selectXAmountOption = (e: any) => {
    setAmountOptionSelect(e);
    setDepositToEstablish({
      ...depositToEstablish,
      sector: {
        ...depositToEstablish.sector,
        amount: {
          ...depositToEstablish.sector.amount,
          saveCount: e,
        },
      },
    });
  };
  //ESTADOS SECTORES
  const [sectors, setSectors] = useState<
    {
      name: string;
      sectorId: string;
      products: {
        article: articleData;
        amount: {
          value: number;
          saveCount: string;
        };
      }[];
    }[]
  >([]);
  const [sectorsToSelect, setSectorsToSelect] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [sectorSelect, setSectorSelect] = useState<{
    name: string;
    sectorId: string;
  }>({ name: "", sectorId: "" });
  //FUNCIONES DEPOSITOS
  //obteniendo depositos de la base de datos
  //al seleccionar un deposito
  const selectionDeposit = (value: string) => {
    const depositSelect = deposits.find(
      (deposit) => deposit._id === value || deposit.name === value
    );
    if (depositSelect) {
      setDepositSelect(depositSelect);
      setSectors([...depositSelect.sectors]);
      setDepositToEstablish({
        idObject: generateId(),
        name: depositSelect.name,
        depositId: depositSelect._id ? depositSelect._id : "",
        address: depositSelect.address,
        sector: {
          name: "",
          sectorId: "",
          amount: {
            value: 0,
            saveCount: "",
          },
        },
      });
    }
  };
  //al seleccionar un sector
  const selectionSector = (value: string) => {
    const sectorSelect = sectors.find((sector) => sector.sectorId === value);
    if (sectorSelect) {
      setDepositToEstablish({
        ...depositToEstablish,
        sector: {
          sectorId: sectorSelect.sectorId,
          name: sectorSelect.name,
          amount: {
            value: 0,
            saveCount: "",
          },
        },
      });
    }
  };
  const onChangeAmountOfArticleInSector = (e: string) => {
    if (depositToEstablish.sector.sectorId) {
      setDepositToEstablish({
        ...depositToEstablish,
        sector: {
          ...depositToEstablish.sector,
          amount: {
            ...depositToEstablish.sector.amount,
            value: parseInt(e),
          },
        },
      });
    }
  };
  const verifStockAvailable = () => {
    let e = depositToEstablish.sector.amount.value;
    const forBulkActive = stateArticle.article.forBulk;
    const forPalletActive = stateArticle.article.pallet;
    let amountToUse = e;
    if (amountOptionSelect === "xBulk") {
      amountToUse = e * forBulkActive.value;
    }
    if (amountOptionSelect === "xPalet") {
      amountToUse = e * forPalletActive.value;
    }
    if (amountToUse > articleAmountAvailable) {
      setStockInnsuficient(true);
      setErrorShow({
        ...errorShow,
        message:
          amountOptionSelect === "xPalet" ? (
            <div className="flex flex-col">
              <p>Stock insuficiente</p>
              <span className="text-yellow-500">
                Palets disponibles{" "}
                {articleAmountAvailable / stateArticle.article.pallet.value}{" "}
              </span>
            </div>
          ) : amountOptionSelect === "xBulk" ? (
            <div className="flex flex-col">
              <p>Stock insuficiente</p>
              <span className="text-yellow-500">
                Bultos disponibles{" "}
                {articleAmountAvailable / stateArticle.article.forBulk.value}{" "}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <p>Stock insuficiente</p>
              <span className="text-yellow-500">
                Disponible {articleAmountAvailable}
              </span>
            </div>
          ),
      });
    } else {
      setStockInnsuficient(false);
    }
  };
  const loadDeposits = () => {
    const depositsToLoad = deposits.map((deposit) => {
      return {
        value: deposit._id ? deposit._id : deposit.name.toLowerCase(),
        label: capitalizeFirstLetter(deposit.name),
      };
    });
    if (depositsToLoad) {
      setDepositsToSelect(depositsToLoad);
    }
  };
  const loadSectors = () => {
    const sectorsToLoad = sectors.map((sector) => {
      return {
        value: sector.sectorId ? sector.sectorId : sector.name.toLowerCase(),
        label: capitalizeFirstLetter(sector.name),
      };
    });
    setSectorsToSelect(sectorsToLoad);
  };
  //ACTUALIZAR SECOTORES
  const updateSectors = (
    e: {
      name: string;
      sectorId: string;
      products: {
        article: articleData;
        amount: {
          value: number;
          saveCount: string;
        };
      }[];
    }[]
  ) => {
    return setSectors([...e]);
  };
  //ESTABLECER DEPOSITO,
  const establishDeposit = () => {
    const errors = [];
    if (!stockInnsuficient) {
      if (!depositToEstablish.name) {
        errors.push("NO-DEPOSIT-SELECTED");
      } else if (!depositToEstablish.sector.name) {
        errors.push("NO-SECTOR-SELECTED");
      } else {
        dispatchDeposit({ type: "ADD_DEPOSIT", payload: depositToEstablish });

        alternEstablishDepositForm(false);
      }
    } else {
      errors.push("INNSUFICIENT-STOCK");
    }
    if (stockInnsuficient) {
      errors.push("INNSUFICIENT-STOCK");
    }

    if (errors.length > 0) {
      setErrorShow({
        ...errorShow,
        active: true,
        error: errors,
      });
    }
  };
  //ALTERNAR FORMULARIO PARA CREAR SECTORES
  const alternSectorCreateForm = (e: boolean) => {
    setSectorCreateForm(e);
  };
  useEffect(() => {
    loadDeposits();
  }, [deposits]);
  useEffect(() => {
    loadSectors();
  }, [sectors]);
  useEffect(() => {
    console.log("DEPOSITO A AESTABLECER", depositToEstablish);
    verifStockAvailable();
  }, [depositToEstablish, amountOptionSelect]);

  //TERMINAR DE SUMAR LA CANTIDAD DE USADO EN STOCK DE DEPOSITOS DALEEEE
  useEffect(() => {
    if (depositState.length > 0) {
      let totalUsed = 0;

      depositState.map((dep) => {
        let multiplier =
          dep.sector.amount.saveCount === "xPalet"
            ? stateArticle.article.pallet.value
            : dep.sector.amount.saveCount === "xBulk"
            ? stateArticle.article.forBulk.value
            : 1;
        return (totalUsed += dep.sector.amount.value * multiplier);
      });
      let available = stateArticle.article.stock.amount - totalUsed;
      setArticleAmountAvailable(available);
      console.log(totalUsed, "TOTAL USADO", available, "DISPONIBLE");
    } else {
      setArticleAmountAvailable(stateArticle.article.stock.amount);
    }
  }, []);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-brightness-50 z-40">
      {sectorCreateForm && (
        <CreateSector
          depositSelect={depositSelect}
          onChangeCreateSector={alternSectorCreateForm}
          updateSectors={updateSectors}
        />
      )}
      {errorShow.error.includes("INNSUFICIENT-STOCK") ? (
        <div className="absolute flex justify-center items-center top-0 bottom-0 right-0 left-0 z-50">
          <div className="z-50 h-64 w-80 flex justify-center items-center rounded-xl bg-black bg-opacity-50">
            <div className="w-52 h-32 absolute flex-col z-50 bg-black rounded-lg flex justify-center items-center opacity-100">
              {errorShow.message}
              <div className="z-50 absolute bottom-1 right-2">
                <ButtonR
                  onClick={() =>
                    setErrorShow({
                      active: false,
                      error: [],
                      message: <p></p>,
                    })
                  }
                  width="w-14"
                  height="h-5"
                  title="Aceptar"
                  bgColor="bg-yellow-500 text-xs text-black"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col p-2 w-80 bg-[#2f2f2fff] rounded-lg border border-slate-700 relative space-y-2 ">
        <div className="flex flex-col justify-evenly relative space-y-2">
          <div className="flex w-full justify-between">
            <div>
              <p>Deposito</p>
            </div>
            <ButtonR
              onClick={() => onChangeCreateDeposit(true)}
              bgColor={`bg-gradient-to-l h-7 w-full  from-gray-700 via-gray-700 to-gray-500 text-xs `}
              title="Crear deposito"
              height="h-5"
              width="w-28"
            ></ButtonR>
          </div>

          <SelectM
            todos={false}
            options={depositsToSelect}
            onChangeSelection={selectionDeposit}
            className={`bg-gradient-to-l h-7 w-full from-gray-700 via-gray-700 to-gray-500 shadow-[0_2px_5px_rgba(0,0,0,0.50)] font-thin text-sm ${
              errorShow.error.includes("NO-DEPOSIT-SELECTED")
                ? "shadow-inner shadow-red-500"
                : ""
            }`}
            placeholder="Deposito"
            slice={-1}
            value={depositSelect?.name ? depositSelect.name : ""}
          />
        </div>
        <div
          className={`flex flex-col justify-evenly relative ${
            !depositSelect.name && !depositSelect.address && "opacity-35"
          }`}
        >
          {!depositSelect.name && !depositSelect.address && (
            <div className="absolute top-0 right-0 bottom-0 left-0 z-50"></div>
          )}
          <div className="flex pb-2 justify-between">
            <div>
              <p>Sector</p>
            </div>
            <ButtonR
              onClick={() => alternSectorCreateForm(true)}
              bgColor="bg-gradient-to-l  from-gray-700 via-gray-700 to-gray-500 text-xs"
              title="Crear Sector"
              height="h-5"
              width="w-28"
            ></ButtonR>
          </div>

          <SelectM
            todos={false}
            options={sectorsToSelect}
            onChangeSelection={selectionSector}
            className={`bg-gradient-to-l h-7 w-full  from-gray-700 via-gray-700 to-gray-500 shadow-[0_2px_5px_rgba(0,0,0,0.50)] font-thin text-sm ${
              errorShow.error.includes("NO-SECTOR-SELECTED")
                ? "shadow-inner shadow-red-500"
                : ""
            }`}
            placeholder="Sector"
            slice={-1}
            value={sectorSelect?.name ? sectorSelect.name : ""}
          />
          <div
            className={`flex-1 flex flex-col ${
              depositToEstablish.sector.name === "" ? "opacity-50" : ""
            }`}
          >
            <label htmlFor="amountArticleInSector">Cantidad</label>
            <div className="relative w-fit flex shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
              <input
                name="amountArticleInSector"
                type="text"
                value={
                  depositToEstablish.sector.amount.value
                    ? depositToEstablish.sector.amount.value
                    : ""
                }
                disabled={depositToEstablish.sector.name === ""}
                onChange={(e) =>
                  onChangeAmountOfArticleInSector(e.target.value)
                }
                className={`bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 border-r-4 border-gray-600 pl-1 h-7 w-24 rounded-l-md outline-none  ${
                  stockInnsuficient === true ? "text-red-500" : ""
                }`}
              />
              <div className="flex justify-center items-center relative">
                <div
                  className={`${
                    depositToEstablish.sector.name === ""
                      ? "absolute top-0 right-0 left-0  bottom-0 z-50"
                      : null
                  }`}
                ></div>
                <SelectM
                  todos={false}
                  options={getOptionXAmount()}
                  onChangeSelection={selectXAmountOption}
                  className="bg-gray-700 border-none h-7 w-20   font-thin text-sm rounded-l-none"
                  placeholder=""
                  slice={-1}
                  value={""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex space-x-2 rounded-b-lg justify-end">
          <ButtonR
            onClick={() => alternEstablishDepositForm(false)}
            width="w-28"
            height="h-7"
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-sm"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            onClick={establishDeposit}
            width="w-32"
            height="h-7"
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-sm"
            title="
            Establecer"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default EstablishDeposit;
