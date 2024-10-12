import React, { useEffect, useState } from "react";
import {
  articleData,
  depositType,
  storeType,
} from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../../../usefulFunctions";
import { MdArrowBack } from "react-icons/md";
import { isString } from "lodash";
import { IoIosHappy } from "react-icons/io";

type TransferArticlesProps = {
  informationToTransfer: {
    active: boolean;
    informationToTransfer: {
      fromDeposit: string;
      fromSector: string;
      articleToTransfer: string;
      saveCountUsed: string;
    };
  };
  onTransfer: (
    articleId: number,
    depositId: number,
    sectorId: number,
    quantity: number
  ) => void; // Función para ejecutar la transferencia
  onTransferArticle: (e: {
    active: boolean;
    informationToTransfer: {
      fromDeposit: string;
      fromSector: string;
      articleToTransfer: string;
    };
  }) => void;
};

const TransferArticles: React.FC<TransferArticlesProps> = ({
  informationToTransfer,
  onTransfer,
  onTransferArticle,
}) => {
  const [errorShow, setErrorShow] = useState<{
    active: boolean;
    error: string[];
    message: React.ReactNode;
  }>({
    active: false,
    error: [],
    message: <p></p>,
  });
  const [insufficientQuantity, setInsufficientQuantity] =
    useState<boolean>(false);
  //CANTIDAD A TRANSFERIR
  const [transferQuantity, setTransferQuantity] = useState<{
    quantity: string | number;
    active: string;
  }>({ quantity: "", active: "" }); // Cantidad predeterminada
  //
  const [informationOfArticle, setInformationOfArticle] = useState<{
    availableAmount: number;
    saveCount: string;
  }>({
    availableAmount: 0,
    saveCount: "",
  });
  //ESTADO POR CANTIDAD
  const [amountOptionSelect, setAmountOptionSelect] = useState<string>("unit");
  //
  const articles = useSelector((store: storeType) => store.articleState);
  //articulo a transferir
  const [articleToTransfer, setArticleToTransfer] = useState<articleData>();
  //DEPOSITOS DISPONIBLES
  const [deposits, setDeposits] = useState<depositType[]>([]);
  //DEPOSITO SELECCIONADO
  const [depositSelect, setDepositSelect] = useState<depositType>({
    name: "",
    address: "",
    sectors: [],
  });
  //array de opciones de deposito para el SelectM
  const [depositsToSelect, setDepositsToSelect] = useState<
    { value: string; label: string }[]
  >([]);
  const [fromDeposit, setFromDeposit] = useState<depositType>();
  //SECTOR SELECCIONADO
  const [successMessage, setsuccessMessage] = useState(false);

  //SECTOR DE SALIDA
  const [fromSector, setFromSector] = useState<{
    name: string;
    sectorId: string;
  }>({
    name: "",
    sectorId: "",
  });
  //SECTORES DEL DEPOSITO SELECCIONADO
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
  //ESTADO DE PROCESO DE TRANSFERENCIA
  const [processOfTransfer, setProcessOfTransfer] =
    useState<string>("SELECT_DEPOSIT");
  const selectionDeposit = (e: depositType) => {
    if (depositSelect.name !== e.name) {
      setDepositSelect(e);
      setSectors(e.sectors);
    } else {
      setDepositSelect({ name: "", address: "", sectors: [] });
      setSectors([]);
    }
    // setProcessOfTransfer("SELECT_SECTOR");
  };
  //VOLVER EN EL PROCESSO
  const backInProcess = () => {
    if (processOfTransfer === "QUANTITY_TRANSFER") {
      setProcessOfTransfer("SELECT_SECTOR");
    }
    if (processOfTransfer === "SELECT_SECTOR") {
      setSectorSelect({
        name: "",
        sectorId: "",
      });
      setProcessOfTransfer("SELECT_DEPOSIT");
    }
    return;
  };
  const nextInProcess = () => {
    if (depositSelect.name !== "") {
      if (processOfTransfer === "SELECT_DEPOSIT") {
        setProcessOfTransfer("SELECT_SECTOR");
      }
      if (processOfTransfer === "SELECT_SECTOR") {
        setProcessOfTransfer("QUANTITY_TRANSFER");
      }
      if (processOfTransfer === "QUANTITY_TRANSFER") {
        setProcessOfTransfer("FINALY_TRANSFER");
      }
    }
    return;
  };
  const selectionSector = (value: {
    name: string;
    sectorId: string;
    products: {
      article: articleData;
      amount: {
        value: number;
        saveCount: string;
      };
    }[];
  }) => {
    if (sectorSelect.name !== value.name) {
      setSectorSelect(value);
    } else {
      setSectorSelect({ name: "", sectorId: "" });
    }
  };
  //cambiar cantidad a transferir
  const onChangeQuantityToTransfer = (e: string, a: string) => {
    if (/^\d*$/.test(e)) {
      setTransferQuantity({ quantity: e, active: a });
    }
  };
  ////TRANSFERIR
  const onClickTransfer = () => {
    //   {
    //     fromDeposit: string;
    //     fromSector: string;
    //     article: articleData;
    //     amount: number;
    //     destiny: {
    //         depositId: string;
    //         sectorId: string;
    //     };
    // }
    console.log("INTENTANDO TRANSFERIR", {
      fromDeposit: fromDeposit._id,
      fromSector: fromSector.sectorId,
      article: articleToTransfer,
      amount: isString(transferQuantity.quantity)
        ? Number(transferQuantity.quantity)
        : transferQuantity.quantity,
      unitType: informationToTransfer.informationToTransfer.saveCountUsed,
      saveCountUsed: informationToTransfer.informationToTransfer.saveCountUsed,
      destiny: {
        depositId: depositSelect._id,
        sectorId: sectorSelect.sectorId,
      },
    });
    window.api.enviarEvento("transfer-article", {
      fromDeposit: fromDeposit._id,
      fromSector: fromSector.sectorId,
      article: articleToTransfer,
      amount: isString(transferQuantity.quantity)
        ? Number(transferQuantity.quantity)
        : transferQuantity.quantity,
      unitType: amountOptionSelect,
      saveCountUsed: informationToTransfer.informationToTransfer.saveCountUsed,
      destiny: {
        depositId: depositSelect._id,
        sectorId: sectorSelect.sectorId,
      },
    });
  };

  /////////////////
  //buscar articulo
  const findArticle = (e: string) => {
    console.log("BUSCANDO EN ARTICULOS", articles);
    const articlesAvailables = [...articles];

    const articleFound = articlesAvailables.find((article) => {
      console.log(article, "ARTICULOOOOSOOSOSOS", e);
      return article.code === e;
    });

    console.log("ARTICULO ENCONTRADO", articleFound);
    if (articleFound) {
      setArticleToTransfer(articleFound);
      getInformationToArticle(articleFound);
    }
  };
  //OBTENER INFORMACION DEL ARTICULO A TRANSFERIR
  const getInformationToArticle = async (article: articleData) => {};
  //buscar deposito
  const findDeposit = (e: string) => {
    console.log("BUSCANDO EN depositos", deposits);

    if (deposits.length > 0) {
      const depositsAvailables = [...deposits];

      const depositFound = depositsAvailables.find(
        (deposit) => deposit._id === e
      );

      if (depositFound) {
        setFromDeposit(depositFound);

        findSector(
          informationToTransfer.informationToTransfer.fromSector,
          depositFound
        );
        const sector = depositFound.sectors.find(
          (sector) =>
            sector.sectorId ===
            informationToTransfer.informationToTransfer.fromSector
        );
        console.log("FALOPABUENA", sector, depositFound);
        setFromSector({ sectorId: sector.sectorId, name: sector.name });
      }
    }
  };
  //BUSCANDO SECTOR EN DEPOSITO
  const findSector = (e: string, depositFound: depositType) => {
    if (depositFound) {
      const sector = depositFound.sectors.find((sec) => sec.sectorId === e);
      setFromSector(sector);
    }
  };

  const isQuantityValidForTransfer = (
    quantityToTransfer: number,
    quantityAvailable: number
  ) => {
    if (articleToTransfer) {
      const palletSize = articleToTransfer.article.pallet;
      const bulkSize = articleToTransfer.article.forBulk;

      let quantityNecessary = 0;
      if (amountOptionSelect === "XPalet") {
        quantityNecessary = quantityToTransfer;
        if (quantityNecessary > quantityAvailable) {
          return true;
        }
      } else if (amountOptionSelect === "xBulk") {
        quantityNecessary = quantityToTransfer;
        if (quantityNecessary > quantityAvailable) {
          return true;
        }
      } else {
        quantityNecessary = quantityToTransfer;
        if (quantityNecessary > quantityAvailable) {
          return true;
        }
      }
      return false;
    }
  };
  //CARGAR DEPOSITOS
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
  //CARGAR SECTORES
  const loadSectors = () => {
    const sectorsToLoad = sectors.map((sector) => {
      return {
        value: sector.sectorId ? sector.sectorId : sector.name.toLowerCase(),
        label: capitalizeFirstLetter(sector.name),
      };
    });
    setSectorsToSelect(sectorsToLoad);
  };
  //TAPAR O NO SIGUIENTEÇ
  const canProceed = () => {
    switch (processOfTransfer) {
      case "SELECT_DEPOSIT":
        return depositSelect.name !== ""; // Verifica si seleccionó un depósito
      case "SELECT_SECTOR":
        return sectorSelect.name !== ""; // Verifica si seleccionó un sector
      case "QUANTITY_TRANSFER":
        return (
          transferQuantity.quantity !== "" &&
          Number(transferQuantity.quantity) > 0
        ); // Verifica si ingresó una cantidad válida
      default:
        return false;
    }
  };

  const showSuccessMessage = () => {
    setsuccessMessage(true);
  };
  useEffect(() => {
    console.log(informationToTransfer, "INFORTMACIASODNAS DW");
    window.api.enviarEvento("get-deposits");

    window.api.recibirEvento("response-get-deposits", (e) => {
      console.log("DEPOSITOS OBTENIDOS", e);
      setDeposits([...e]);
    });

    window.api.recibirEvento("response-transfer-article", (res) => {
      console.log("RESPUESTA AL TRANSFERIR ARTICULOO", res);
      if (res.value) {
        showSuccessMessage();
      }
    });

    return () => {
      window.api.removeAllListeners("response-get-deposits");
    };
  }, []);

  useEffect(() => {
    findArticle(informationToTransfer.informationToTransfer.articleToTransfer);
    findDeposit(informationToTransfer.informationToTransfer.fromDeposit);
    setAmountOptionSelect(
      informationToTransfer.informationToTransfer.saveCountUsed
    );
    loadDeposits();
  }, [deposits]);

  useEffect(() => {
    loadSectors();
  }, [sectors]);
  useEffect(() => {
    setInsufficientQuantity(
      isQuantityValidForTransfer(
        Number(transferQuantity.quantity),
        informationOfArticle.availableAmount
      )
    );
  }, [transferQuantity.quantity]);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 backdrop-brightness-50 z-50 flex justify-center items-center">
      {successMessage ? (
        <div className="w-2/4 h-3/4 bg-[#2f2f2fff] flex flex-col rounded-md absolute z-50">
          <div className="flex flex-1 justify-center items-center">
            <div className="h-32 w-32">
              <IoIosHappy size={"%100"} className="text-green-400" />
            </div>
          </div>
          <div className="h-24 w-full text-3xl flex justify-center text-green-400">
            <p>Transferencia exitosa.</p>
          </div>
          <div className="h-8 w-full flex justify-center items-center">
            <ButtonR
              bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500"
              width="w-32"
              height="h-6"
              title="Aceptar"
              onClick={() =>
                onTransferArticle({
                  active: false,
                  informationToTransfer: {
                    fromDeposit: "",
                    fromSector: "",
                    articleToTransfer: "",
                  },
                })
              }
            />
          </div>
        </div>
      ) : null}
      {articleToTransfer ? (
        <div className="bg-[#2f2f2fff] rounded-md w-2/4 h-3/4 flex flex-col border border-gray-700">
          {/* HEAD */}
          <div className="w-full flex space-x-2 text-white text-lg px-2 border-b border-gray-600">
            <div className=" border-gray-600 pr-2 flex space-x-2 flex-1">
              <p className="text-sm font-thin">Transferir articulo</p>
              <div className="flex justify-center  text-sm flex-1">
                <p>{articleToTransfer?.article.name}</p>
              </div>
            </div>
          </div>
          <div className="h-7 flex w-full items-center my-2 relative justify-between px-2">
            <div className="relative">
              {processOfTransfer === "SELECT_DEPOSIT" ? (
                <div className="absolute z-40 top-0 left-0 bottom-0 right-0 bg-gray-600 rounded-lg opacity-50"></div>
              ) : null}
              <ButtonR
                bgIconColor="bg-gradient-to-l  from-gray-500 via-gray-600 to-gray-700"
                width="w-12"
                height="h-7"
                onClick={() => backInProcess()}
              >
                <MdArrowBack size={20} />
              </ButtonR>
            </div>
            {processOfTransfer === "QUANTITY_TRANSFER" ? (
              <div className="flex flex-col">
                <div>
                  <p className="text-[12px]">Transferir por</p>
                </div>
                <div className="flex-1 flex space-x-2">
                  {articleToTransfer.article.forBulk.active ? (
                    <ButtonR
                      width="w-14"
                      height="h-5"
                      bgColor={`${
                        amountOptionSelect === "xBulk"
                          ? "bg-yellow-500"
                          : "bg-gray-500 text-gray-600"
                      } text-xs `}
                      title="xBulto"
                      onClick={() => setAmountOptionSelect("xBulk")}
                    />
                  ) : null}
                  {articleToTransfer.article.pallet.active ? (
                    <ButtonR
                      width="w-14"
                      height="h-5"
                      bgColor={`${
                        amountOptionSelect === "xPalet"
                          ? "bg-yellow-500"
                          : "bg-gray-500 text-gray-600"
                      } text-xs `}
                      title="xPalet"
                      onClick={() => setAmountOptionSelect("xPalet")}
                    />
                  ) : null}

                  <ButtonR
                    width="w-14"
                    height="h-5"
                    bgColor={`${
                      amountOptionSelect === "unit"
                        ? "bg-yellow-500"
                        : "bg-gray-500 text-gray-600"
                    } text-xs `}
                    title={`x${articleToTransfer.article.stock.unit.abrevUnit}`}
                    onClick={() => setAmountOptionSelect("unit")}
                  />
                </div>
              </div>
            ) : null}
            <div className="relative">
              {!canProceed() && (
                <div className="absolute z-40 top-0 left-0 bottom-0 right-0 bg-gray-600 rounded-lg opacity-50"></div>
              )}
              <ButtonR
                bgColor="bg-gradient-to-l from-gray-500 via-gray-600 to-gray-700"
                width="w-32"
                height="h-7"
                onClick={() => {
                  nextInProcess();
                }}
                title="Siguiente"
              ></ButtonR>
            </div>
          </div>
          <div className="w-full flex justify-center bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 ">
            {processOfTransfer === "SELECT_DEPOSIT" ? (
              <p>Selecciona el Destino destino:</p>
            ) : processOfTransfer === "SELECT_SECTOR" ? (
              <p>Selecciona el sector:</p>
            ) : processOfTransfer === "QUANTITY_TRANSFER" ? (
              <p>
                Cantidad a transferir: disponible{" "}
                {informationOfArticle.availableAmount}
              </p>
            ) : null}
          </div>
          <div className="w-full flex-1 overflow-auto select-none">
            {processOfTransfer === "SELECT_DEPOSIT" ? (
              deposits.map((dep) => (
                <div
                  onClick={() => selectionDeposit(dep)}
                  className={`relative h-14 text-lg flex items-center justify-center w-full bg-gradient-to-l  ${
                    depositSelect.name === dep.name
                      ? "from-yellow-800 via-yellow-700 to-yellow-500 "
                      : "from-gray-700 via-gray-700 to-gray-500"
                  } text-[#fff8dcff] border-b border-gray-600 `}
                >
                  <div className="flex-1 flex justify-center items-center ">
                    <div
                      className={`top-0 bottom-0 left-0 right-0 z-10 absolute hover:backdrop-brightness-150 active:backdrop-brightness-75 cursor-pointer  `}
                    ></div>
                    <p>{dep.name}</p>
                  </div>
                </div>
              ))
            ) : processOfTransfer === "SELECT_SECTOR" ? (
              sectors.map((sec) => (
                <div
                  onClick={() => {
                    selectionSector(sec);
                  }}
                  className={`relative h-14 text-lg flex items-center justify-center w-full bg-gradient-to-l  ${
                    sectorSelect.name === sec.name
                      ? "from-yellow-800 via-yellow-700 to-yellow-500 "
                      : "from-gray-700 via-gray-700 to-gray-500"
                  } text-[#fff8dcff] border-b border-gray-600 `}
                >
                  <div className="flex-1 flex justify-center items-center ">
                    <div className="top-0 bottom-0 left-0 right-0 z-10 absolute hover:backdrop-brightness-150 active:backdrop-brightness-75 cursor-pointer"></div>
                    <p>{sec.name}</p>
                  </div>
                </div>
              ))
            ) : processOfTransfer === "QUANTITY_TRANSFER" ? (
              [
                <div
                  onClick={() => {
                    if (transferQuantity.active !== "SPECIFY_QUANTITY") {
                      onChangeQuantityToTransfer("0", "SPECIFY_QUANTITY");
                    } else {
                      onChangeQuantityToTransfer("", "");
                    }
                  }}
                  className={`relative h-14 text-lg flex items-center justify-center w-full bg-gradient-to-l  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] border-b border-gray-600 ${
                    transferQuantity.active === "SPECIFY_QUANTITY"
                      ? "bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 "
                      : "bg-transparent"
                  }`}
                >
                  <div className="top-0 bottom-0 left-0 right-0 z-10 absolute hover:backdrop-brightness-150 active:backdrop-brightness-75 cursor-pointer"></div>
                  <div
                    className={`w-full h-full flex justify-center items-center`}
                  >
                    <input
                      type="text"
                      className={`outline-none bg-transparent text-center ${
                        insufficientQuantity ? "text-red-500" : "text-white"
                      } w-fit h-full rounded-lg pl-2 text-sm  relative z-30 `}
                      value={
                        transferQuantity.active === "SPECIFY_QUANTITY"
                          ? transferQuantity.quantity
                          : "0"
                      }
                      onChange={(e) =>
                        onChangeQuantityToTransfer(
                          e.target.value,
                          "SPECIFY_QUANTITY"
                        )
                      }
                    />
                  </div>
                </div>,
                <div
                  onClick={() => {
                    if (transferQuantity.active !== "ALL_QUANTITY") {
                      onChangeQuantityToTransfer(
                        `${informationOfArticle.availableAmount}`,
                        "ALL_QUANTITY"
                      );
                    } else {
                      onChangeQuantityToTransfer("", "");
                    }
                  }}
                  className={`relative h-14 text-lg cursor-pointer flex items-center justify-center w-full bg-gradient-to-l  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] border-b border-gray-600 ${
                    transferQuantity.active === "ALL_QUANTITY"
                      ? "bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 "
                      : "bg-transparent"
                  }`}
                >
                  <div>
                    <p>Todo</p>
                  </div>
                </div>,
              ]
            ) : processOfTransfer === "FINALY_TRANSFER" ? (
              <div className="h-full w-full flex flex-col ">
                <div className="w-full text-3xl flex justify-center border-b border-gray-600">
                  <p>Destino</p>
                </div>
                <div className="w-full flex justify-center border-b border-gray-600 ">
                  <div className="text-lg flex w-full space-x-2 px-2">
                    <span className=" flex items-center w-36">Deposito</span>{" "}
                    <span className="flex border-l border-gray-600 flex-1 justify-start pl-2">
                      {depositSelect.name}
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-center border-b border-gray-600 ">
                  <div className="text-lg flex w-full space-x-2 px-2">
                    <span className=" flex items-center w-36">Sector</span>{" "}
                    <span className="flex border-l border-gray-600 flex-1 justify-start pl-2">
                      {sectorSelect.name}
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-center border-b border-gray-600 ">
                  <div className="text-lg flex w-full space-x-2 px-2">
                    <span className=" flex items-center w-36">Cantidad</span>{" "}
                    <span className="flex border-l border-gray-600 flex-1 justify-start pl-2">
                      {transferQuantity.quantity}
                    </span>
                  </div>
                </div>
                <div className="w-full h-32 flex justify-center items-center">
                  <ButtonR
                    width="w-32"
                    height="h-12"
                    bgColor="bg-yellow-500"
                    title="Transferir"
                    onClick={() => onClickTransfer()}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {/*<div className="flex flex-1">
            <div className="flex flex-col flex-1 w-96">
              <div className="w-full">
                <label htmlFor="destinyDeposit">Destino</label>
                <SelectM
                  todos={false}
                  options={depositsToSelect}
                  onChangeSelection={selectionDeposit}
                  className={`bg-gradient-to-l h-8 w-1/2 from-[#505050ff] via-[#505050ff] to-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] font-thin text-sm ${
                    errorShow.error.includes("NO-DEPOSIT-SELECTED")
                      ? "shadow-inner shadow-red-500"
                      : ""
                  }`}
                  placeholder="Deposito"
                  slice={-1}
                  value={depositSelect?.name ? depositSelect.name : ""}
                />
              </div>
              <div className="flex space-x-5">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="destinySector">Sector</label>
                  <SelectM
                    todos={false}
                    options={sectorsToSelect}
                    onChangeSelection={selectionSector}
                    className={`bg-gradient-to-l h-8 w-full from-[#505050ff] via-[#505050ff] to-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] font-thin text-sm ${
                      errorShow.error.includes("NO-SECTOR-SELECTED")
                        ? "shadow-inner shadow-red-500"
                        : ""
                    }`}
                    placeholder="Sector"
                    slice={-1}
                    value={sectorSelect?.name ? sectorSelect.name : ""}
                  />
                </div>
                <div className="">
                  <div>
                    <p>Cantidad</p>
                    <div className="flex shadow-[0_2px_5px_rgba(0,0,0,0.50)] bg-[#707070ff] rounded-md">
                      <input
                        type="text"
                        className={`outline-none bg-[#707070ff] ${
                          insufficientQuantity ? "text-red-500" : ""
                        } w-24 h-8 rounded-l-lg pl-2 text-sm border-l border-y border-gray-600 `}
                        value={transferQuantity}
                        onChange={(e) =>
                          onChangeQuantityToTransfer(e.target.value)
                        }
                      />
                      <SelectM
                        todos={false}
                        options={
                          getOptionXAmount() || [
                            {
                              value: "",
                              label: "",
                            },
                          ]
                        }
                        onChangeSelection={selectXAmountOption}
                        className="bg-gradient-to-l from-[#505050ff] via-[#707070ff] to-[#707070ff] h-8 w-28 border-gray-600 font-thin text-sm rounded-l-none"
                        placeholder=""
                        slice={-1}
                        value={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-32 h-full flex flex-col ">
              <div className="w-full flex justify-center border-b border-gray-600">
                <p className="text-xs ">En este sector</p>
              </div>
              <div className="w-full flex border-l border-gray-600 flex-col items-center">
                <Stack size={30} />
                <p className="text-xs">
                  {informationOfArticle.availableAmount}
                  <span>{informationOfArticle.saveCount.toLowerCase()}</span>
                </p>
              </div>
            </div>
          </div>*/}
          <div className="w-full flex justify-end space-x-2">
            <ButtonR
              bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
              width="w-24"
              height="h-6"
              title="Cancelar"
              textSize="text-sm"
              onClick={() =>
                onTransferArticle({
                  active: false,
                  informationToTransfer: {
                    fromDeposit: "",
                    fromSector: "",
                    articleToTransfer: "",
                  },
                })
              }
            ></ButtonR>
            {/* <ButtonR
              bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500"
              width="w-24"
              height="h-6"
              title="Transferir"
              textSize="text-sm"
            ></ButtonR> */}
          </div>
        </div>
      ) : (
        <div>
          <p>PORONGA</p>
        </div>
      )}
    </div>
  );
};

export default TransferArticles;
