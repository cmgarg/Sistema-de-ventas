import { Value } from "@radix-ui/react-select";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import SelectM from "../../Select/Select";

type FooterFormProps = {
  cost: number; // Define tus props aquí
  sumCost: () => void;
};

const FooterForm: React.FC<FooterFormProps> = ({ cost, sumCost }) => {
  const [selectFactura, setSelectFactura] = useState<string>("");
  const [selectPM, setSelectPM] = useState<string>("");

  const onSelectType = (e: string) => {
    setSelectFactura(e);
    console.log("BUENOS DIAS LOCO");
  };
  const onSelectPM = (e: string) => {
    setSelectPM(e);
    console.log("BUENOS DIAS LOCO");
  };
  const options = [
    { label: "Tipo A", value: "typeA", abrevUnit: "TA" },
    { label: "Tipo C", value: "typeC", abrevUnit: "TC" },
    { label: "Tipo B", value: "typeB", abrevUnit: "TB" },
  ];
  const optionsPayM = [
    { label: "Débito", value: "debito", abrevUnit: "Do" },
    { label: "Transferencia", value: "transferencia", abrevUnit: "TC" },
    { label: "Contado", value: "contado", abrevUnit: "TB" },
  ];
  return (
    <div className="flex justify-end space-x-2 h-16">
      <div className="flex flex-col space-x-2 relative bg-teal-900 rounded-tl-lg p-1 h-full overflow-hidden items-start bg-gradient-to-t to-slate-800 min-w-36 justify-center from-slate-900 border-slate-800">
        <p
          className="text-slate-300 text-base font-medium w-full text-start absolute top-0 left-2"
          onClick={sumCost}
        >
          Total
        </p>
        <div className="text-3xl text-green-300 font-bold pt-3">
          <NumericFormat
            allowLeadingZeros
            allowedDecimalSeparators={[".", "."]}
            value={cost}
            decimalScale={2}
            thousandSeparator=","
            displayType={"text"}
            className="text-2xl text-green-400 font-bold"
            prefix={"$"}
            renderText={(formattedValue) => <div>{formattedValue}</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterForm;
