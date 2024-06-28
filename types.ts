//types ARTICULOS
export type articleData = {
  article: {
    name: string;
    costo: number;
    venta: number;
    percentajeToSale: number;
    stock: { amount: number; unit: unitType; minStock: number };
    grossWeight: number;
    liquidWeight: number;
    wApp: boolean;
    wlApp: boolean;
    description: string;
  };
  brand: { value: string; label: string };
  code: string;
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
        };
      };
      finalConsumer: { active: boolean; cae: string };
    };
    amount: { value: number; unit: string };
    sold: number;
  }[];
  taxes: {
    name: string;
    percentage: number;
    type: { costPrice: boolean; finalPrice: boolean };
  }[];
  palette?: {
    active: boolean;
    value: number;
  };
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
  articles: {
    name: string;
    code?: string;
    total: number | string;
    amount: {
      value: string;
      unit: string;
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
    name: string;
    email: string;
    address: string;
    phone: string;
    dni: string;
  };
  sold: number;

  dateToRegister?: string;
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
