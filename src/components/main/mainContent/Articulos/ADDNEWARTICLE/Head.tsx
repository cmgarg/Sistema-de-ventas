import React from "react";
import { articleData, unitType } from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";
import { BiSave } from "react-icons/bi";

type HeadProps = {
  setRouter: (e: string) => void;
  router: string;
  onChangeModal: (e: boolean) => void;
  errorIn: string[];
  setErrorIn: (e: string[]) => void;
  stateArticle: articleData;
  depositState: any[];
};

const Head: React.FC<HeadProps> = ({
  setRouter,
  depositState,
  setErrorIn,
  onChangeModal,
  stateArticle,
}) => {
  const saveNewArticle = () => {
    console.log("SAVE NEW ARTICLE");
    const errors: string[] = [];
    if (stateArticle.article.name === "") errors.push("ARTICLENAME");
    if (stateArticle.barcode === "") errors.push("BARCODE");
    if (stateArticle.brand.value === "") errors.push("BRAND");
    if (stateArticle.category.value === "") errors.push("CATEGORY");
    if (stateArticle.article.costo === 0) errors.push("COST");
    if (stateArticle.article.stock.amount === 0) errors.push("STOCK");
    console.log(errors, "ERRORES A VER");
    if (errors.length > 0) {
      return setErrorIn([...errors]);
    } else {
      console.log("AVEEEEEEEEEEEER", depositState);
      window.api.enviarEvento("save-article", {
        depositState,
        articleToSave: stateArticle,
      });
    }
  };
  return (
    <div className="text-3xl text-white w-full flex font-bold pb-2">
      <div className="flex-1 flex justify-end space-x-5 pr-5">
        <ButtonR
          onClick={() => onChangeModal(false)}
          bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
          height="h-10"
          width="w-32"
          title="Cancelar"
        ></ButtonR>
        <ButtonR
          onClick={saveNewArticle}
          bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff]"
          title="Guardar"
          height="h-10"
          width="w-52"
        >
          <BiSave size={20} />
        </ButtonR>
      </div>
    </div>
  );
};

export default Head;
