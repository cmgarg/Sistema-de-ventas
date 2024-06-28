import React, { useState, useEffect } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function UsuarioModal({ isOpen, onClose }) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    password: "",
    imageUrl: "/imagen-usuario/user-1.jpg",
    permisos: {
      gerente: true,
      Logistica: false,
      ventas: false,
      stock: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setUsuario((prev) => ({
      ...prev,
      permisos: {
        gerente: false,
        Logistica: false,
        ventas: false,
        stock: false,
        [name]: true,
      },
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const Cerrar = () => {
    onClose();
    setShowPassword(false);
    setUsuario({
      nombre: "",
      password: "",
      imageUrl: "/imagen-usuario/user-1.jpg",
      permisos: {
        gerente: true,
        Logistica: false,
        ventas: false,
        stock: false,
      },
    });
  };

  const handleSave = () => {
    console.log("Guardando datos del usuario:", usuario);
    onClose(); // Cierra el modal después de guardar
    // Envía los datos del formulario al backend
    window.api.enviarEvento("guardar-usuario-secundario", usuario);
    setUsuario({
      nombre: "",
      password: "",
      imageUrl: "/imagen-usuario/user-1.jpg",
      permisos: {
        gerente: true,
        Logistica: false,
        ventas: false,
        stock: false,
      },
    });
  };

  // Verificación de que se guardó correctamente
  window.api.recibirEvento("respuesta-guardar-usuario", (respuesta) => {
    if (respuesta.exito) {
      console.log("Usuario secundario guardado con éxito", respuesta.usuario);
      //onAdminCreated(respuesta.usuario); // Haz algo después de crear el admin
    } else {
      console.error("Error al guardar el usuario secundario", respuesta.error);
    }
  });
const isSaveDisabled = !usuario.nombre || !usuario.password;
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !isSaveDisabled) {
        handleSave();
      } else if (event.key === "Escape") {
        Cerrar();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isSaveDisabled]);

  if (!isOpen) return null;

  

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="flex bg-gray-700 rounded-3xl relative justify-start text-white border-gray-50 border flex-col p-10 max-w-lg w-full"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <h2 className="text-white text-2xl m-4">Agregar Nuevo Usuario</h2>
        <div className="flex flex-col p-3">
          <label className="text-xl p-2">Nombre del usuario</label>
          <input
            type="text"
            name="nombre"
            placeholder="Usuario"
            value={usuario.nombre}
            onChange={handleInputChange}
            className="bg-slate-700 rounded-md outline-none m-2 text-xl p-2"
          />

          <label className="text-xl p-2">Contraseña</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={usuario.password}
              onChange={handleInputChange}
              className="bg-slate-700 rounded-md outline-none m-2 text-xl p-2 w-full pr-10"
            />
            <div
              onClick={toggleShowPassword}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <BsEyeFill size={25} /> : <BsEyeSlashFill size={25} />}
            </div>
          </div>

          {/* Permiso de uso */}
          <div className="mt-4">
            <div className="text-lg mb-2 select-none">Permisos de uso:</div>
            {Object.keys(usuario.permisos).map((key) => (
              <label className="flex items-center space-x-2" key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={usuario.permisos[key]}
                  onChange={handleCheckboxChange}
                  className="accent-blue-500 h-5 w-5"
                />
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </label>
            ))}
          </div>
          {usuario.permisos.Logistica && (
            <div className="mt-5">
              Accesos:
              <p>• Ventas con selección de vendedor</p>
              <p>• Artículos</p>
              <p>• Stock</p>
              <p>• Clientes</p>
              <p>• Facturación</p>
            </div>
          )}

          {usuario.permisos.gerente && (
            <div className="mt-5">
              Accesos:
              <p>• Ventas con selección de vendedor</p>
              <p>• Artículos</p>
              <p>• Stock</p>
              <p>• Clientes</p>
              <p>• Estadísticas</p>
            </div>
          )}

          {usuario.permisos.stock && (
            <div className="mt-5">
              Accesos:
              <p>• Stock</p>
            </div>
          )}

          {usuario.permisos.ventas && (
            <div className="mt-5">
              Accesos:
              <p>• Ventas</p>
              <p>• Artículos</p>
              <p>• Stock</p>
              <p>• Clientes</p>
            </div>
          )}
          <div className="flex border border-gray-600 text-red-700 p-2 rounded-md mt-2">
            Puede acceder a una configuración avanzada en la sección "Configuración avanzada" dentro de los permisos de usuarios.
          </div>

          <div className="flex justify-around">
            <button
              onClick={Cerrar}
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-3 mt-10 p-2 pr-4"
            >
              Cerrar
            </button>

            <button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={`font-bold py-2 px-4 rounded m-3 mt-10 ${isSaveDisabled ? 'bg-gray-500' : 'bg-blue-800 hover:bg-blue-700 text-white'}`}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuarioModal;
