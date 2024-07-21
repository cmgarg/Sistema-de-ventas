import crypto from "crypto";
import {
  articleData,
  clientData,
  dataToEditArticle,
  depositType,
  saleData,
  supplierType,
  unitType,
} from "../types/types";
import Datastore from "@seald-io/nedb";
import { getDate } from "./vFunctions";
import jwt from "jsonwebtoken";
const db = {
  clients: new Datastore({ filename: "database/clients.db", autoload: true }),
  articles: new Datastore({
    filename: "database/articles.db",
    autoload: true,
  }),
  sales: new Datastore({ filename: "database/sales.db", autoload: true }),
  accounts: new Datastore({
    filename: "database/accounts.db",
    autoload: true,
  }),
  users: new Datastore({ filename: "database/users.db", autoload: true }),
  filters: new Datastore({ filename: "database/filters.db", autoload: true }),
  usuariosAdmin: new Datastore({
    filename: "database/usuarios.db",
    autoload: true,
  }),
  usuarios: new Datastore({
    filename: "database/sub-usuarios.db",
    autoload: true,
  }),
  unitsArticleForm: new Datastore({
    filename: "database/unitsArticleForm.db",
    autoload: true,
  }),
  suppliers: new Datastore({
    filename: "database/suppliers.db",
    autoload: true,
  }),
  deposits: new Datastore({
    filename: "database/deposits.db",
    autoload: true,
  }),
};
console.log("databaseOperations Se esta ejecutanado...");

//funciones para manejar clientes y demas
export const saveClient = async (data: object) => {
  await db.clients.insertAsync(data);
};

export const registerBuyClient = async (sale: saleData) => {
  if (sale.buyer.client.active) {
    const buyer = getClientById(sale.buyer.client.clientData._id);

    const sales = [...(await buyer).shopping, sale];

    await db.clients.updateAsync(
      { _id: (await buyer)._id },
      { $set: { shopping: sales } }
    );
  }
};
export const getClientById = async (clientId: string): Promise<clientData> => {
  const client: clientData = await db.clients.findOneAsync({ _id: clientId });

  return client;
};
export const deleteClient = async (data: clientData) => {
  await db.clients
    .removeAsync({ _id: data._id }, {})
    .then((data) => {
      return { clientDelete: data };
    })
    .catch((_err) => {
      return false;
    });
};
export const findClients = async () => {
  const clients = await db.clients
    .findAsync({})
    .then((clients: any) => {
      return clients;
    })
    .catch((_err: any) => {});
  return clients;
};
export function updateClient(clientId: string, updateData: any) {
  delete updateData._id;
  return new Promise((resolve, reject) => {
    db.clients.update(
      { _id: clientId },
      { $set: updateData },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      }
    );
  });
}
////////////////////////////////
//FUNCIONES DE ARTICULOS ARKCHIVO ARTICULOS.JS
///////////////////////////////

export const generateCodeArticle = (category: string, brand: string) => {
  const timeStamp = Date.now().toString();

  const randomPart = crypto.randomBytes(4).toString("hex");

  const uniqueCode = `${timeStamp.slice(0, 3)}${randomPart.slice(
    0,
    3
  )}-${category.slice(0, 2).toUpperCase()}${brand.slice(0, 2).toUpperCase()}`;

  return uniqueCode;
};

export const saveArticle = async (a: articleData) => {
  const date = getDate();

  const code = generateCodeArticle(a.category.value, a.brand.value);

  const articleToSave = {
    ...a,
    code: code,
    sales: [],
    dateToRegister: date,
  };

  db.articles
    .insertAsync(articleToSave)
    .then((_res) => {})
    .catch((_err) => {});
};
export const getArticleByCode = async (
  articleCode: string
): Promise<articleData> => {
  return await db.articles.findOneAsync({ code: articleCode });
};
// function getArticleByName(articleName: string) {
//   return new Promise((resolve, reject) => {
//     db.articles.find({ articulo: articleName }, (err: any, doc: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(doc);
//       }
//     });
//   });
// }
export const editArticle = async (articleEdit: dataToEditArticle) => {
  const { numAffected } = await db.articles.updateAsync(
    {
      code: articleEdit.code,
    },
    {
      $set: {
        article: {
          name: articleEdit.name,
          costo: articleEdit.costo,
          venta: articleEdit.venta,
          stock: {
            amount: articleEdit.stock.amount,
            unit: articleEdit.stock.unit,
          },
        },
        brand: articleEdit.brand,
        category: articleEdit.category,
      },
    },
    {}
  );
  if (numAffected) {
    return true;
  } else {
    return false;
  }
};
export const findArticles = async (): Promise<articleData[]> => {
  return await db.articles
    .findAsync({})
    .then((doc: any) => {
      return doc;
    })
    .catch((_err: any) => {});
};
export const deleteArticle = async (code: string) => {
  const numRemoved = await db.articles.removeAsync({ code: code }, {});

  if (numRemoved) {
    return true;
  } else {
    return false;
  }
};
export async function updatedStockArticle(article: {
  idArticle: string;
  quantity: string;
  nameArticle: string;
  totalCost: string;
}) {
  const { idArticle, quantity } = article;
  const articleUpdate: articleData = await getArticleByCode(idArticle);
  const stock = articleUpdate.article.stock.amount;
  const restSold = stock - parseInt(quantity);

  return new Promise((resolve, reject) => {
    db.articles.update(
      { _id: idArticle },
      {
        ...articleUpdate,
        stock: { ...articleUpdate.article.stock, amount: restSold },
      },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      }
    );
  });
}
export async function updatedStockArticles(
  articles: {
    name: string;
    code: string;
    total: number | string;
    amount: {
      value: string;
      unit: string;
    };
  }[]
) {
  const articlesDB = await findArticles();

  articles.forEach((article) => {
    const articleDBCurrent = articlesDB.find(
      (aDB) => aDB.code === article.code
    );
    if (articleDBCurrent) {
      let newAmount =
        Number(articleDBCurrent.article.stock.amount) - Number(article.amount);
      //EMITIR NOTI SI EL MONTO RESTANTE ES CERCANO AL MINIMO
      db.articles
        .updateAsync(
          { code: articleDBCurrent.code },
          {
            $set: {
              article: {
                stock: {
                  amount: newAmount,
                },
              },
            },
          }
        )
        .then((res) => {
          console.log("ARTICULO ACTUALZIADO", res);
        })
        .catch((err) => {
          console.log("NO SE PUDO ACTUALIZAR", err);
        });
    } else {
      console.log("No se encontró el artículo en la base de datos", article);
    }
  });
}
export async function updateCountSaleArticle(article: {
  idArticle: string;
  quantity: string;
  nameArticle: string;
  totalCost: string;
}) {
  const { idArticle } = article;

  const articleUpdate: articleData = await getArticleByCode(idArticle);

  const salesCount = articleUpdate.sales;

  return new Promise((resolve, reject) => {
    db.articles.update(
      { _id: idArticle },
      { ...articleUpdate, ventas: [...salesCount, article] },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      }
    );
  });
}
////////////////////////////////////////////////////////////
////////FUNCIONES DE CLIENTES ARCHIVO ventasFile.js////////
//////////////////////////////////////////////////////////
export const saveSale = (a: saleData) => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const hour = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();

  const articlesTotalSold = a.articles.map((ar) => ar.total);
  const soldTotal = articlesTotalSold.reduce((acc, ad) => {
    return Number(acc) + Number(ad);
  });

  const saleToSave = {
    ...a,
    dateOfRegister: `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}T${hour}:${minutes}:${seconds
      .toString()
      .padStart(2, "0")}Z`,
    sold: soldTotal,
  };
  const resultSave = db.sales
    .insertAsync(saleToSave)
    .then((saleResult) => {
      return { save: true, res: saleResult };
    })
    .catch((err) => {
      return { save: false, res: err };
    });

  return resultSave;
};
export const verifStockOfArticles = async (
  articlesOfSale: {
    name: string;
    code?: string;
    total: number | string;
    amount: {
      value: string;
      unit: string;
    };
  }[]
) => {
  const articles = await findArticles();

  const insufficientItems: {
    articleCode: string;
    amount: string;
    name: string;
  }[] = [];
  articlesOfSale.forEach((article) => {
    const articleToSee = articles.find(
      (articleDB) => articleDB.code === article.code
    );

    if (articleToSee) {
      insufficientItems.push({
        articleCode: article.code ? article.code : article.name,
        amount: article.amount.value ? article.amount.value : "no",
        name: article.name,
      });
    }
  });
  if (insufficientItems.length > 0) {
    return { value: true, insufficientItems };
  } else {
    return { value: false, insufficientItems: [] };
  }
};
const clientConfirmData = async (e: {
  name: string;
  email: string;
  address: string;
  phone: string;
  dni: string;
  _id: string;
}): Promise<boolean> => {
  const clientDB = await getClientById(e._id);

  if (!clientDB) {
    console.log("EL CLIENTE NO EXISTE");
    return false;
  }
  return true;
};
const payMethod = (e: string) => {
  return "PROXIMAMENTE";
};

export const saleProcess = async (venta: saleData) => {
  //VERIFICAR STOCK DE ARTICULOS
  const verifStock = await verifStockOfArticles(venta.articles);
  console.log("VERIFICANDO STOCK", verifStock);
  if (verifStock.value) {
    return {
      type: "stock",
      success: false,
      message: "Stock insuficiente de",
      adjunt: verifStock.insufficientItems,
    };
  }
  //verificar cliente
  let clientVerif = false;
  if (venta.buyer.client.active) {
    clientVerif = await clientConfirmData(venta.buyer.client.clientData);
  }
  if (!clientVerif) {
    return {
      type: "client",
      success: false,
      message: "El cliente no existe",
      adjunt: venta.buyer.client.clientData,
    };
  }
  //verificar metodo de pago
  const payMethodVerif = payMethod("PROXIMAMENTE");
  console.log("VERIFICACION EMTODO DE PAGO,", payMethodVerif);
  //ACTUALIZAR STOCK
  await updatedStockArticles(venta.articles);
  //registrar venta
  await registBuyInArticle(venta);
  //registrar compra en cliente
  await registerBuyClient(venta);
  //GUARDAR VENTA

  const resultToProcess = await saveSale(venta);

  return {
    type: "success save sale",
    success: resultToProcess.save,
    message: "Stock insuficiente de",
    adjunt: verifStock.insufficientItems,
  };
};
export const registBuyInArticle = async (saleInfo: saleData) => {
  const articlesOfSale = [...saleInfo.articles];

  articlesOfSale.map(async (article) => {
    const articleOfDb = article.code
      ? await getArticleByCode(article.code)
      : false;
    if (articleOfDb) {
      await db.articles.updateAsync(
        { code: article.code },
        {
          $set: {
            sales: [
              ...articleOfDb.sales,
              {
                buyer: saleInfo.buyer,
                amount: article.amount,
                sold: article.total,
              },
            ],
          },
        },
        { multi: false }
      );
    }
  });
};
export const findSales = () => {
  return db.sales.findAsync({});
};
export const deleteSales = (data: any) => {
  db.sales.remove({ _id: data }, (_err, _newDoc) => {});
};
//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO filtersFile.js////////
/////////////////////////////////////////////////////
export const addCategory = async (newCategory: string) => {
  const newCategoryLabel =
    newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase();
  const newBrandValue = newCategory.toLowerCase();
  const category = {
    value: newBrandValue,
    label: newCategoryLabel,
    typeFilter: "category",
  };
  return await db.filters.insertAsync(category);
};
export const addSubCategory = async (newSubCategory: string) => {
  const newSubCategoryLabel =
    newSubCategory.charAt(0).toUpperCase() +
    newSubCategory.slice(1).toLowerCase();
  const newSubCategoryValue = newSubCategory.toLowerCase();
  const subCategory = {
    value: newSubCategoryValue,
    label: newSubCategoryLabel,
    typeFilter: "subCategory",
  };
  return await db.filters.insertAsync(subCategory);
};
export const addBrand = async (newBrand: string) => {
  const newBrandLabel =
    newBrand.charAt(0).toUpperCase() + newBrand.slice(1).toLowerCase();
  const newBrandValue = newBrand.toLowerCase();

  const brand = {
    value: newBrandValue,
    label: newBrandLabel,
    typeFilter: "brand",
  };
  return await db.filters.insertAsync(brand);
};

export const getCategoryAndBrand = async () => {
  const categorys = await db.filters.findAsync({ typeFilter: "category" });
  const subCategorys = await db.filters.findAsync({
    typeFilter: "subCategory",
  });
  const brands = await db.filters.findAsync({ typeFilter: "brand" });

  return { categorys: categorys, subCategorys: subCategorys, brands: brands };
};
//FUNCIONES DE PETICIONES DE ESTADISTICAS

export const getStats = async () => {
  // const articles = await findArticles();
  const sales = await findSales();
  // const clients = await findClients();

  const lastSale = sales[sales.length - 1];

  const allStats = {
    lastSale: lastSale,
  };

  return allStats;
};
//UNITS Y DEMAS
//FUNCTIONS UNITS KG, LIT, ETC

const verifUnitExists = async (
  e: unitType,
  edit?: boolean
): Promise<{ value: boolean; abrevUnit: boolean }> => {
  const { value, abrevUnit } = e;
  const unitOfDb = await db.unitsArticleForm.findAsync({});
  const unitDefault = [
    { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
    { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
    { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
    { value: "litros", label: "Litros", abrevUnit: "L" },
    { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
  ];

  const units = [...unitOfDb, ...unitDefault];

  const existUnitValue = [...units].filter((unit) => {
    return unit.value.toLowerCase() === value.toLowerCase();
  });
  const existUnitAbrev = [...units].filter((unit) => {
    return unit.abrevUnit.toLowerCase() === abrevUnit.toLowerCase();
  });

  if (existUnitValue.length > 0 && existUnitAbrev.length > 0) {
    return {
      value: true,
      abrevUnit: true,
    };
  } else if (existUnitValue.length > 0) {
    return {
      value: true,
      abrevUnit: false,
    };
  } else if (existUnitAbrev.length > 0) {
    return {
      value: false,
      abrevUnit: true,
    };
  } else {
    return {
      value: false,
      abrevUnit: false,
    };
  }
};

export const getUnits = async () => {
  return await db.unitsArticleForm.findAsync({});
};
export const saveNewUnits = async (
  e: unitType
): Promise<{ message: string; value?: any }> => {
  const { value, abrevUnit }: { value: boolean; abrevUnit: boolean } =
    await verifUnitExists(e);

  if (value && abrevUnit) {
    return {
      message: "Ya existe la unidad",
      value: false,
    };
  } else if (value) {
    return {
      message: "Ya existe una unidad con ese nombre",
      value: false,
    };
  } else if (abrevUnit) {
    return {
      message: "Ya existe una unidad con ese abreviado",
      value: false,
    };
  }

  if (e.value !== "" || e.label !== "") {
    return await db.unitsArticleForm
      .insertAsync(e)
      .then((res) => {
        return {
          message: "Unidad guardada correctamente",
          value: res,
        };
      })
      .catch((err) => {
        return {
          message: "No se pudo guardar la unidad",
          value: err,
        };
      });
  } else {
    return {
      message: "Hay campos incompletos",
      value: false,
    };
  }
};
export const updateUnit = async (e: unitType, id: string) => {
  const { value, abrevUnit }: { value: boolean; abrevUnit: boolean } =
    await verifUnitExists(e);

  if (value && abrevUnit) {
    return {
      message: "Ya existe una unidad igual",
      value: false,
    };
  }
  return await db.unitsArticleForm
    .updateAsync(
      { _id: id },
      {
        $set: {
          ...e,
        },
      },
      {}
    )
    .then((res) => {
      return {
        message: "Unidad editada correctamente",
        value: res,
      };
    })
    .catch((err) => {
      return {
        message: "No se pudo editar la unidad",
        value: err,
      };
    });
};
export const deleteUnit = async (e: string) => {
  return await db.unitsArticleForm
    .removeAsync({ _id: e }, {})
    .then((res) => {
      return {
        message: "Unidad eliminada correctamente",
        value: res,
      };
    })
    .catch((err) => {
      return {
        message: "No se pudo eliminar la unidad",
        value: err,
      };
    });
};
//PROVEEDORES
export const saveSupplier = async (e: supplierType) => {
  return await db.suppliers
    .insertAsync(e)
    .then((res) => {
      return {
        message: "Proveedor guardado correctamente",
        value: true,
      };
    })
    .catch((err) => {
      return {
        message: "NO SE PUDO GUARDAR EL PROVEEDOR",
        value: false,
      };
    });
};

export const deleteSupplier = async (supplierToDelete: supplierType) => {
  console.log("buenas tardes");
  return await db.suppliers
    .removeAsync({ _id: supplierToDelete._id }, { multi: false })
    .then((res) => {
      return {
        message: "Proveedor eliminado correctamente",
        value: true,
      };
    })
    .catch((err) => {
      return {
        message: "NO SE PUDO ELIMINAR EL PROVEEDOR",
        value: false,
      };
    });
};

export const getSuppliers = async () => {
  return await db.suppliers.findAsync({});
};
export const updateSuppliers = async (
  id: string,
  newSupplier: supplierType
) => {
  return await db.suppliers
    .updateAsync(
      { _id: id },
      {
        $set: {
          ...newSupplier,
        },
      }
    )
    .then((res) => {
      console.log("Proveedor actualizado correctamente", res);
      return {
        message: "Proveedor actualizado correctamente",
        value: true,
      };
    })
    .catch((err) => {
      console.log("Error al actualizar el proveedor", err);
      return {
        message: "Error al actualizar el proveedor",
        value: false,
      };
    });
};
//DEPOSITOS

export const getDeposits = async () => {
  return await db.deposits
    .findAsync({})
    .then((deposits) => {
      console.log("Depositos encontrados", deposits);
      return deposits;
    })
    .catch((err) => {
      console.log("Error al encotrar los depositos", err);
      return {
        message: "Error al encotrar los depositos",
        value: false,
      };
    });
};

export const getDepositById = async (id: string): Promise<depositType> => {
  return await db.deposits.findOneAsync({ _id: id });
};

export const createDeposit = async (newDeposit: depositType) => {
  return await db.deposits
    .insertAsync(newDeposit)
    .then((res) => {
      console.log("DEPOSITO CREADO CORRECTAMENTE");
      return {
        message: "Deposito creado correctamente",
        value: true,
      };
    })
    .catch((err) => {
      console.log("Error al crear el deposito");
      return {
        message: "Error al crear el deposito",
        value: false,
      };
    });
};

export const updateDeposit = async (depositToUpdate: depositType) => {
  return await db.deposits.updateAsync(
    { _id: depositToUpdate._id },
    { $set: { ...depositToUpdate } }
  );
};
export const addProductInDeposit = async (
  depositId: string,
  sectorId: any,
  productToAdd: articleData
) => {
  const depositToAddProduct = await getDepositById(depositId);
  console.log(depositToAddProduct);

  if (!depositToAddProduct) {
    console.log("No se encontro el deposito");
    return {
      message: "No se encontro el deposito",
      value: false,
    };
  } else {
    const res = depositToAddProduct.sectors.map((e) => {
      if (e.sectorId === sectorId) {
        e.products.push(productToAdd);
        return `"Producto añadido al sector" ${e.number}`;
      } else {
        return `"Sector no encontrado"`;
      }
    });
    console.log(
      res,
      "RESPUESTA AL AÑADIR EL PRODUCTO AL SECTOR CORRESPONDIENTE"
    );
  }
};

export const createSectorInDeposit = async (
  depositId: string,
  sectorinfo: {
    name: string;
    sectorId: string;
    products: articleData[];
  }
) => {
  const sectorToAdd = {
    ...sectorinfo,
    sectorId: crypto.randomBytes(4).toString("hex"),
  };
  const depositToAddProduct = await getDepositById(depositId);

  if (!depositToAddProduct) {
    console.log("No se encontro el deposito");
    return {
      message: "No se encontro el deposito",
      value: false,
    };
  } else {
    depositToAddProduct.sectors.push(sectorToAdd);
    console.log("SE AGREGO EL SECTOR AL DEPOSITO?", depositToAddProduct);
    updateDeposit(depositToAddProduct);
    return { ...sectorToAdd };
  }
};

export const deleteSector = async (depositId: string, sectorId: string) => {
  const depositToDeleteSector = await getDepositById(depositId);

  const sectorDelete = depositToDeleteSector.sectors.filter(
    (e) => e.sectorId !== sectorId
  );

  const depositWithDeleteSector = {
    ...depositToDeleteSector,
    sectors: sectorDelete,
  };

  return await updateDeposit(depositWithDeleteSector);
};

export const editSectorInDeposit = async (
  depositId: string,
  sectorId: string,
  newSector: {
    number: number;
    sectorId: string;
    products: articleData[];
  }
) => {
  const deposit = await getDepositById(depositId);
  const [sectorToEdit] = deposit.sectors.filter((s) => {
    return s.sectorId === sectorId;
  });

  if (sectorToEdit) {
    const depositWithEditSector = {
      ...deposit,
      sectors: deposit.sectors.map((s) => {
        if (s.sectorId === sectorToEdit.sectorId) {
          return newSector;
        }
        return s;
      }),
    };
    return await updateDeposit(depositWithEditSector);
  } else {
    console.error(`No se encontró el sector con id ${sectorId}`);
    return {
      message: `No se encontró el sector con id ${sectorId}`,
      value: false,
    };
  }
};
//SEGUR CON TODO LO DEMAS
////////////////////////MARTIN

//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO cuentasFile.js////////
/////////////////////////////////////////////////////

export const obtenerEstadoPagado = (idCuenta: any) => {
  return new Promise((resolve, reject) => {
    db.accounts.findOne({ _id: idCuenta }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          pagado: doc.pagado,
          pagado2: doc.pagado2,
          pagado3: doc.pagado3,
        }); // Incluye los campos 'pagado', 'pagado2', y 'pagado3' en la respuesta
      }
    });
  });
};

export const accountToPay = (account: object) => {
  db.accounts.insert(account, (err, _newDoc) => {
    if (err) {
      // Manejar el error
    } else {
      // Objeto guardado con éxito
    }
  });
};

export const actualizarCuenta = (idCuenta: string, datosActualizados: any) => {
  if (idCuenta == null || datosActualizados == null) {
    return Promise.reject("ID de la cuenta o datos actualizados no válidos");
  }

  // Eliminar el campo _id de los datos actualizados si existe
  delete datosActualizados._id;

  // Mostrar los datos que se van a actualizar

  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: datosActualizados },
      { multi: false },
      (err: any, numUpdated: number) => {
        if (err) {
          reject(err);
        } else {
          if (numUpdated === 0) {
          }
          resolve(numUpdated);
        }
      }
    );
  });
};

//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO filtersFile.js////////
/////////////////////////////////////////////////////
export const actualizarEstadoPagado = (
  idCuenta: any,
  estadoPagado: any,
  pagado2: any,
  pagado3: any
) => {
  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: { pagado: estadoPagado, pagado2: pagado2, pagado3: pagado3 } },
      {},
      (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced); // numReplaced es el número de documentos actualizados
        }
      }
    );
  });
};

// Suponiendo que `cuentas` es tu Datastore de NeDB para las cuentas
export const obtenerEstadosPagadosInicial = async () => {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err: any, docs: any[]) => {
      if (err) {
        reject(err);
      } else {
        // Transforma los documentos para obtener solo los IDs y los estados de pagado
        const estados = docs.reduce(
          (
            acc: { [x: string]: any },
            doc: { _id: string | number; pagado: any }
          ) => {
            acc[doc._id] = doc.pagado; // Suponiendo que `pagado` es un campo en tus documentos
            return acc;
          },
          {}
        );
        resolve(estados);
      }
    });
  });
};

export const getUser = (userId: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ _id: userId }, (err, admin) => {
      if (err) {
        reject(err);
      } else if (admin) {
        resolve(admin);
      } else {
        db.usuarios.findOne({ _id: userId }, (err, subUsuario) => {
          if (err) {
            reject(err);
          } else {
            resolve(subUsuario);
          }
        });
      }
    });
  });
};

// Función para actualizar la imagen del usuario
export const actualizarImagenUsuario = (userId: any, imageUrl: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      {},
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const bcrypt = require("bcrypt");
const saltRounds = 10;

export const guardarUsuarioAdmin = async (usuarioAdmin: { password: any }) => {
  try {
    // Genera un hash del password del usuario
    const hashedPassword = await bcrypt.hash(usuarioAdmin.password, saltRounds);
    // Sustituye el password en texto plano con el hash antes de guardar en la base de datos
    const usuarioConPasswordEncriptado = {
      ...usuarioAdmin,
      password: hashedPassword,
      esAdmin: true,
    };

    // Ahora guardas el usuario con el password encriptado en la base de datos
    return new Promise((resolve, reject) => {
      db.usuariosAdmin.insert(usuarioConPasswordEncriptado, (err, newDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verificarAdminExistente = () => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
      if (err) {
        reject(err);
      } else if (admin) {
        resolve({
          existeAdmin: true,
          recuperacioncuenta: admin.recuperacioncuenta,
        });
      } else {
        resolve({ existeAdmin: false });
      }
    });
  });
};

const secretKey = "tu_clave_secreta"; // Asegúrate de usar una clave secreta segura y única

export const iniciarSesion = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    // Primero, buscamos en la colección de administradores
    const usuarioAdmin = await new Promise<any>((resolve, reject) => {
      db.usuariosAdmin.findOne(
        { username: credentials.username },
        (err, doc) => {
          if (err) reject(err);
          else resolve(doc);
        }
      );
    });

    if (usuarioAdmin) {
      if (bcrypt.compareSync(credentials.password, usuarioAdmin.password)) {
        const token = jwt.sign(
          { userId: usuarioAdmin._id, isAdmin: true },
          secretKey,
          {
            expiresIn: "4464h",
          }
        );
        return {
          exito: true,
          token,
          userId: usuarioAdmin._id,
        };
      } else {
        return { exito: false, mensaje: "Contraseña incorrecta" };
      }
    } else {
      // Si no encontramos un usuario administrador, buscamos en la colección de subusuarios
      const subUsuario = await new Promise<any>((resolve, reject) => {
        db.usuarios.findOne({ nombre: credentials.username }, (err, doc) => {
          if (err) reject(err);
          else resolve(doc);
        });
      });

      if (subUsuario) {
        if (bcrypt.compareSync(credentials.password, subUsuario.password)) {
          const token = jwt.sign(
            { userId: subUsuario._id, isAdmin: false },
            secretKey,
            {
              expiresIn: "4464h",
            }
          );
          return {
            exito: true,
            token,
            userId: subUsuario._id,
          };
        } else {
          return { exito: false, mensaje: "Contraseña incorrecta" };
        }
      } else {
        return { exito: false, mensaje: "Usuario no encontrado" };
      }
    }
  } catch (error) {
    return { exito: false, mensaje: "Error al buscar el usuario" };
  }
};

export const verificarToken = (token: any) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

export const obtenerAdmin = () => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
      if (err) {
        reject({ exito: false, error: err.message });
      } else if (admin) {
        resolve({ exito: true, admin });
      } else {
        resolve({
          exito: false,
          error: "No se encontró un administrador",
        });
      }
    });
  });
};

export const verificarCodigoDesbloqueo = (codigoIngresado: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
      if (err) {
        reject(err);
      } else if (admin && admin.bloqueo === codigoIngresado) {
        resolve({ exito: true });
      } else {
        resolve({ exito: false });
      }
    });
  });
};

export const cambiarContrasena = async (userId: any, nuevaContrasena: any) => {
  try {
    // Encripta la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);

    // Actualiza la contraseña del usuario en la base de datos
    return new Promise((resolve, reject) => {
      db.usuariosAdmin.update(
        { _id: userId },
        { $set: { password: hashedPassword } },
        {},
        (err) => {
          if (err) {
            reject({ exito: false, error: err.message });
          } else {
            resolve({ exito: true });
          }
        }
      );
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const restarRecuperacionCuenta = async (userId: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update(
      { _id: userId },
      { $inc: { recuperacioncuenta: -1 } },
      {},
      async (err, _numAffected) => {
        if (err) {
          reject(err);
        } else {
          const usuarioActualizado = await getUser(userId);
          resolve(usuarioActualizado);
        }
      }
    );
  });
};

export const reiniciarRecuperacionCuenta = async (userId: any) => {
  return new Promise<void>((resolve, reject) => {
    db.usuariosAdmin.update(
      { _id: userId },
      { $set: { recuperacioncuenta: 3 } },
      {},
      (err, _numAffected) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const guardarUsuarioSecundario = async (usuario: { password: any }) => {
  const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
  const usuarioConPasswordEncriptado = {
    ...usuario,
    password: hashedPassword,
    esusuario: true,
  };

  return new Promise((resolve, reject) => {
    db.usuarios.insert(usuarioConPasswordEncriptado, (err, _newDoc) => {
      if (err) {
        reject(err);
      } else {
        db.usuarios.find({}, (error: any, docs: unknown) => {
          if (error) {
            reject(error);
          } else {
            resolve(docs);
          }
        });
      }
    });
  });
};

export const cargarTodosLosUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.usuarios.find({}, (err: any, docs: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

export const actualizarImagenSubusuario = (userId: any, imageUrl: any) => {
  return new Promise((resolve, reject) => {
    db.usuarios.update(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      {},
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const actualizarPermisosUsuario = (userId: any, nuevosPermisos: any) => {
  return new Promise((resolve, reject) => {
    db.usuarios.update(
      { _id: userId },
      { $set: { permisos: nuevosPermisos } },
      {},
      (err, _numReplaced) => {
        if (err) {
          reject(err);
        } else {
          db.usuarios.findOne({ _id: userId }, (err, usuario) => {
            if (err) {
              reject(err);
            } else {
              resolve(usuario);
            }
          });
        }
      }
    );
  });
};

export const actualizarUsuario = (userId: any, updatedUser: any) => {
  return new Promise((resolve, reject) => {
    db.usuarios.update(
      { _id: userId },
      { $set: updatedUser },
      {},
      (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      }
    );
  });
};

export const obtenerPermisosUsuario = async (userId: any) => {
  try {
    let usuario = await db.usuariosAdmin.findOneAsync({ _id: userId });
    if (usuario) {
      return { success: true, data: usuario.permisos || {}, isAdmin: true };
    } else {
      usuario = await db.usuarios.findOneAsync({ _id: userId });
      if (usuario) {
        return { success: true, data: usuario.permisos || {}, isAdmin: false };
      } else {
        return { success: false, error: "Usuario no encontrado" };
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function getAccountsToPay() {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err: any, docs: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

export const eliminarCuenta = async (id: any) => {
  return new Promise((resolve, reject) => {
    db.accounts.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
};
