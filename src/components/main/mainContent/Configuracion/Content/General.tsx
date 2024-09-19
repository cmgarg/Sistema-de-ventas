import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface Usuario {
  username: string;
  direccion: string;
  email: string;
  ubicacion: string;
  imageUrl: string;
}

interface RespuestaUsuario {
  success: boolean;
  data: Usuario;
  error?: string;
}

interface ActualizarImagenResponse {
  exito: boolean;
  imageUrl: string;
}

export default function General() {
  const [datosUsuario, setDatosUsuario] = useState<Usuario | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        window.api.enviarEvento("obtener-datos-usuario", userId);
        window.api.recibirEvento("datos-usuario-obtenidos", (respuesta: RespuestaUsuario) => {
          if (respuesta && respuesta.success) {
            setDatosUsuario(respuesta.data);
            setSelectedImage(respuesta.data.imageUrl);
          } else {
            console.error(respuesta.error || "No se pudo obtener la información del usuario.");
          }
        });
      }
    };

    fetchData();
    window.api.recibirEvento('respuesta-actualizar-imagen-usuario', (e: ActualizarImagenResponse) => {
      e.exito && setSelectedImage(e.imageUrl);
    });

    return () => {
      window.api.removeAllListeners("datos-usuario-obtenidos");
      window.api.removeAllListeners("respuesta-actualizar-imagen-usuario");
    };
  }, []);

  const datosUsuarioRedux = useSelector(
    (state: RootState) => state.estadoTipoDeUser.datosUsuario
  );

  console.log(datosUsuarioRedux, "datos del usuariooooooooooooooooo");

  return (
    <div className="flex flex-1 text-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.50)]  bg-[#2f2f2fff]">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col">
          <div className="h-12 text-lg p-3">Cuenta Administradora</div>
          <div className="flex w-full h-80 border-b border-gray-600">
            <div className="flex-1 flex">
              <div className="flex-1">
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Nombre Usuario</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.username}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Nos encontramos en</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.direccion}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Email</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.email}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Ubicacion</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.ubicacion}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Nombre Usuario</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.username}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Nos encontramos en</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.direccion}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Email</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.email}</div>
                </div>
                <div className="flex flex-col h-20">
                  <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2">
                    <div>Ubicacion</div>
                  </div>
                  <div className="h-10 pl-3">{datosUsuario && datosUsuario.ubicacion}</div>
                </div>
              </div>
            </div>
            <div className="w-1/3 flex items-center justify-center">
              <div
                className="w-60 h-60 rounded-full shadow-lg shadow-black"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
