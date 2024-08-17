import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

type ScannerProps = {
  onDetected: any; // Define tus props aquí
};

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const [barcode, setBarcode] = useState("");
  const [barcodeType, setBarcodeType] = useState("");

  useEffect(() => {
    const handleKeyPress = (event: { key: string; }) => {
      if (event.key === "Enter") {
        if (barcode) {
          onDetected({ code: barcode, type: barcodeType });
          setBarcode("");
          setBarcodeType("");
        }
      } else if (event.key === "Tab") {
        // Tab can be used to detect the type of barcode if needed
      } else {
        setBarcode((prev) => prev + event.key);
        if (barcodeType === "") {
          setBarcodeType("UNKNOWN"); // Set your logic to detect type if you have any
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [barcode, barcodeType, onDetected]);

  return (
    <div>
      <h1>Escáner de Códigos de Barras</h1>
      <input
        type="text"
        value={barcode}
        readOnly
        className="h-10 w-52 bg-blue-900"
      />
    </div>
  );
};

export default Scanner;
