//types ARTICULOS
export type articleData = {
  article: {
    name: string;
    costo: number;
    venta: number;
    stock: { amount: number; unit: string; minStock: number };
    weight: number;
    wApp: boolean;
    description: string;
  };
  brand: { value: string; label: string };
  code: string;
  category: { value: string; label: string };
  dateToRegister: string;
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
  taxes: { name: string; percentage: number }[];
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
//TYPE STORE

export type storeType = {
  menuState: { value: string };
  clientState: clientData[];
  articleState: articleData[];
  categoryState: categoryType[];
  brandState: brandType[];
  saleState: saleData[];
  auth: authType;
};

/////////////usuario auth

export type authType = {
  isAuthenticated: boolean;
  userId: string;
  token: string;
};
