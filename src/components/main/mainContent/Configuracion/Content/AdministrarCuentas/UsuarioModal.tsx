import React, { useState, useEffect, useRef } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import ButtonR from "../../../buttons/ButtonR";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdQuestionMark } from "react-icons/md";
import Tooltip from "../../../../../nav/aside/Tooltip";

interface UsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Usuario {
  nombre: string;
  imageUrl: string;
  password: string;
  permisos: {
    gerente: boolean;
    logistica: boolean;
    ventas: boolean;
    stock: boolean;
  };
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ isOpen, onClose }) => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    password: "",
    imageUrl: "assets/imagen-usuario/user-1.jpg",
    permisos: {
      gerente: true,
      logistica: false,
      ventas: false,
      stock: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [contraseñaincorrecta, setContraseñaIncorrecta] = useState(false);

  const usuarioRef = useRef(usuario);

  useEffect(() => {
    usuarioRef.current = usuario; // Mantén actualizado el valor más reciente del estado
  }, [usuario]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const Cerrar = () => {
    onClose();
    setContraseñaIncorrecta(false);
    setShowPassword(false);
    setUsuario({
      nombre: "",
      password: "",
      imageUrl: "assets/imagen-usuario/user-1.jpg",
      permisos: {
        gerente: true,
        logistica: false,
        ventas: false,
        stock: false,
      },
    });
  };

  const errorContraseña = () => {
    setContraseñaIncorrecta(true);
  };

  const handleSave = () => {
    const currentUsuario = usuarioRef.current; // Utiliza el valor más reciente del estado
    console.log("Usuario antes de la validación:", currentUsuario);

    if (currentUsuario.nombre.trim().length < 4 || currentUsuario.password.length < 4) {
      errorContraseña();
      return;
    }

    console.log("Guardando datos del usuario:", currentUsuario);
    window.api.enviarEvento("guardar-usuario-secundario", currentUsuario);

    setUsuario({
      nombre: "",
      password: "",
      imageUrl: "/imagen-usuario/user-1.jpg",
      permisos: {
        gerente: true,
        logistica: false,
        ventas: false,
        stock: false,
      },
    });

    setContraseñaIncorrecta(false);
    onClose();
  };

  useEffect(() => {
    const handleResponse = (respuesta: {
      exito: boolean;
      usuario?: Usuario;
      error?: string;
    }) => {
      if (respuesta.exito) {
        console.log("Usuario secundario guardado con éxito", respuesta.usuario);
      } else {
        console.error(
          "Error al guardar el usuario secundario",
          respuesta.error
        );
      }
    };

    window.api.recibirEvento("respuesta-guardar-usuario", handleResponse);

    return () => {
      window.api.removeListener("respuesta-guardar-usuario", handleResponse);
    };
  }, []);

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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex bg-[#2f2f2fff] rounded-3xl relative justify-start text-white border-gray-600 border flex-col max-w-lg w-full">
        <div className="flex items-center bg-black"></div>
        <div className="flex flex-1 flex-col px-2">
          <div className="flex pt-3">
            <label className="flex flex-1 text-base">Nombre del usuario</label>
            <div className="flex w-6 h-6 items-center justify-end pr-3 pb-3 cursor-pointer">
              <Tooltip
                content={
                  <>
                    Para garantizar la preservación de la información generada,
                    <br />
                    los subusuarios no podrán eliminarse,
                    <br />
                    aunque será posible realizar modificaciones en ellos.
                  </>
                }
              >
                <div className="bg-gray-600 rounded-full p-1 active:bg-gray-500 shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
                  <MdQuestionMark size={20} color=" yellow" />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex h-4 items-center">
            {contraseñaincorrecta ? (
              <div className="text-red-500 text-sm">
                El usuario y la contraseña deben tener al menos 4 caracteres.
              </div>
            ) : null}
          </div>
          <input
            type="text"
            name="nombre"
            placeholder="Usuario"
            value={usuario.nombre}
            onChange={handleInputChange}
            className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
          />

          <label className="text-base py-1 pb-3">Contraseña</label>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={usuario.password}
              onChange={handleInputChange}
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
            />
            <div
              onClick={toggleShowPassword}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <BsEyeFill size={25} />
              ) : (
                <BsEyeSlashFill size={25} />
              )}
            </div>
          </div>

          <div className="flex h-52 w-full justify-evenly">
            <div className="flex flex-1 flex-col ">
              <div className="flex flex-col text-base p-2 select-none">
                Permisos de uso:
              </div>
              {Object.keys(usuario.permisos).map((key) => (
                <label
                  className="flex items-center space-x-3 space-y-3"
                  key={key}
                >
                  <input
                    type="checkbox"
                    name={key}
                    checked={
                      usuario.permisos[key as keyof typeof usuario.permisos]
                    }
                    onChange={handleCheckboxChange}
                    className="accent-blue-500 h-5 w-5"
                  />
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>
            <div className="flex flex-1">
              <div className="flex flex-col flex-1">
                <div className="flex flex-col text-base p-2 select-none">
                  Accesos:
                </div>
                {usuario.permisos.logistica && (
                  <div className="">
                    <p>
                      <span className="text-[#eab308]">•</span> Ventas con
                      selección de vendedor
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Artículos
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Stock
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Clientes
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Facturación
                    </p>
                  </div>
                )}

                {usuario.permisos.gerente && (
                  <div className="">
                    <p>
                      <span className="text-[#eab308]">•</span> Ventas con
                      selección de vendedor
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Artículos
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Stock
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Clientes
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Estadísticas
                    </p>
                  </div>
                )}

                {usuario.permisos.stock && (
                  <div className="">
                    <p>
                      <span className="text-[#eab308]">•</span> Stock
                    </p>
                  </div>
                )}

                {usuario.permisos.ventas && (
                  <div className="">
                    <p>
                      <span className="text-[#eab308]">•</span> Ventas
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Artículos
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Stock
                    </p>
                    <p>
                      <span className="text-[#eab308]">•</span> Clientes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-t-1 border-gray-600 text-gray-300 p-2 ">
            Puede acceder a una configuración avanzada en la sección
            "Configuración avanzada" dentro de los permisos de usuarios.
          </div>
        </div>
        <div className="flex flex-1  justify-end p-4">
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
  );
};

export default UsuarioModal;
