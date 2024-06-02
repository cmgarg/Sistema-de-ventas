//types ARTICULOS
export type articleData = {
  article: {
    name: string;
    costo: number;
    venta: number;
    stock: { amount: string; unit: string };
    code: string;
  };
  brand: { value: string; label: string };
  category: { value: string; label: string };
  sales: {
    comprador: { name: string; id: string };
    quantity: number;
    totalCost: number;
  }[];
};

export type dataToDeleteArticle = {
  code: string;
  name: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// TYPES VENTAS

export type saleData = {
  articles: [
    {
      name: string;
      code: string;
      total: number;
      amount: number;
    }
  ];
  buyer: { name: string; id: string };
  sold: number;
  date: string;
  id: string;
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

//TYPE STORE

export type storeType = {
  menuState: { value: string };
  clientState: clientData[];
  articleState: articleData[];
  auth:authType;
  updateImgState:{value: boolean}
};


/////////////usuario auth 

export type authType = {
  isAuthenticated: boolean,
  userId: string,
  token: string,
}
