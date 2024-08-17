import React, { useEffect, useState } from "react";
import { PiCheckCircleFill } from "react-icons/pi";
import WarningModal from "./WarningModal"; // Importa el modal de advertencia

interface PermisosProps {
  usuarios: Usuario[];
  usuarioSeleccionado: string;
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

// Define el tipo completo de Usuario
interface Usuario {
  permisos: any;
  _id: string;
  nombre: string;
  imageUrl: string;
  password: string;  // Asegúrate de incluir 'password'
  
}


interface Cargo {
  key: string;
  permisos: string[];
}

const Permisos: React.FC<PermisosProps> = ({ usuarios, usuarioSeleccionado, setUsuarios }) => {
  const [cargoSelec, setCargoSelec] = useState<string>("");
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [selectedCargo, setSelectedCargo] = useState<string>("");

  const cargos: Cargo[] = [
    { key: "gerente", permisos: ["Ventas", "Artículos", "Stock", "Clientes", "Estadísticas"] },
    { key: "logistica", permisos: ["Ventas", "Artículos", "Stock", "Clientes"] },
    { key: "ventas", permisos: ["Ventas", "Artículos", "Stock", "Clientes"] },
    { key: "stock", permisos: ["Stock"] },
  ];

  useEffect(() => {
    if (usuarioSeleccionado && usuarios) {
      usuarios.forEach((a) => {
        if (a._id === usuarioSeleccionado) {
          const permisos = a.permisos;
          for (const key in permisos) {
            if (permisos[key]) {
              setCargoSelec(key.toLowerCase());
              break;
            }
          }
        }
      });
    }
  }, [usuarioSeleccionado, usuarios]);

  useEffect(() => {
    const actualizarPermisos = (response: { exito: boolean; usuario: Usuario; mensaje: string }) => {
      if (response.exito) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario._id === usuarioSeleccionado ? response.usuario : usuario
          )
        );
        setCargoSelec(
          Object.keys(response.usuario.permisos).find((key) => response.usuario.permisos[key]) || ""
        );
      } else {
        console.error("Error al actualizar permisos:", response.mensaje);
      }
    };

    window.api.recibirEvento("respuesta-actualizar-permisos-usuario", actualizarPermisos);

    return () => {
      window.api.removeAllListeners("respuesta-actualizar-permisos-usuario");
    };
  }, [usuarioSeleccionado, setUsuarios]);

  const handleSelect = (cargo: string) => {
    setSelectedCargo(cargo);
    setShowWarningModal(true);
  };

  const confirmChange = () => {
    setShowWarningModal(false);
    setCargoSelec(selectedCargo);
    const permisos = {
      gerente: false,
      logistica: false,
      ventas: false,
      stock: false,
      [selectedCargo]: true,
    };

    window.api.enviarEvento("actualizar-permisos-usuario", { userId: usuarioSeleccionado, nuevosPermisos: permisos });
  };

  const cancelChange = () => {
    setShowWarningModal(false);
  };

  const formatKey = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="p-3 text-2xl border-b border-gray-600">
        Permisos SubUsuarios
      </div>
      <div className="relative flex-1">
        <div className="p-4 text-lg">
          Configuración por defecto: solo se puede seleccionar una categoría.
        </div>
        <div className="flex flex-wrap text-white justify-around p-5 border-b border-t border-gray-600 gap-4">
          {cargos.map((cargo) => (
            <div
              key={cargo.key}
              className={`flex flex-col border border-gray-600 rounded-lg flex-grow w-full sm:w-1/5 min-w-[10rem] max-w-[15rem] h-60 hover:bg-gray-900 shadow-md shadow-slate-950 ${
                cargoSelec === cargo.key ? "bg-gray-900" : ""
              }`}
              onClick={() => handleSelect(cargo.key)}
            >
              <div className="flex p-5 flex-col w-full">
                <div className="flex border-b border-gray-600 text-lg w-full justify-between">
                  <div className="flex pb-2">{formatKey(cargo.key)}</div>
                  <div className="flex items-start">
                    {cargoSelec === cargo.key && (
                      <PiCheckCircleFill color="#3B82F6" size={32} />
                    )}
                  </div>
                </div>
                <div className="pt-3">
                  {cargo.permisos.map((permiso, index) => (
                    <p key={index} className="pb-2">{`• ${permiso}`}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showWarningModal && (
        <WarningModal
          onConfirm={confirmChange}
          onCancel={cancelChange}
        />
      )}
    </div>
  );
};

export default Permisos;
