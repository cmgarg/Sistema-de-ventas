import React, { useState, ChangeEvent, MouseEvent } from "react";

interface CrearUsuarioAdminProps {
  setAdminExists: (exists: boolean) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordconfir: string;
  ubicacion: string;
  direccion: string;
  codigopostal: string;
  imageUrl: string;
  recuperacioncuenta: string;
  bloqueo: string;
}

const CrearUsuarioAdmin: React.FC<CrearUsuarioAdminProps> = ({ setAdminExists }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    passwordconfir: "",
    ubicacion: "",
    direccion: "",
    codigopostal: "",
    imageUrl: "/imagen-usuario/user-1.jpg",
    recuperacioncuenta: "3",
    bloqueo: "CMG2024-Company",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Envía los datos del formulario al backend
    window.api.enviarEvento("guardar-usuario-admin", formData);
    setAdminExists(true);
  };

  // Agrega esto fuera de tu función de handleSubmit, quizás en un useEffect si estás familiarizado con él
  window.api.recibirEvento("respuesta-guardar-usuario-admin", (respuesta: any) => {
    if (respuesta.exito) {
      console.log(
        "Usuario administrador guardado con éxito",
        respuesta.usuarioAdmin
      );
      onAdminCreated(respuesta.usuarioAdmin); // Haz algo después de crear el admin
    } else {
      console.error(
        "Error al guardar el usuario administrador",
        respuesta.error
      );
    }
  });

  console.log(formData);

  return (
    <div className=" flex flex-1 items-center justify-center text-white bg-gradient-to-b to-blue-950 from-slate-800">
      <div className="flex flex-col items-center justify-center border border-gray-600 rounded-lg">
        <h1 className=" p-5 text-2xl">Punto De Venta CMG</h1>
        <p>Crea tu cuenta ADMIN.</p>

        <div className=" flex flex-col p-5">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="text"
            id="username"
            placeholder="Empresa, Negocio, Etc."
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo electrónico:</label>

          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="email"
            id="email"
            placeholder="usuario@hotmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="password"
            id="password"
            placeholder="******"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="passwordconfir">Confirmar Contraseña:</label>
          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="password"
            id="passwordconfir"
            name="passwordconfir"
            placeholder="******"
            value={formData.passwordconfir}
            onChange={handleChange}
            required
          />
          <label htmlFor="ubicacion">Pais, Provincia, Ciudad:</label>

          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="text"
            id="ubicacion"
            placeholder="Pais, Provoncia, Ciudad..."
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
          <label htmlFor="direccion">Direccion:</label>

          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="text"
            id="direccion"
            placeholder="leopoldo 123"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

          <label htmlFor="codigopostal">Codigo postal:</label>

          <input
            className=" border border-gray-600 bg-slate-800 focus:outline-none m-3 p-1"
            type="text"
            id="codigopostal"
            placeholder="0000"
            name="codigopostal"
            value={formData.codigopostal}
            onChange={handleChange}
            required
          />

          <button
            className=" bg-green-600 p-3 hover:bg-green-700 active:bg-green-800 rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Crear administrador
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuarioAdmin;
function onAdminCreated(usuarioAdmin: any) {
  throw new Error("Function not implemented.");
}

