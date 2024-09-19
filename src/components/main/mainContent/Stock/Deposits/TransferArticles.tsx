import React, { useEffect, useState } from "react";
import {
  articleData,
  depositType,
  storeType,
} from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";
import { useSelector } from "react-redux";
import { BiTransfer } from "react-icons/bi";

type TransferArticlesProps = {
  informationToTransfer: {
    active: boolean;
    informationToTransfer: {
      fromDeposit: string;
      fromSector: string;
      articleToTransfer: string;
    };
  };
  onTransfer: (
    articleId: number,
    depositId: number,
    sectorId: number,
    quantity: number
  ) => void; // Función para ejecutar la transferencia
};

const TransferArticles: React.FC<TransferArticlesProps> = ({
  informationToTransfer,
  onTransfer,
}) => {
  const articles = useSelector((store: storeType) => store.articleState);
  //articulo a transferir
  const [articleToTransfer, setArticleToTransfer] = useState<articleData>();
  //DEPOSITOS DISPONIBLES
  const [deposits, setDeposits] = useState<depositType[]>([]);
  const [fromDeposit, setFromDeposit] = useState<depositType>();
  const [selectedDeposit, setSelectedDeposit] = useState<number>();
  const [selectedSector, setSelectedSector] = useState<number>();
  const [transferQuantity, setTransferQuantity] = useState<number>(0); // Cantidad predeterminada
  const [fromSector, setFromSector] = useState<{
    name: string;
    sectorId: string;
  }>({
    name: "",
    sectorId: "",
  });

  const handleTransfer = () => {};
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
    }
  };
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
  useEffect(() => {
    console.log(informationToTransfer, "INFORTMACIASODNAS DW");
    window.api.enviarEvento("get-deposits");

    window.api.recibirEvento("response-get-deposits", (e) => {
      console.log("DEPOSITOS OBTENIDOS", e);
      setDeposits([...e]);
    });

    return () => {
      window.api.removeAllListeners("response-get-deposits");
    };
  }, []);

  useEffect(() => {
    findArticle(informationToTransfer.informationToTransfer.articleToTransfer);
    findDeposit(informationToTransfer.informationToTransfer.fromDeposit);
  }, [deposits]);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 backdrop-brightness-50 flex justify-center items-center">
      <div className="bg-[#2f2f2fff] p-2 rounded-md w-1/2 h-1/2 flex flex-col">
        {/* HEAD */}
        <div className="w-full flex space-x-2 text-white text-lg">
          <div className="border-r border-gray-600 pr-2">
            <p>Transfiriendo</p>
          </div>
          <p className="font-thin">
            {`${
              articleToTransfer?.article?.name
                ? articleToTransfer.article.name
                : "Sin artículo"
            }`}
          </p>
          <div className="flex flex-1 justify-end">
            <BiTransfer size={20} className="text-white" />
          </div>
        </div>

        <div className="flex flex-1 bg-red-500">
          <div>
            <label htmlFor=""></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferArticles;
