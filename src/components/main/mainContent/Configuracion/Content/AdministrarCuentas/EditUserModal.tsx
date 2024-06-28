import React, { useState, useEffect } from "react";

function EditUserModal({ isOpen, onClose, user, onSave }) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    password: "",
    permisos: {
      gerente: false,
      logistica: false,
      ventas: false,
      stock: false,
    },
  });
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsuario({ ...user });
      setChangePassword(false);
      setNewPassword("");
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermisosChange = (event) => {
    const { name } = event.target;
    setUsuario((prev) => ({
      ...prev,
      permisos: {
        gerente: false,
        logistica: false,
        ventas: false,
        stock: false,
        [name]: true,
      },
    }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);
  };

  const Cerrar = () => {
    onClose();
    setChangePassword(false);
  };

  const handleSave = () => {
    const updatedUser = { ...usuario };
    if (changePassword) {
      updatedUser.password = newPassword;
    }
    window.api.enviarEvento("guardar-usuario-editado", updatedUser);
    onSave(updatedUser);
    onClose(); // Cierra el modal después de guardar
  };

  if (!isOpen || !user) return null;

  const isSaveDisabled = !usuario.nombre || (changePassword && !newPassword);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="flex bg-gray-700 rounded-3xl relative justify-start text-white border-gray-50 border flex-col p-10 max-w-lg w-full"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <h2 className="text-white text-2xl m-4">Editar Usuario</h2>
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
          {changePassword ? (
            <div className="relative flex items-center">
              <input
                type="password"
                name="newPassword"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={handlePasswordChange}
                className="bg-slate-700 rounded-md outline-none m-2 text-xl p-2 w-full"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-2 border border-gray-600 rounded-lg p-3">
              <p className="m-2 text-xl text-red-700">
                Solo se puede cambiar la contraseña, no se puede modificar. ¿Deseas cambiarla?
              </p>
              <input
                type="checkbox"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
                className="accent-blue-500 h-10 w-10"
              />
            </div>
          )}

          {/* Permiso de uso */}
          <div className="mt-4">
            <div className="text-lg mb-2 select-none">Permisos de uso:</div>
            {Object.keys(usuario.permisos).map((key) => (
              <label className="flex items-center space-x-2" key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={usuario.permisos[key]}
                  onChange={handlePermisosChange}
                  className="accent-blue-500 h-5 w-5"
                />
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </label>
            ))}
          </div>
          {usuario.permisos.logistica && (
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
              className={`font-bold py-2 px-4 rounded m-3 mt-10 ${
                isSaveDisabled ? "bg-gray-500" : "bg-blue-800 hover:bg-blue-700 text-white"
              }`}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
