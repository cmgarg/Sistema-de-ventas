import React, { useEffect, useState } from "react";
import { articleData, depositType } from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";
import { BiEdit, BiEditAlt, BiSave, BiTransfer } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { IoAdd } from "react-icons/io5";
import { isEqual } from "lodash";
import CreateSector from "./CreateSector";
import TransferArticles from "./TransferArticles";
type DepositDetailsProps = {
  deposit: depositType; // Define tus props aquí
  onChangeModalDepositToSee: (e: {
    active: boolean;
    deposit: depositType;
  }) => void;
};

const DepositDetails: React.FC<DepositDetailsProps> = ({
  deposit,
  onChangeModalDepositToSee,
}) => {
  //QUE NO SE CIERRE SI NO ESTAN GUARDADO LOS CAMBIOS
  const [safeSave, setSafeSave] = useState(false);
  //avisar de que guarde primero o opcion de cerrar y guardar
  //ESTADO PARA VER SI EL DEPOSITO A SIDO MODIFICADO, SI ES TRUE MUESTRA UN BOTON DE GUARDADO.
  const [changeExist, setChangeExist] = useState<boolean>(false);
  const [initialDepositState, setInitialDepositState] = useState({
    ...deposit,
  });
  //RESTAURAR CAMBIOS
  const restoreChanges = () => {
    setDepositData(initialDepositState);
    setSafeSave(false);
  };

  // ESTADO CON EL VALOR INICIAL DEL DEPOSITO SELECCIONADO
  const [depositData, setDepositData] =
    useState<depositType>(initialDepositState);
  //ESTADO DE FORMULARIO PARA CREAR SECTORES
  const [createSectorForm, setCreateSectorForm] = useState<boolean>(false);
  //ESTADO DEL SECTOR SELECCIONADO PARA MOSTRAR LOS PRODUCTOS EN EL EN PANTALLA.
  const [sectorSelected, setSectorSelected] = useState<{
    name: string;
    sectorId: string;
    products: {
      article: articleData;
      amount: {
        value: number;
        saveCount: string;
      };
    }[];
  }>({
    name: "",
    sectorId: "",
    products: [],
  });
  //TRANSFERIR ARTICULOS FORM
  const [transferArticle, setTransferArticle] = useState<{
    active: boolean;
    informationToTransfer: {
      fromDeposit: string;
      fromSector: string;
      articleToTransfer: string;
    };
  }>({
    active: false,
    informationToTransfer: {
      fromDeposit: depositData._id ? depositData._id : depositData.name,
      fromSector: sectorSelected.sectorId,
      articleToTransfer: "",
    },
  });
  const onTransferArticle = (e: {
    active: boolean;
    informationToTransfer: {
      fromDeposit: string;
      fromSector: string;
      articleToTransfer: string;
    };
  }) => {
    console.log(e, "INFORMACION PARA TRANSFERIR");
    setTransferArticle(e);
  };
  //FUNCION PARA CAMBIAR EL ESTADO SECTORSELECTED
  const selectSector = (sector: {
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
    setSectorSelected(sector);
  };
  //FUNCION PARA GUARDAR CAMBIOS EXISTENTES
  const saveChangeExist = () => {
    window.api.enviarEvento("update-deposit", depositData);
  };
  //FUNCION PARA INSERTAR SECTORES NUEVOS
  const addNewSector = (sector: {
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
    const sectors = [...depositData.sectors];

    sectors.push(sector);
    setDepositData({ ...depositData, sectors });
    createSectorOn(false);
  };
  //CREAR SECTOR FORM
  const createSectorOn = (e: boolean) => {
    setCreateSectorForm(e);
  };
  //CLOSE DETAILS
  const closeDetails = () => {
    if (changeExist) {
      setSafeSave(true);

      setTimeout(() => {
        setSafeSave(false);
      }, 1000);
    } else {
      onChangeModalDepositToSee({
        active: false,
        deposit: {
          name: "",
          address: "",
          sectors: [],
        },
      });
    }
  };
  //BORRAR SECTOR
  const deleteSector = (e: {
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
    const sectors = [...depositData.sectors];
    const newSecotrs = sectors.filter((sec) => {
      return sec.sectorId !== e.sectorId && sec.name !== e.name;
    });

    setDepositData({ ...depositData, sectors: newSecotrs });
  };
  useEffect(() => {
    //SI EL DEPOSITO A SIDO MODIFICADO ACTIVA EL BOTON DE GUARDADO.
    console.log(
      depositData,
      initialDepositState,
      "SE FALOPEA ESTO?",
      isEqual(depositData, initialDepositState)
    );
    if (!isEqual(depositData, initialDepositState)) {
      console.log(sectorSelected);
      setChangeExist(true);
    } else {
      setChangeExist(false);
    }
  }, [depositData]);

  useEffect(() => {
    console.log("FALOPA");
    window.api.recibirEvento("response-update-deposit", (res: any) => {
      console.log("SE ACTUALIZO?", res);
      if (res.succes) {
        setInitialDepositState({ ...res.depositUpdated });
        setDepositData({ ...res.depositUpdated });
        window.api.enviarEvento("get-deposits");
        console.log(
          "SE ACTUALIZO CORRECTAMENTE",
          res,
          initialDepositState,
          "U",
          depositData
        );
      }
    });
  }, []);

  return (
    <div className="flex absolute top-0 left-0 right-0 bottom-0 z-50 backdrop-brightness-50 justify-center items-center">
      <div className="w-3/4 h-3/4 bg-[#2f2f2fff] rounded-l flex  relative">
        {transferArticle.active ? (
          <TransferArticles
            informationToTransfer={transferArticle}
            onTransfer={() => {}}
          />
        ) : null}
        {changeExist ? (
          <div
            className={`absolute right-5 bottom-10 flex space-y-2 justify-end items-end flex-col transition-all ${
              safeSave ? "scale-105 -rotate-3" : ""
            }`}
          >
            <ButtonR
              height="h-7"
              width="w-32"
              bgIconColor="bg-gray-700"
              bgColor={`${
                safeSave
                  ? "bg-yellow-500"
                  : "bg-gradient-to-l font-thin from-gray-700 via-gray-700 to-gray-500 "
              } text-[10px] transition-all`}
              title="Deshacer cambios"
              onClick={restoreChanges}
            ></ButtonR>
            <ButtonR
              height="h-7"
              width="w-36"
              bgIconColor="bg-gray-700"
              bgColor={`${
                safeSave
                  ? "bg-red-500"
                  : "bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 "
              } text-[11px] font-thin transition-all`}
              title="Guardar cambios"
              onClick={saveChangeExist}
            >
              <BiSave size={20} className="text-yellow-500" />
            </ButtonR>
          </div>
        ) : null}
        {createSectorForm ? <CreateSector addNewSector={addNewSector} /> : null}
        <div className="flex-1 flex flex-col">
          <div className="w-full text-white text-2xl flex space-x-2">
            <span className="border-r border-gray-600 px-2 font-thin">
              Deposito{" "}
            </span>
            <p>{depositData.name}</p>
            <ButtonR
              bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
              height="h-7"
              width="w-7"
            >
              <BiEditAlt size={20} />
            </ButtonR>
          </div>
          <div className="flex flex-1 p-2">
            <div className="flex-1 flex shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
              <div className="h-full w-52 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-950 overflow-auto">
                <div className="w-full h-12 flex justify-between px-2 items-center text-white">
                  <p>Sectores</p>
                  <ButtonR
                    bgIconColor="bg-gradient-to-l from-green-800 via-green-700 to-green-500"
                    height="h-5"
                    width="w-5"
                    biñeta="Crear sector"
                    onClick={() => createSectorOn(true)}
                  >
                    <IoAdd size={20} />
                  </ButtonR>
                </div>
                {depositData.sectors.map((sect) => (
                  <div
                    onClick={() => selectSector(sect)}
                    className={`w-full hover:backdrop-brightness-200 ${
                      sect.name === sectorSelected.name
                        ? "bg-yellow-400 text-black"
                        : "text-white"
                    } cursor-pointer  flex justify-between px-2 items-center border-b border-gray-700 `}
                  >
                    <p>{sect.name}</p>
                    <ButtonR
                      onClick={() => deleteSector(sect)}
                      bgIconColor="bg-gradient-to-tl  from-red-950 via-red-950 to-red-700"
                      width="w-5"
                      height="h-5"
                    >
                      <TbTrash size={15} />
                    </ButtonR>
                  </div>
                ))}
              </div>
              <div className="flex-1 h-full border-l border-gray-700 bg-black rounded-r-lg text-white">
                <div className="w-full h-12 flex justify-center border-b-4 border-gray-600 flex-col">
                  <div className="w-full flex justify-center bg-gray-950">
                    <p>Productos ({sectorSelected.products.length})</p>
                  </div>
                  <div className="flex justify-between px-2 text-xs bg-transparent">
                    <p>Articulo</p>
                    <p>Cantidad</p>
                    <p>Transferir</p>
                  </div>
                </div>
                {sectorSelected.products.length > 0 ? (
                  sectorSelected.products.map((prod) => (
                    <div className="w-full flex justify-between h-7 px-2 border-b border-gray-600">
                      <div className="flex flex-1 justify-start items-center">
                        <p>{prod.article.article.name}</p>
                      </div>

                      <div className="flex flex-1 justify-center items-center">
                        <p>
                          {prod.amount.value}
                          {prod.amount.saveCount ||
                            prod.article.article.stock.unit.abrevUnit.toLowerCase()}
                        </p>
                      </div>
                      <div className="h-full flex-1 flex justify-end items-center">
                        <ButtonR
                          width="w-5"
                          height="h-5"
                          bgIconColor="bg-yellow-500"
                          onClick={() => {
                            console.log(prod, "POPOPOPOPOPOPOPO");
                            onTransferArticle({
                              active: true,
                              informationToTransfer: {
                                fromDeposit: depositData._id,
                                articleToTransfer: prod.article.code,
                                fromSector: sectorSelected.sectorId,
                              },
                            });
                          }}
                        >
                          <BiTransfer size={15} className="text-black" />
                        </ButtonR>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-1 h-full w-full justify-center items-center text-gray-400">
                    <p>No hay productos</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-40 p-2 flex">
          <div className="flex-1 flex justify-end">
            <ButtonR
              bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-xs"
              height="h-5"
              width="w-36"
              title="Eliminar deposito"
              biñeta="Crear sector"
            >
              <TbTrash size={15} />
            </ButtonR>
          </div>
          <div className="flex-1 flex justify-end absolute right-2 bottom-2">
            <ButtonR
              bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-xs"
              height="h-5"
              width="w-24"
              title="Cerrar"
              biñeta="Crear sector"
              onClick={closeDetails}
            ></ButtonR>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositDetails;
