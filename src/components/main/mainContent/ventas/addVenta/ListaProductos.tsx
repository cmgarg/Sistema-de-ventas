import React from "react";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";


interface Article {
  name: string;
  code?: string;
  total: string | number;
  amount: {
    value: string | number;
    unit: string;
  };
}

interface articleData {
  article: {
    name: string;
    venta: number;
    stock: {
      unit: {
        abrevUnit: string;
      };
      amount: number;
    };
  };
  brand: {
    value: string;
    label: string;
  };
  code: string;
  barcode: string;
  category: {
    value: string;
    label: string;
  };
  subCategory: {
    value: string;
    label: string;
  };
  dateToRegister: string;
  supplier: string;
  sales: number;
  taxes: number;
  deposits: string;
}

interface ListaProductosProps {
  deleteOfList: (i: number) => void;
  listProduct: Article[];
  estilosInput: string;
  articles: any;
  addProduct: any;
  showError: { in: string };
  formatMony: (m: number) => string;
}

const ListaProductos: React.FC<ListaProductosProps> = ({
  listProduct,
  deleteOfList,
  estilosInput,
  articles,
  addProduct,
  formatMony,
  showError,
}) => {
  const abreviationUnit = (unit: string) => {
    let abreviation = "";
    const units = ["kg", "ud", "l", "paq", "caj"];
    if (units.includes(unit.toLowerCase())) {
      switch (unit.toLowerCase()) {
        case "kg":
          abreviation = "Kg";
          break;
        case "ud":
          abreviation = "Ud";
          break;
        case "l":
          abreviation = "L";
          break;
        case "paq":
          abreviation = "Paq";
          break;
        case "caj":
          abreviation = "Caj";
          break;
        default:
          break;
      }
    }
    return abreviation;
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="bg-slate-950 border-b-1 border-l-1 border-gray-600">
        <MenuArticlesForm
          style={estilosInput}
          articles={articles}
          addProduct={addProduct}
        />
      </div>
      <ul
        className={`overflow-auto flex-1 relative custom-scrollbar ${
          showError.in === "all" || showError.in === "articles"
            ? "shadow-inset-cmg shadow-red-600"
            : ""
        }`}
      >
        <li className="w-full flex flex-row h-12 text-2xl bg-teal-900 sticky top-0 z-40">
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Articulo</p>
          </div>
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Cantidad</p>
          </div>
          <div className="flex-1 flex justify-center h-full items-center">
            <p>Total</p>
          </div>
        </li>
        {listProduct.map((e, i) => (
          <li key={i} className="w-full flex h-12 text-2xl bg-teal-950 items-center relative">
            <div className="flex-1 flex justify-center items-center">
              <p>{e.name}</p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex">
                <p>{e.amount.value}</p>
                <div className="text-sm flex items-end">
                  <p>{abreviationUnit(e.amount.unit)}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 text-cyan-300 flex justify-center">
              <p>{formatMony(Number(e.total))}</p>
            </div>
            <div className="absolute right-0" onClick={() => deleteOfList(i)}>
              <p>Borrar</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
