export const getDate = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const date = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year.toString()}`;

  return date;
};
export const verificarToken = (token: any) => {
  const jwt = require("jsonwebtoken");
  const secretKey = "tu_clave_secreta"; // Asegúrate de usar una clave secreta segura y única
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};
