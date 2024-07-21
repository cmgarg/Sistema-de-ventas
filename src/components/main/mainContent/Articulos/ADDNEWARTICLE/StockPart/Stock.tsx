import React, { useEffect, useState } from "react";
import StockArticleForm from "./StockUnitAndWeight/StockArticleForm";
import {
  Action,
  articleData,
  depositType,
  subCategoryType,
  supplierType,
  unitType,
} from "../../../../../../../types/types";
import UnitsForm from "./StockUnitAndWeight/Unit/UnitsForm";
import Supplier from "./StockUnitAndWeight/Supplier/Supplier";

type StockProps = {
  stateArticle: articleData;
  deposits: depositType[];
  depositState: {
    deposit: {
      idObject: string;
      name: string;
      depositId: string;
      address: string;
      sector: {
        name: string;
        sectorId: string;
      };
    };
    element: React.ReactNode;
  }[];
  dispatchDeposit: React.Dispatch<Action>;
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
  dispatchDeposit,
  depositState,
  suppliers,
  deposits,
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
    "bg-slate-900 rounded-lg border border-slate-500 px-2 h-14 outline-none";

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
        depositState={depositState}
        dispatchDeposit={dispatchDeposit}
        deposits={deposits}
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
