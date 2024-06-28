import React, { useEffect, useState } from "react";


export default function General() {
  const [datosUsuario, setDatosUsuario] = useState();
  const [selectedImage, setSelectedImage] = useState();
  

  useEffect(() => {
    // Esta función se activa cada vez que `updateImgState` cambia.
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        // Simular una solicitud asíncrona para obtener los datos del usuario
        window.api.enviarEvento("obtener-datos-usuario", userId);
        window.api.recibirEvento("datos-usuario-obtenidos", (respuesta) => {
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
    window.api.recibirEvento('respuesta-actualizar-imagen-usuario',(e)=>{
      e.exito && setSelectedImage(e.imageUrl)
    })
    // Asegurarse de eliminar los oyentes de eventos para evitar pérdidas de memoria
    return () => {
      window.api.removeAllListeners("datos-usuario-obtenidos");
    };
  }, []);  // Dependencia en el estado de Redux
  
  return (
    <div className="flex flex-1 text-white bg-gray-800 rounded-lg shadow-2xl shadow-black">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col">
          <div className="h-12 text-lg p-3">Cuenta Administradora</div>
          <div className="flex w-full h-80 border-b border-gray-600">
            <div className="flex-1 flex">
              <div className="flex-1">
                <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Nombre Usuario</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.username}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Nos encontramos en</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.direccion}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Email</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.email}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Ubicacion </div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.ubicacion}</div>
              </div>
              </div>
              <div className="flex-1">
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Nombre Usuario</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.username}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Nos encontramos en</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.direccion}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Email</div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.email}</div>
              </div>
              <div className="flex flex-col h-20 ">
                <div className="flex h-10 text-gray-400 text-xs justify-start items-center pl-2"><div>Ubicacion </div></div>
                <div className="h-10 pl-3">{datosUsuario && datosUsuario.ubicacion}</div>
              </div>
              </div>
              
              
            </div>
            <div className="w-1/3 flex items-center justify-center ">
              <div className="w-60 h-60 rounded-full shadow-lg shadow-black"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: 'cover', // Cubre el área del div
                  backgroundPosition: 'center', // Centra la imagen dentro del div
                  backgroundRepeat: 'no-repeat' // No repite la imagen
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
