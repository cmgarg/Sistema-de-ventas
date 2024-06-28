import React, { useEffect, useState } from "react";
import StockArticleForm from "./StockUnitAndWeight/StockArticleForm";
import {
  articleData,
  subCategoryType,
  supplierType,
  unitType,
} from "../../../../../../../types";
import UnitsForm from "./StockUnitAndWeight/Unit/UnitsForm";

type StockProps = {
  articleState: articleData; // Define tus props aquí
  setChangeData: (e: string, value: string) => void;
  errorToSave: { active: boolean; type: string; message: string };
  unitsArticleForm: unitType[];
};

const Stock: React.FC<StockProps> = ({
  articleState,
  setChangeData,
  unitsArticleForm,
}) => {
  const [unitForm, setUnitForm] = useState(false);
  const [suppliers, setSuppliers] = useState<supplierType[]>([]);
  const onUnitForm = () => {
    setUnitForm(!unitForm);
  };
  const inputStyle =
    "bg-slate-900 rounded-lg border border-slate-500 px-2 h-14 outline-none";

  useEffect(() => {
    window.api.enviarEvento("get-suppliers");
    window.api.recibirEvento("response-get-suppliers", (res) => {
      if (res) {
        setSuppliers(res);
      }
    });

    window.api.recibirEvento("response-save-supplier", (res) => {
      if (res.value) {
        window.api.enviarEvento("get-suppliers");
      }
    });
  }, []);

  return (
    <div className="flex-1 h-full relative">
      {/* CREAR UNIDADES EDITOR MEJOR DICHO*/}
      {unitForm && (
        <UnitsForm onUnitForm={onUnitForm} units={unitsArticleForm} />
      )}
      <StockArticleForm
        articuloDataState={articleState}
        inputStyle={inputStyle}
        setChangeData={setChangeData}
        setUnitForm={setUnitForm}
        unitsArticleForm={unitsArticleForm}
        suppliers={suppliers}
        setSuppliers={setSuppliers}
      />
    </div>
  );
};

export default Stock;
