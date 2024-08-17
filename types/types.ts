import { Key } from "antd/es/table/interface";

// Ajuste tus interfaces
export type articleToEdit = {
  id: string;
  idArticle: string;
};

export type Article = {
  name: string;
  code?: string;
  total: string | number;
  amount: {
    value: string | number;
    unit: string;
  };
};

export type articleData = {
  article: {
    code: string;
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
    quantityperunit: {
      active: boolean;
      value: number;
    };
    forBulk: {
      active: boolean;
      value: number;
    };
    description: string;
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
        };
      };
      finalConsumer: {
        active: boolean;
        cae: string;
      };
    };
    amount: {
      value: number;
      unit: string;
    };
    sold: number;
  }[];
  taxes: {
    name: string;
    percentage: number;
    type: {
      costPrice: boolean;
      finalPrice: boolean;
    };
  }[];
  deposits: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
    };
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
  brand: {
    value: string;
    label: string;
  };
  category: {
    value: string;
    label: string;
  };
  code: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// TYPES VENTAS

export interface saleData {
  id: Key | null | undefined;
  _id: string;
  dateOfRegister: string;
  articles: {
    name: string;
    code: string;
    total: string | number;
    amount: {
      value: string;
      unit: { label: string; palette: boolean; bulk: boolean };
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
  seller: {
    username: any;
    name: string;
    id: string;
    image: string;
  };
  sold: number;
  billData?: {
    billType: string;
  };
  pM?: string;
  dateToRegister?: string;
  id?: string;
};
// venta a eliminar

export type saleToDelete = {
  id: string;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
/// CLIENTES TYPES

export type clientData = {
  name: string;
  address: string;
  phone: number;
  email: string;
  birthdate: string;
  DNI: number;
  shopping: {
    articulos: {
      nameArticle: string;
      amount: number;
      cost: number;
      idArticle: string;
    }[];
    totalCost: number;
    _id?: string;
  }[];
  _id?: string;
};

// Tipo de objeto que enviaran para eliminar un cliente del estado.

export type dataToDeleteClient = {
  name: string;
  _id: string;
};

// TYPE BRAND

export type brandType = {
  label: string;
  value: string;
  _id?: string;
};

export type categoryType = {
  label: string;
  value: string;
  _id?: string;
};

export type subCategoryType = {
  label: string;
  value: string;
  _id?: string;
};

// TYPE STORE

export type storeType = {
  [x: string]: any;
  menuState: {
    value: string;
  };
  clientState: clientData[];
  articleState: articleData[];
  categoryState: categoryType[];
  subCategoryState: subCategoryType[];
  brandState: brandType[];
  saleState: saleData[];
  auth: authType;
};

// UNIDAD TYPE

export type unitType = {
  label: string;
  value: string;
  abrevUnit: string;
  _id?: string;
};

///////////// usuario auth

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

// ALMACEN

export type depositType = {
  name: string;
  address: string;
  sectors: {
    name: string;
    sectorId: string;
    products: articleData[];
  }[];
  _id?: string;
};

export type depositToAddProduct = {
  sectorId: string;
  number: number;
  sectorToAdd: {
    sectorId: string;
    name: string;
    products: articleData[];
    number: number;
  };
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
