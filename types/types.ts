import { Key } from "react";

//types ARTICULOS
export type articleData = {
  article: {
    name: string;
    costo: number;
    venta: number;
    profit: number;
    stock: { amount: number; unit: unitType; minStock: number };
    grossWeight: { value: number; approx: boolean };
    liquidWeight: { value: number; approx: boolean };
    pallet: {
      active: boolean;
      value: number;
    };
    forBulk: {
      active: boolean;
      value: number;
    };
    description: string;
  };
  brand: { value: string; label: string };
  code: string;
  barcode: string;
  category: { value: string; label: string };
  subCategory: { value: string; label: string };
  dateToRegister: string;
  supplier: supplierType;
  sales: {
    buyer: {
      client: {
        active: boolean;
        clientData: {
          name: string;
          email: string;
          address: string;
          phone: string;
          _id?: string;
        };
      };
      finalConsumer: { active: boolean; cae: string };
    };
    amount: {
      value: number;
      unit: { label: string; pallet: boolean; bulk: boolean };
    };
    sold: number;
  }[];
  taxes: {
    name: string;
    percentage: number;
    type: { costPrice: boolean; finalPrice: boolean };
  }[];
  batches: {
    lotNumber: string;
    quantity: number;
    quantityBulk: number;
    quantityPallet: number;
    expirationDate: string; // Fecha de vencimiento
  }[];
  history: {
    type: "register" | "sale" | "restock" | "adjustment";
    date: string;
    quantity: number;
    remainingStock: number;
    message: string;
  }[];
};

export type dataToDeleteArticle = {
  code: string;
  name: string;
};

export type dataToEditArticle = {
  name: string;
  costo: number;
  venta: number;
  stock: {
    amount: number;
    unit: string;
  };
  brand: { value: string; label: string };
  category: { value: string; label: string };
  code: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// TYPES VENTAS

export type saleData = {
  _id?: string;
  articles: {
    name: string;
    code: string;
    total: number | string;
    amount: {
      value: string;
      unit: unitType;
    };
  }[];
  buyer: {
    client: {
      active: boolean;
      clientData: {
        name: string;
        email: string;
        address: string;
        phone: string;
        dni: string;
        _id: string;
      };
    };
    finalConsumer: {
      active: boolean;
      cae: string;
    };
  };
  seller: IUser;
  sold: number;
  billData?: {
    billType: string;
  };

  pM?: string;
  dateOfRegister?: string;
  id?: string;
};
// venta a eliminar

export type saleToDelete = {
  id: string;
};
///////////////////////////////////////////////////////////////////////////////////////////////////
///CLIENTES TYPES
export type clientData = {
  name: string;
  address: string;
  phone: number;
  email: string;
  birthdate: string;
  DNI: number;
  CUIT_CUIL: string;
  nationality: string;
  clientType: string;
  rubro: string;
  payMethod: string;
  conditionIVA: string;
  shopping: {
    articles: {
      name: string;
      amount: number;
      cost: number;
      idArticle: string;
      total: string;
    }[];
    sold: number;
    _id?: string;
  }[];
  _id?: string;
};

//Tipo de objeto que enviaran para eliminar un cliente del estado.

export type dataToDeleteClient = {
  name: string;
  _id: string;
};
//TYPE BRAND
export type brandType = { label: string; value: string; _id?: string };
//
export type categoryType = { label: string; value: string; _id?: string };
export type subCategoryType = { label: string; value: string; _id?: string };

//TYPE STORE

export type storeType = {
  menuState: { value: string };
  clientState: clientData[];
  articleState: articleData[];
  categoryState: categoryType[];
  subCategoryState: subCategoryType[];
  brandState: brandType[];
  saleState: saleData[];
  estadoTipoDeUser: {
    userType: string;
    datosUsuario: IUser;
  };
  auth: authType;
};
//UNIDAD TYPE
export type unitType = {
  label: string;
  value: string;
  abrevUnit: string;
  _id?: string;
};
/////////////usuario auth

export type authType = {
  isAuthenticated: boolean;
  userId: string;
  token: string;
};

export type supplierType = {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  _id?: string;
};

export type Action = {
  type: string;
  payload: any;
};
export type pmType = {
  name: string;
  salesWithThisMethod: number;
  totalSoldWithThisMethod: number;
};

//TIPOS MARTIN

export type IUser = {
  uuid: any;
  nombre: string;
  username: string;
  email: string;
  ubicacion: string;
  direccion: string;
  codigopostal: string;
  imageUrl: string;
  esAdmin: boolean;
  _id: string;
};
