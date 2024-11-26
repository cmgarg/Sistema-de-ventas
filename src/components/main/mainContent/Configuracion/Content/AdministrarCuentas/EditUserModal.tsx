import React, { useState, useEffect, ChangeEvent } from "react";
import ButtonR from "../../../buttons/ButtonR";

interface Permisos {
  gerente: boolean;
  logistica: boolean;
  ventas: boolean;
  stock: boolean;
}

interface Usuario {
  _id: string;
  nombre: string;
  password: string;
  permisos: Permisos;
  imageUrl: string; // Asegúrate de que esta propiedad esté incluida
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Usuario | null; // Usa 'Usuario' aquí
  onSave: (user: Usuario) => void; // Usa 'Usuario' aquí
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [usuario, setUsuario] = useState<Usuario>({
    _id: "",
    nombre: "",
    password: "",
    permisos: {
      gerente: false,
      logistica: false,
      ventas: false,
      stock: false,
    },
    imageUrl: "",
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermisosChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setUsuario((prev) => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [name]: event.target.checked,
      },
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPassword(value);
  };

  const Cerrar = () => {
    onClose();
    setChangePassword(false);
    setContraseñaIncorrecta(false);
  };

  const [contraseñaincorrecta, setContraseñaIncorrecta] = useState(false);

  const errorContraseña = () => {
    setContraseñaIncorrecta(true); // Cambia el estado para mostrar el error
  };

  const handleSave = () => {
    // Validar los inputs del nombre y la nueva contraseña
    if (usuario.nombre.trim().length < 4 || newPassword.trim().length < 4) {
      setContraseñaIncorrecta(true); // Cambiar el estado para mostrar el error
      return; // Detener la ejecución si no se cumple el requisito
    }

    // Si pasa la validación, procede con la ejecución
    const updatedUser = { ...usuario };
    updatedUser.password = newPassword; // Usar la nueva contraseña
    window.api.enviarEvento("guardar-usuario-editado", updatedUser);
    onSave(updatedUser);
    onClose(); // Cierra el modal después de guardar

    // Restablece el estado de error si el guardado es exitoso
    setContraseñaIncorrecta(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Enter") {
        event.preventDefault();
        handleSave();
      } else if (event.key === "Escape") {
        Cerrar();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, usuario, newPassword]);

  if (!isOpen || !user) return null;

  const isSaveDisabled = !usuario.nombre || (changePassword && !newPassword);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex bg-[#2f2f2fff] rounded-3xl relative justify-start text-white border-gray-600 border flex-col max-w-lg w-full">
        <div className="flex flex-col p-3">
          <label className="text-base">Nombre del usuario</label>
          <div className="h-5">
            {contraseñaincorrecta && (
              <div className="flex items-start text-red-500 text-sm">
                El nombre y la nueva contraseña deben contener al menos 4
                caracteres.
              </div>
            )}
          </div>

          <input
            type="text"
            name="nombre"
            placeholder="Usuario"
            value={usuario.nombre}
            onChange={handleInputChange}
            className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
          />

          <label className="text-base py-1 pt-6">Nueva contraseña</label>
          <div className="h-4"></div>
          <div className="relative flex items-center">
            <input
              type="password"
              name="newPassword"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={handlePasswordChange}
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
            />
          </div>

          <div className="flex flex-1  justify-end pt-4">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-around">
              <ButtonR
                textSize="text-sm"
                onClick={Cerrar}
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
                height="h-7"
                width="w-24"
                title="Cancelar"
              ></ButtonR>

              <ButtonR
                textSize="text-sm"
                onClick={handleSave}
                bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
                height="h-7"
                width="w-32"
                title="Guardar"
              ></ButtonR>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
