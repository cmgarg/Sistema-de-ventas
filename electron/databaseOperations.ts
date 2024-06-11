import crypto from "crypto";

import {
  articleData,
  clientData,
  dataToEditArticle,
  saleData,
  unitType,
} from "../types";
import Datastore from "@seald-io/nedb";
import { getDate } from "./vFunctions";
import jwt from "jsonwebtoken";
const db = {
  clients: new Datastore({ filename: "database/clients.db", autoload: true }),
  articles: new Datastore({ filename: "database/articles.db", autoload: true }),
  sales: new Datastore({ filename: "database/sales.db", autoload: true }),
  accounts: new Datastore({ filename: "database/accounts.db", autoload: true }),
  users: new Datastore({ filename: "database/users.db", autoload: true }),
  filters: new Datastore({ filename: "database/filters.db", autoload: true }),
  usuariosAdmin:new Datastore({ filename: "database/usuarios.db", autoload: true }),
  usuarios:new Datastore({ filename: "database/sub-usuarios.db", autoload: true }),
  unitsArticleForm: new Datastore({
    filename: "database/unitsArticleForm.db",
    autoload: true,
  }),
};
//funciones para manejar clientes y demas
export const saveClient = async (data: object) => {
  await db.clients
    .insertAsync(data)
    .then((res) => {
      console.log("Cliente guardado con exito", res);
    })
    .catch((err) => {
      console.log("Error al guardar el cliente", err);
    });
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
  console.log("ACA ERSTAMOS");
  await db.clients
    .removeAsync({ _id: data._id }, {})
    .then((data) => {
      console.log("Cliente eliminado", data);

      return { clientDelete: data };
    })
    .catch((err) => {
      console.log("No se ha podido eliminar el cliente", err);

      return false;
    });
};
export const findClients = async () => {
  const clients = await db.clients
    .findAsync({})
    .then((clients: any) => {
      console.log("clientes encontrados", clients);
      return clients;
    })
    .catch((err: any) => {
      console.log("Error al tratar de encontrar clientes", err);
    });
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
          console.log("hubo un error ", err);
          reject(err);
        } else {
          console.log("todo salio bien se actualizo el cliente", updateData);
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
    .then((res) => {
      console.log("Articulo guardado correctamente", res);
    })
    .catch((err) => {
      console.log("No se pudo guardar el articulo", err);
    });
};
export const getArticleByCode = async (
  articleCode: string
): Promise<articleData> => {
  console.log("SE RESPONDE a la peticion de ", articleCode);
  return await db.articles.findOneAsync({ code: articleCode });
};
// function getArticleByName(articleName: string) {
//   return new Promise((resolve, reject) => {
//     db.articles.find({ articulo: articleName }, (err: any, doc: any) => {
//       if (err) {
//         console.log("error al buscar el Articulo", err);
//         reject(err);
//       } else {
//         console.log("Artciulo encontrado", doc);
//         resolve(doc);
//       }
//     });
//   });
// }
export const editArticle = async (articleEdit: dataToEditArticle) => {
  console.log(articleEdit);
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
    console.log("ARTICULO ACTUALIZADO CORRECTAMENTE", numAffected);
    return true;
  } else {
    console.log("NO SE PUDO ACTUALIZAR EL ARTICULO", numAffected);
    return false;
  }
};
export const findArticles = async (): Promise<articleData[]> => {
  return await db.articles
    .findAsync({})
    .then((doc: any) => {
      console.log("OBJETOS ENCONTRADOS ", doc);
      return doc;
    })
    .catch((err: any) => {
      console.log("ERROR AL BUSCAR OBJETOS ", err);
    });
};
export const deleteArticle = async (code: string) => {
  console.log("ACA ERSTAMOS");
  const numRemoved = await db.articles.removeAsync({ code: code }, {});

  if (numRemoved) {
    console.log("ARTICULO ACTUALIZADO CORRECTAMENTE", numRemoved);
    return true;
  } else {
    console.log("NO SE PUDO ACTUALIZAR EL ARTICULO", numRemoved);
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
  console.log(articleUpdate, "ARTICULO A ACTUALIZAR STOCK");
  const stock = articleUpdate.article.stock.amount;
  console.log(articleUpdate.article.stock.amount, "STOCK");
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
          console.log("HUBO UN ERROR DE LA CAJETA", err);
        } else {
          resolve(docs);
          console.log("TODO BIEN SALIO GIL DE MIERDA", docs);
        }
      }
    );
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
          console.log("HUBO UN ERROR DE LA CAJETA", err);
        } else {
          resolve(docs);
          console.log("TODO BIEN SALIO GIL DE MIERDA", docs);
        }
      }
    );
  });
}
//////////////////////////////////////////////////////
//FUNCIONES DE CLIENTES ARCHIVO ventasFile.js////////
////////////////////////////////////////////////////
export const saveSale = (a: saleData) => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();

  const articlesTotalSold = a.articles.map((ar) => ar.total);
  console.log("TOTAL VENDIDO", articlesTotalSold);
  const soldTotal = articlesTotalSold.reduce((acc, ad) => {
    return Number(acc) + Number(ad);
  });
  console.log("TOTAL VENDIDO 2", soldTotal);

  const saleToSave = {
    ...a,
    dateOfRegister: `${dia.toString().padStart(2, "0")}-${mes
      .toString()
      .padStart(2, "0")}-${año}`,
    sold: soldTotal,
  };
  const resultSave = db.sales
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
export const saleProcess = async (venta: saleData) => {
  //registrar venta
  await registBuyInArticle(venta);
  //registrar compra en cliente
  await registerBuyClient(venta);
  //GUARDAR VENTA

  const resultToProcess = saveSale(venta);

  return resultToProcess;
};
export const registBuyInArticle = async (saleInfo: saleData) => {
  const articlesOfSale = [...saleInfo.articles];

  articlesOfSale.map(async (article) => {
    const articleOfDb = article.code
      ? await getArticleByCode(article.code)
      : false;
    if (articleOfDb) {
      await db.articles
        .updateAsync(
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
        )
        .catch((error) => {
          console.log(
            error,
            "OCURRIO UN ERROR AL REGISTRAR LA COMPRA EN EL ARTICULO"
          );
        });
    }
  });
};
export const findSales = () => {
  return db.sales.findAsync({});
};
export const deleteSales = (data: any) => {
  console.log("ACA ERSTAMOS");
  db.sales.remove({ _id: data }, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Cliente eliminado:", newDoc);
    }
  });
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
  return await db.filters
    .insertAsync(category)
    .then((res) => {
      console.log("Se guardo la cateogria correctamente :", res);
    })
    .catch((err) => {
      console.log("No se pudo guardar la categoria", err);
    });
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
  return await db.filters
    .insertAsync(subCategory)
    .then((res) => {
      console.log("Se guardo la sub cateogria correctamente :", res);
    })
    .catch((err) => {
      console.log("No se pudo guardar la sub categoria", err);
    });
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
  return await db.filters
    .insertAsync(brand)
    .then((res) => {
      console.log("Se guardo la cateogria correctamente :", res);
    })
    .catch((err) => {
      console.log("No se pudo guardar la categoria", err);
    });
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
export const getUnits = async () => {
  return await db.unitsArticleForm.findAsync({});
};
export const saveNewUnits = async (e: unitType) => {
  return await db.unitsArticleForm
    .insertAsync({ ...e })
    .then((res) => {
      console.log("Unidad guardada correctamente", res);

      return {
        message: "Unidad guardada correctamente",
        value: res,
      };
    })
    .catch((err) => {
      console.log("No se pudo guardar la unidad", err);
      return {
        message: "No se pudo guardar la unidad",
        value: err,
      };
    });
};
export const updateUnit = async (e: unitType, id: string) => {
  return await db.unitsArticleForm
    .updateAsync({ _id: id }, e, {})
    .then((res) => {
      console.log("Unidad editada correctamente", res);

      return {
        message: "Unidad editada correctamente",
        value: res,
      };
    })
    .catch((err) => {
      console.log("No se pudo editar la unidad", err);
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
      console.log("Unidad eliminada correctamente", res);

      return {
        message: "Unidad eliminada correctamente",
        value: res,
      };
    })
    .catch((err) => {
      console.log("No se pudo eliminar la unidad", err);
      return {
        message: "No se pudo eliminar la unidad",
        value: err,
      };
    });
};
////////////////////////MARTIN

//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO cuentasFile.js////////
/////////////////////////////////////////////////////


export const obtenerEstadoPagado = (idCuenta:any) => {
  return new Promise((resolve, reject) => {
    db.accounts.findOne({ _id: idCuenta }, (err, doc) => {
      if (err) {
        console.error("Error al obtener el estado de pagado:", err);
        reject(err);
      } else {
        console.log("Estado de pagado obtenido:", doc.pagado);
        resolve(doc.pagado); // Suponiendo que 'doc.pagado' es el campo que contiene el estado de pagado
      }
    });
  });
};

export const accountToPay = (account: object) => {
  db.accounts.insert(account, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
};

export const actualizarCuenta = (idCuenta: string, datosActualizados: any) => {
  if (idCuenta == null || datosActualizados == null) {
    console.error(
      "Error: El ID de la cuenta y los datos actualizados no pueden ser nulos o indefinidos."
    );
    return Promise.reject("ID de la cuenta o datos actualizados no válidos");
  }

  // Eliminar el campo _id de los datos actualizados si existe
  delete datosActualizados._id;

  // Mostrar los datos que se van a actualizar
  console.log(`Actualizando cuenta con ID: ${idCuenta}`);
  console.log("Datos actualizados:", datosActualizados);

  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: datosActualizados },
      { multi: false },
      (err: any, numUpdated: number) => {
        if (err) {
          console.error("Error al actualizar la cuenta:", err);
          reject(err);
        } else {
          console.log(
            `Cuenta actualizada con éxito. Número de documentos actualizados: ${numUpdated}`
          );
          if (numUpdated === 0) {
            console.warn(
              "Advertencia: No se actualizó ningún documento. Verifique que el ID de la cuenta sea correcto."
            );
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
export const actualizarEstadoPagado = (idCuenta:any, estadoPagado:any) => {
  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: { pagado: estadoPagado } },
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
        const estados = docs.reduce((acc: { [x: string]: any; }, doc: { _id: string | number; pagado: any; }) => {
          acc[doc._id] = doc.pagado; // Suponiendo que `pagado` es un campo en tus documentos
          return acc;
        }, {});
        resolve(estados);
      }
    });
  });
};


export const getUser = (userId: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ _id: userId }, (err, admin) => {
      if (err) {
        console.error("Error al obtener el usuario:", err);
        reject(err);
      } else if (admin) {
        resolve(admin);
      } else {
        db.usuarios.findOne({ _id: userId }, (err, subUsuario) => {
          if (err) {
            console.error("Error al obtener el subusuario:", err);
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
  console.log(`Actualizando imagen del usuario ${userId} con URL: ${imageUrl}`);
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      {},
      (err) => {
        if (err) {
          console.error("Error al actualizar la imagen del usuario:", err);
          reject(err);
        } else {
          console.log("Imagen del usuario actualizada con éxito");
          resolve(true);
        }
      }
    );
  });
};


const bcrypt = require("bcrypt");
const saltRounds = 10;

export const guardarUsuarioAdmin = async (usuarioAdmin: { password: any; }) => {
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
  } catch (error:any) {
    console.error("Error al encriptar el password del usuario administrador:", error);
    throw new Error(error.message);
  }
};

export const verificarAdminExistente = () => {
  return new Promise((resolve, reject) => {
    console.log("Iniciando verificación de admin existente..."); // Log para iniciar la verificación
    db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
      if (err) {
        console.error("Error al buscar el administrador:", err); // Log de error
        reject(err);
      } else if (admin) {
        console.log("Administrador encontrado:", admin); // Log del admin encontrado
        resolve({
          existeAdmin: true,
          recuperacioncuenta: admin.recuperacioncuenta,
        });
      } else {
        console.log("No se encontró un administrador."); // Log de admin no encontrado
        resolve({ existeAdmin: false });
      }
    });
  });
};









const secretKey = "tu_clave_secreta"; // Asegúrate de usar una clave secreta segura y única

export const iniciarSesion = async (credentials: { username: string; password: string }) => {
  console.log("Iniciar sesión con credenciales:", credentials);

  try {
    // Primero, buscamos en la colección de administradores
    const usuarioAdmin = await new Promise<any>((resolve, reject) => {
      db.usuariosAdmin.findOne({ username: credentials.username }, (err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });

    if (usuarioAdmin) {
      console.log("Usuario administrador encontrado:", usuarioAdmin);
      if (bcrypt.compareSync(credentials.password, usuarioAdmin.password)) {
        const token = jwt.sign({ userId: usuarioAdmin._id, isAdmin: true }, secretKey, {
          expiresIn: "4464h",
        });
        return {
          exito: true,
          token,
          userId: usuarioAdmin._id,
        };
      } else {
        console.log("Contraseña incorrecta para el usuario administrador.");
        return { exito: false, mensaje: "Contraseña incorrecta" };
      }
    } else {
      // Si no encontramos un usuario administrador, buscamos en la colección de subusuarios
      console.log("No se encontró un usuario administrador, buscando subusuario...");
      const subUsuario = await new Promise<any>((resolve, reject) => {
        db.usuarios.findOne({ username: credentials.username }, (err, doc) => {
          if (err) reject(err);
          else resolve(doc);
        });
      });

      if (subUsuario) {
        console.log("Subusuario encontrado:", subUsuario);
        if (bcrypt.compareSync(credentials.password, subUsuario.password)) {
          const token = jwt.sign({ userId: subUsuario._id, isAdmin: false }, secretKey, {
            expiresIn: "4464h",
          });
          return {
            exito: true,
            token,
            userId: subUsuario._id,
          };
        } else {
          console.log("Contraseña incorrecta para el subusuario.");
          return { exito: false, mensaje: "Contraseña incorrecta" };
        }
      } else {
        console.log("No se encontró un subusuario con ese nombre de usuario.");
        return { exito: false, mensaje: "Usuario no encontrado" };
      }
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
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
        console.error("Error al buscar el administrador:", err);
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
        console.error("Error al buscar el administrador:", err);
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
      db.usuariosAdmin.update({ _id: userId }, { $set: { password: hashedPassword } }, {}, (err) => {
        if (err) {
          console.error('Error al actualizar la contraseña:', err);
          reject({ exito: false, error: err.message });
        } else {
          console.log('Contraseña actualizada con éxito');
          resolve({ exito: true });
        }
      });
    });
  } catch (error:any) {
    console.error('Error al encriptar la nueva contraseña:', error);
    throw new Error(error.message);
  }
};


export const restarRecuperacionCuenta = async (userId: any) => {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update({ _id: userId }, { $inc: { recuperacioncuenta: -1 } }, {}, async (err, _numAffected) => {
      if (err) {
        reject(err);
      } else {
        const usuarioActualizado = await getUser(userId);
        resolve(usuarioActualizado);
      }
    });
  });
};

export const reiniciarRecuperacionCuenta = async (userId: any) => {
  return new Promise<void>((resolve, reject) => {
    db.usuariosAdmin.update({ _id: userId }, { $set: { recuperacioncuenta: 3 } }, {}, (err, _numAffected) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const guardarUsuarioSecundario = async (usuario: { password: any; }) => {
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
    db.usuarios.update({ _id: userId }, { $set: { imageUrl: imageUrl } }, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const actualizarPermisosUsuario = (userId: any, nuevosPermisos: any) => {
  return new Promise((resolve, reject) => {
    db.usuarios.update({ _id: userId }, { $set: { permisos: nuevosPermisos } }, {}, (err, _numReplaced) => {
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
    });
  });
};

export const actualizarUsuario = (userId: any, updatedUser: any) => {
  return new Promise((resolve, reject) => {
    db.usuarios.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
};

export const obtenerPermisosUsuario = async (userId: any) => {

  try {

    let usuario = await db.usuariosAdmin.findOneAsync({ _id: userId })
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
  } catch (error:any) {
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

export const eliminarCuenta = async (id:any) => {
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
