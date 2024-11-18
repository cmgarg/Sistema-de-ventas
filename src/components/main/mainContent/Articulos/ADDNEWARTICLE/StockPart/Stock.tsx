import React, { useEffect, useState } from "react";
import StockArticleForm from "./StockUnitAndWeight/StockArticleForm";
import {
  Action,
  articleData,
  subCategoryType,
  supplierType,
  unitType,
} from "../../../../../../../types/types";
import UnitsForm from "./StockUnitAndWeight/Unit/UnitsForm";
import Supplier from "./StockUnitAndWeight/Supplier/Supplier";

type StockProps = {
  stateArticle: articleData;
  suppliers: supplierType[];
  setSuppliers: (e: supplierType[]) => void;
  router: string;
  errorIn: string[];
  setInputValueSupplierInput: (e: string) => void;
  inputValueSupplierInput: string;
  dispatch: React.Dispatch<Action>;
  errorToSave: { active: boolean; type: string; message: string };
  unitsArticleForm: unitType[];
};

const Stock: React.FC<StockProps> = ({
  stateArticle,
  suppliers,
  inputValueSupplierInput,
  setInputValueSupplierInput,
  setSuppliers,
  errorIn,
  dispatch,
  unitsArticleForm,
}) => {
  const [unitForm, setUnitForm] = useState(false);
  const [supplierForm, setSupplierForm] = useState<boolean>(false);

  const onUnitForm = () => {
    setUnitForm(!unitForm);
  };
  const inputStyle =
    "bg-[#707070ff] rounded-lg px-2 h-10 outline-none shadow-[0_2px_5px_rgba(0,0,0,0.50)]";

  useEffect(() => {
    console.log(stateArticle);

    window.api.recibirEvento("response-save-supplier", (res) => {
      if (res.value) {
        window.api.enviarEvento("get-suppliers");
      }
    });
  }, []);

  return (
    <div className="flex-1 h-full">
      {/* CREAR UNIDADES EDITOR MEJOR DICHO*/}
      {unitForm && (
        <UnitsForm onUnitForm={onUnitForm} units={unitsArticleForm} />
      )}
      {supplierForm && (
        <Supplier
          dispatch={dispatch}
          setSupplierForm={setSupplierForm}
          suppliers={suppliers}
        />
      )}
      <StockArticleForm
        stateArticle={stateArticle}
        setInputValueSupplierInput={setInputValueSupplierInput}
        setSupplierForm={setSupplierForm}
        inputValueSupplierInput={inputValueSupplierInput}
        errorIn={errorIn}
        inputStyle={inputStyle}
        dispatch={dispatch}
        setUnitForm={setUnitForm}
        unitsArticleForm={unitsArticleForm}
        suppliers={suppliers}
        setSuppliers={setSuppliers}
      />
    </div>
  );
};

export default Stock;
