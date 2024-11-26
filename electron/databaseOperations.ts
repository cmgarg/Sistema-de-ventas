import crypto from "crypto";
import {
  articleData,
  clientData,
  dataToEditArticle,
  pmType,
  saleData,
  supplierType,
  unitType,
} from "../types/types";
import Datastore from "@seald-io/nedb";
import { getDate } from "./vFunctions";
import jwt from "jsonwebtoken";
import { find, isArray, isEqual } from "lodash";
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
  notifications: new Datastore({
    filename: "database/notifications.db",
    autoload: true,
  }),
  notifiDesactivada: new Datastore({
    filename: "database/notifiDesactivada.db",
    autoload: true,
  }),
  payMethod: new Datastore({
    filename: "database/payMethod.db",
    autoload: true,
  }),
  cuentasHistorial: new Datastore({
    filename: "database/cuentasHistorial.db",
    autoload: true,
  }),
};
console.log("databaseOperations Se esta ejecutanado...");

//funciones para manejar clientes y demas
export const saveClient = async (data: object) => {
  return await db.clients
    .insertAsync(data)
    .then((res) => ({ action: true, dataSaved: res }))
    .catch((err) => ({ action: false, dataSaved: err }));
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
  return await db.clients
    .removeAsync({ _id: data._id }, {})
    .then((res) => {
      return { action: true, dataDeleted: data.name };
    })
    .catch((err) => {
      return { action: false, dataDeleted: err };
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
  return db.clients
    .updateAsync({ _id: clientId }, { $set: updateData }, { multi: false })
    .then((data) => {
      return { action: true, clientUpdate: updateData };
    })
    .catch((err) => {
      return { action: false, clientUpdate: err };
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

export const saveArticle = async (e: { articleToSave: articleData }) => {
  const date = getDate();

  const code = generateCodeArticle(
    e.articleToSave.category.value,
    e.articleToSave.brand.value
  );

  const articleToSave = {
    ...e.articleToSave,
    code: code,
    sales: [],
    dateToRegister: date,
  };
  await db.articles
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
//ACTUALIZAR ARTTICULO
export const updateArticle = async (article: articleData) => {
  try {
    // Intentar realizar la actualización del artículo en la base de datos
    const result = await db.articles.updateAsync(
      { code: article.code }, // Criterio de búsqueda por código
      { $set: { ...article } } // Actualizar los campos con el nuevo artículo
    );

    return result; // Devuelve el resultado de la actualización
  } catch (error) {
    // Captura y maneja cualquier error que ocurra durante la operación
    console.error("Error al actualizar el artículo:", error);
    throw error; // Relanza el error para manejarlo si es necesario
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
      unit: unitType;
    };
  }[]
) {
  const articlesDB = await findArticles();

  // Recorremos los artículos que se quieren vender
  for (const article of articles) {
    // Buscamos el artículo en la base de datos
    const articleDBCurrent = articlesDB.find(
      (aDB) => aDB.code === article.code
    );

    if (articleDBCurrent) {
      // Cantidad total que se quiere vender
      let amountReal = Number(article.amount.value);

      // Multiplicamos el valor si es en bultos o palets
      if (article.amount.unit.value === "xBulk") {
        amountReal *= Number(articleDBCurrent.article.forBulk.value);
      } else if (article.amount.unit.value === "xPalet") {
        amountReal *= Number(articleDBCurrent.article.pallet.value);
      }

      // Ordenamos los lotes por fecha de caducidad más próxima
      const sortedBatches = [...articleDBCurrent.batches].sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime()
      );

      // Actualización de lotes considerando la unidad y la fecha de caducidad
      let remainingAmount = amountReal;
      const updatedBatches = sortedBatches.map((batch) => {
        if (remainingAmount > 0) {
          let batchQuantity =
            article.amount.unit.value === "xBulk"
              ? batch.quantityBulk
              : article.amount.unit.value === "xPalet"
              ? batch.quantityPallet
              : batch.quantity;

          if (batchQuantity >= remainingAmount) {
            // Si el lote actual cubre la cantidad restante
            if (article.amount.unit.value === "xBulk") {
              batch.quantityBulk -= remainingAmount;
            } else if (article.amount.unit.value === "xPalet") {
              batch.quantityPallet -= remainingAmount;
            } else {
              batch.quantity -= remainingAmount;
            }
            remainingAmount = 0;
          } else {
            // Si el lote actual no cubre toda la cantidad restante
            remainingAmount -= batchQuantity;
            if (article.amount.unit.value === "xBulk") {
              batch.quantityBulk = 0;
            } else if (article.amount.unit.value === "xPalet") {
              batch.quantityPallet = 0;
            } else {
              batch.quantity = 0;
            }
          }
        }
        return batch;
      });

      // Actualizamos la cantidad total en stock y los lotes
      const newAmount =
        Number(articleDBCurrent.article.stock.amount) - amountReal;

      try {
        const res = await db.articles.updateAsync(
          { code: articleDBCurrent.code },
          {
            $set: {
              "article.stock.amount": newAmount,
              batches: updatedBatches,
            },
          }
        );
        console.log("ARTICULO ACTUALIZADO", res);
      } catch (err) {
        console.log("NO SE PUDO ACTUALIZAR", err);
      }
    } else {
      console.log("No se encontró el artículo en la base de datos", article);
    }
  }
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

export const reStock = async (e: {
  articleCode: string;
  amount: { value: number; unit: unitType };
  batch: string;
  expirationDate: string;
}) => {
  // Obtener el artículo de la base de datos
  const articleDBCurrent = await getArticleByCode(e.articleCode);

  if (articleDBCurrent) {
    const actuallyAmount = articleDBCurrent.article.stock.amount;
    let realAmount = calculateRealAmount(e.amount, articleDBCurrent);

    // Crear el nuevo lote con la cantidad correspondiente
    const newBatch = {
      lotNumber: e.batch,
      quantity: e.amount.unit.value === "unit" ? e.amount.value : 0,
      quantityBulk: e.amount.unit.value === "xBulk" ? e.amount.value : 0,
      quantityPallet: e.amount.unit.value === "xPallet" ? e.amount.value : 0,
      expirationDate: e.expirationDate,
    };

    // Agregar el lote y actualizar el stock total
    const newBatches = [...articleDBCurrent.batches, newBatch];
    const newStockValue = Number(actuallyAmount) + Number(realAmount);

    console.log(articleDBCurrent, "FARLOPEADITOSOSOSOSO");

    const newHistorys = [
      ...articleDBCurrent.history,
      {
        type: "restock",
        date: new Date().toISOString(),
        quantity: realAmount,
        remainingStock: (articleDBCurrent.article.stock.amount += realAmount),
        message: `Restock de ${e.amount.value} ${e.amount.unit.label} del artículo ${articleDBCurrent.article.name}`,
      },
    ];

    // Actualizar en la base de datos
    try {
      const res = await db.articles.updateAsync(
        { code: articleDBCurrent.code },
        {
          $set: {
            "article.stock.amount": newStockValue,
            batches: newBatches,
            history: newHistorys,
          },
        }
      );
      console.log("Artículo actualizado", res);
    } catch (err) {
      console.error("No se pudo actualizar el artículo", err);
    }
  } else {
    console.warn("Artículo no encontrado en la base de datos");
  }

  return true;
};

// Función para calcular el stock real según el tipo de unidad
const calculateRealAmount = (
  amount: { value: number; unit: unitType },
  article: articleData
) => {
  console.log("CANTIDAD", amount, "ARTICLEE", article);
  switch (amount.unit.value) {
    case "xBulk":
      return amount.value * article.article.forBulk.value;
    case "xPallet":
      return amount.value * article.article.pallet.value;
    default:
      return amount.value;
  }
};

////////////////////////////////////////////////////////////
////////FUNCIONES DE METODOS DE PAGO payMethod.db////////
//////////////////////////////////////////////////////////

export const getPayMethods = async () => {
  return await db.payMethod.findAsync({});
};

export const addPayMethod = async (pm: string) => {
  const newMethod = {
    name: pm,
    salesWithThisMethod: 0,
    totalSoldWithThisMethod: 0,
  };
  return await db.payMethod
    .insertAsync(newMethod)
    .then((res) => {
      return { save: true, res: res };
    })
    .catch((err) => {
      return { save: false, error: err };
    });
};
export const removePayMethod = async (pmToDelete: string) => {
  return await db.payMethod
    .removeAsync(
      {
        _id: pmToDelete,
      },
      {}
    )
    .then((res) => {
      return { delete: true, res: res };
    })
    .catch((err) => {
      return { delete: false, error: err };
    });
};
export const updatePayMethod = async (id: string, pmUpdate: pmType) => {
  return await db.payMethod.updateAsync({ _id: id }, { $set: pmUpdate });
};
////////////////////////////////////////////////////////////
////////FUNCIONES DE CLIENTES ARCHIVO ventasFile.js////////
//////////////////////////////////////////////////////////
export const saveSale = async (a: saleData) => {
  const articlesTotalSold = a.articles.map((ar) => ar.total);
  console.log("TOTAL VENDIDO", articlesTotalSold);
  const soldTotal = articlesTotalSold.reduce((acc, ad) => {
    return Number(acc) + Number(ad);
  });
  console.log("TOTAL VENDIDO 2", soldTotal);

  const saleToSave = {
    ...a,
    dateOfRegister: getCurrentDateAndTime(),
    sold: soldTotal,
  };
  const resultSave = await db.sales
    .insertAsync(saleToSave)
    .then((saleResult) => {
      console.log(saleResult, "SE GUARDO CORRECTAMENTE");
      return { save: true, res: saleResult };
    })
    .catch((err) => {
      console.log(err, "error al guardar la venta");
      return { save: false, res: err };
    });

  return resultSave;
};
export const verifStockOfArticles = async (
  articlesOfSale: {
    name: string;
    code: string;
    total: number | string;
    amount: {
      value: string;
      unit: unitType;
    };
  }[]
) => {
  const articles = await findArticles();

  // Resultado inicial para artículos con stock insuficiente
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
      const stockAmount = Number(articleToSee.article.stock.amount);
      const amountNeeded = Number(article.amount.value);

      // Calcular el total necesario basado en la unidad
      let totalNecesary = amountNeeded;
      if (
        article.amount.unit.value === "xPalet" &&
        articleToSee.article.pallet.active
      ) {
        totalNecesary *= articleToSee.article.pallet.value;
      } else if (
        article.amount.unit.value === "xBulk" &&
        articleToSee.article.forBulk.active
      ) {
        totalNecesary *= articleToSee.article.forBulk.value;
      }

      // Verificación de stock insuficiente
      if (stockAmount < totalNecesary) {
        insufficientItems.push({
          articleCode: article.code || article.name,
          amount: article.amount.value || "no",
          name: article.name,
        });
      }
    }
  });

  return {
    value: insufficientItems.length > 0,
    insufficientItems,
  };
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
const payMethod = (_e: string) => {
  return "PROXIMAMENTE";
};
const getCurrentDateAndTime = () => {
  const date = new Date();

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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
  let clientVerif;
  if (venta.buyer.client.active) {
    clientVerif = await clientConfirmData(venta.buyer.client.clientData);
  }
  console.log("VERIFICANDO CLIENTE", clientVerif);
  if (clientVerif === false) {
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

  return resultToProcess;
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
  _edit?: boolean
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
    .then(() => {
      return {
        message: "Proveedor guardado correctamente",
        value: true,
      };
    })
    .catch(() => {
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
    .then((_res) => {
      return {
        message: "Proveedor eliminado correctamente",
        value: true,
      };
    })
    .catch((_err) => {
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
        });
      }
    });
  });
};

export const accountToPay = async (account: object) => {
  return new Promise((resolve, reject) => {
    db.accounts.insert(account, (err, newDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc); // Devolver la cuenta guardada con su nuevo ID y datos completos
      }
    });
  });
};

export const actualizarCuenta = (idCuenta: string, datosActualizados: any) => {
  if (idCuenta == null || datosActualizados == null) {
    return Promise.reject("ID de la cuenta o datos actualizados no válidos");
  }

  delete datosActualizados._id;

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
          resolve(numReplaced);
        }
      }
    );
  });
};

export const obtenerEstadosPagadosInicial = async () => {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err: any, docs: any[]) => {
      if (err) {
        reject(err);
      } else {
        const estados = docs.reduce(
          (
            acc: { [x: string]: any },
            doc: { _id: string | number; pagado: any }
          ) => {
            acc[doc._id] = doc.pagado;
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

export const actualizarImagenUsuario = (userId: any, imageUrl: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      {},
      (err, numReplaced) => {
        if (err) {
          reject(err);
        } else if (numReplaced === 0) {
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
  console.log(usuarioAdmin);
  try {
    const hashedPassword = await bcrypt.hash(usuarioAdmin.password, saltRounds);
    const usuarioConPasswordEncriptado = {
      ...usuarioAdmin,
      password: hashedPassword,
      esAdmin: true,
    };

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
          faltapago: admin.faltapago,
        });
      } else {
        resolve({ existeAdmin: false });
      }
    });
  });
};

const secretKey = "tu_clave_secreta";

export const iniciarSesion = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
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
    const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);
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
  console.log(usuario, "estos son los datos que recibo");
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

//actualiza senotifico para no volver a notificarle varias veses la misma cuenta
export const actualizarSenotifico = (idCuenta: any, estadoSenotifico: any) => {
  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: { senotifico: estadoSenotifico } },
      {},
      (err, numUpdated) => {
        if (err) {
          reject(err);
        } else {
          resolve(numUpdated);
        }
      }
    );
  });
};

export async function getAccountsToPay20() {
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

// Función para actualizar una cuenta en la base de datos
export const updateAccountInDb = async (id: any, updatedAccount: any) => {
  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: id }, // Condición para encontrar la cuenta por su _id
      { $set: updatedAccount }, // Actualización de la cuenta
      {},
      (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced); // Devolver el número de documentos actualizados
        }
      }
    );
  });
};

// Función para obtener todas las cuentas actualizadas
export async function getAccountsToPay20editar() {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err: any, docs: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs); // Devolver todas las cuentas
      }
    });
  });
}

// Guardar una nueva notificación
export const saveNotification = async (data: any) => {
  try {
    const newNotification = await db.notifications.insertAsync(data);
    return newNotification;
  } catch (error) {
    console.error("Error al guardar la notificación:", error);
    throw error;
  }
};

// Obtener todas las notificaciones
export const getNotifications = async () => {
  const notif = db.notifications.findAsync({});
  return await notif;
};

// Eliminar una notificación por ID
export const deleteNotification = async (notificationId: any) => {
  return await db.notifications.removeAsync({ _id: notificationId }, {});
};

// Marcar una notificación como vista
export const markNotificationAsRead = async (notificationId: any) => {
  try {
    await db.notifications.updateAsync(
      { _id: notificationId },
      { $set: { visto: true } }
    );
  } catch (error) {
    console.error("Error al marcar la notificación como vista:", error);
    throw error;
  }
};

export const hideNotification = async (notificationId: any) => {
  try {
    await db.notifications.updateAsync(
      { _id: notificationId },
      { $set: { oculta: true } }
    );
  } catch (error) {
    console.error("Error al ocultar la notificación:", error);
    throw error;
  }
};

export const disableNotificationType = async (tipo: any) => {
  try {
    await db.notifiDesactivada.insertAsync({ tipo });
  } catch (error) {
    console.error("Error al desactivar el tipo de notificación:", error);
    throw error;
  }
};

// Función para obtener los tipos de notificación desactivados
export const getDisabledNotificationTypes = async () => {
  try {
    const disabledTypes = await db.notifiDesactivada.findAsync({});
    return disabledTypes.map((item) => item.tipo);
  } catch (error) {
    console.error(
      "Error al obtener los tipos de notificación desactivados:",
      error
    );
    return [];
  }
};

/////funcion que guarda notifiaciones del servidor
export const saveNotificationn = async (notificationn: any) => {
  try {
    // Utilizamos db.notifications que ya tienes configurada con @seald-io/nedb
    const result = await db.notifications.insertAsync(notificationn);
    return result; // Devuelve la notificación guardada
  } catch (error) {
    console.error(
      "Error al guardar la notificación en la base de datos:",
      error
    );
    throw new Error("No se pudo guardar la notificación");
  }
};

// Función para eliminar notificaciones antiguas mas de 30 dias
export const deleteOldNotifications = async (thresholdDate: any) => {
  try {
    const thresholdISOString = thresholdDate.toISOString();
    await db.notifications.removeAsync(
      { fechaHora: { $lt: thresholdISOString } },
      { multi: true }
    );
    console.log(
      `Notificaciones anteriores a ${thresholdISOString} eliminadas.`
    );
  } catch (error) {
    console.error("Error al eliminar notificaciones antiguas:", error);
    throw error;
  }
};

///////////////////////funcion que guarda la eicion de las cuneta para el histial
export const saveHistorialCuenta = async (historialData: {
  cuenta: any;
  fecha_edicion: any;
  fecha_edicionHora: any;
}) => {
  try {
    await db.cuentasHistorial.insertAsync({
      fecha_edicion: historialData.fecha_edicion, // Fecha de edición (solo la fecha)
      fecha_edicionHora: historialData.fecha_edicionHora, // Hora de edición (solo la hora)
      cuenta: historialData.cuenta, // Guardar la cuenta completa anidada
    });
  } catch (error) {
    console.error("Error al guardar historial de cuenta:", error);
    throw error;
  }
};

export const getAccountById = async (id: string) => {
  return new Promise((resolve, reject) => {
    db.accounts.findOne({ _id: id }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

// Función para obtener el historial de una cuenta por su ID

export const getHistorialCuentaPorId = async (idCuenta: string) => {
  return new Promise((resolve, reject) => {
    db.cuentasHistorial.find(
      { "cuenta._id": idCuenta },
      (err: any, docs: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs); // Devuelve todas las coincidencias con el idCuenta
        }
      }
    );
  });
};

export const actualizarUsuariosAdmin = async (camposActualizados: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update(
      { esAdmin: true },
      { $set: camposActualizados },
      { multi: true },
      (err, numUpdated) => {
        if (err) {
          console.error("Error al actualizar los usuarios admin:", err);
          reject(err);
        } else {
          resolve(numUpdated > 0);
        }
      }
    );
  });
};

function getDatabasee() {
  throw new Error("Function not implemented.");
}

// Generar datos de ejemplo para 400 artículos
const generateRandomArticles = async (count: number) => {
  const articles = [];

  for (let i = 0; i < count; i++) {
    const categoria = {
      value: `Categoría ${i % 5}`,
      label: `Categoría ${i % 5}`,
    };
    const marca = { value: `Marca ${i + 1}`, label: `Marca ${i + 1}` };
    const profit = Math.floor(Math.random() * 101); // Genera un porcentaje entre 0 y 100
    const cost = Math.round(Math.random() * 100); // Genera un costo aleatorio entre 0 y 100
    const sale = cost + (cost * profit) / 100; // Calcula el precio de venta sumando el porcentaje de ganancia al costo

    // Generar una fecha aleatoria de hace entre 1 y 365 días
    const randomPastDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split("T")[0];

    // Generar lotes con fechas de caducidad aleatorias en el futuro
    const batches = Array.from({ length: 5 }, (_) => ({
      lotNumber: `Lote${i + 1}`,
      quantity: Math.floor(Math.random() * 500),
      quantityBulk: Math.floor(Math.random() * 20),
      quantityPallet: Math.floor(Math.random() * 5),
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      )
        .toISOString()
        .split("T")[0], // Fecha aleatoria en el futuro
    }));

    const stock = batches.reduce((a, b) => {
      let be = b.quantity + b.quantityBulk * 10 + b.quantityPallet * 50;
      return a + be;
    }, 0);

    const article = {
      article: {
        name: `Artículo ${i + 1}`,
        costo: cost,
        venta: sale,
        profit: profit,
        stock: {
          amount: stock,
          unit: { label: "Kilogramos", value: "kilogramos", abrevUnit: "Kg" },
          minStock: Math.floor(Math.random() * 50),
        },
        grossWeight: { value: Math.random() * 10, approx: false },
        liquidWeight: { value: Math.random() * 8, approx: false },
        pallet: { active: true, value: 50 },
        quantityperunit: { active: true, value: 20 },
        forBulk: { active: true, value: 10 },
        description: `Descripción del artículo ${i + 1}`,
      },
      brand: marca,
      code: generateCodeArticle(categoria.value, marca.value),
      barcode: `BARCODE${1000 + i}`,
      category: categoria,
      subCategory: {
        value: `Subcategoría ${i % 3}`,
        label: `Subcategoría ${i % 3}`,
      },
      dateToRegister: randomPastDate,
      supplier: { name: `Proveedor ${i % 10}`, contact: "contact@example.com" },
      sales: [],
      taxes: [
        {
          name: "IVA",
          percentage: 21,
          type: { costPrice: true, finalPrice: true },
        },
      ],
      batches: batches,
      history: [
        {
          type: "register",
          date: randomPastDate,
          quantity: stock,
          remainingStock: stock,
          message: `Artículo registrado`,
        },
      ],
    };

    await db.articles.insertAsync(article);
  }
};
// // // Inserta artículos en la base de datos
//generateRandomArticles(400);
