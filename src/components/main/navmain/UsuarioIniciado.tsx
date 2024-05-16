import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/estados/authSlice.ts";

export default function UsuarioIniciado({ setLoginUser }) {
  const images = [
    "/imagen-usuario/user-1.jpg",
    "/imagen-usuario/user-2.jpg",
    "/imagen-usuario/user-3.jpg",
    "/imagen-usuario/user-4.jpg",
    "/imagen-usuario/user-5.jpg",
    "/imagen-usuario/user-6.jpg",
    "/imagen-usuario/user-7.jpg",
    "/imagen-usuario/user-8.jpg",
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const imageMenuRef = useRef(null);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const menuRef = useRef(null);

  const handleImageSelect = async (index) => {
    setSelectedImage(images[index]);
    setChangeImageVisible(false);

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        // Envía la imagen seleccionada al backend
        window.api.enviarEvento("actualizar-imagen-usuario", {
          userId,
          imageUrl: images[index],
        });
        console.log("Imagen del usuario actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la imagen del usuario:", error);
      }
    }

    console.log("Enviando al backend:", { userId, imageUrl: images[index] });
    window.api.enviarEvento("actualizar-imagen-usuario", {
      userId,
      imageUrl: images[index],
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Actualiza selectedImage en lugar de fileImage
        setChangeImageVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    setChangeImageVisible(false);
  };

  const toggleChangeImage = () => {
    setChangeImageVisible(!changeImageVisible);
    setMenuVisible(false);
  };

  console.log(selectedImage, "esta es la imagen q cliceo");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        imageMenuRef.current &&
        !imageMenuRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
        setChangeImageVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, imageMenuRef]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth); // Accede al estado de autenticación

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  // UsuarioIniciado.js
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
    setLoginUser(false); // Asegúrate de pasar setLoginUser como prop a este componente
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  // Ejemplo de cómo podrías manejar una respuesta de inicio de sesión
  // Suponiendo que esta es una función donde manejas la respuesta del inicio de sesión.
  function manejarRespuestaInicioSesion(respuesta) {
    if (respuesta.exito) {
      localStorage.setItem("userId", respuesta.userId);
      // Navegar al dashboard o actualizar el estado del usuario aquí
    } else {
      // Mostrar mensaje de error
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      window.api.enviarEvento("obtener-datos-usuario", userId);
    }

    const handleDatosUsuarioObtenidos = (respuesta) => {
      if (respuesta) {
        if (respuesta.success) {
          setDatosUsuario(respuesta.data);
          setSelectedImage(respuesta.data.imageUrl);
        } else {
          console.error(respuesta.error);
          // Manejar el error aquí
        }
      } else {
        console.error(
          "La respuesta del evento datos-usuario-obtenidos es undefined"
        );
      }
    };

    window.api.recibirEvento(
      "datos-usuario-obtenidos",
      handleDatosUsuarioObtenidos
    );

    return () => {
      window.api.removeAllListeners("datos-usuario-obtenidos");
    };
  }, []);

  const userId = localStorage.getItem("userId");
  console.log(userId, "noooooooooooooooooo estaa el idd"); // Deberías ver un valor que no sea null o undefined

  console.log(datosUsuario, "datos sobtenido de ususartio");

  return (
    <>
      <div className=" flex text-white text-lg mr-4 items-center justify-center">
        <div></div>
      </div>
      <div>
        <div
          className="relative  flex flex-row border border-gray-600 rounded-lg p-1"
          ref={menuRef}
        >
          <div className="flex items-center justify-center text-2xl text-white mr-3">
            {datosUsuario ? datosUsuario.username : "Cargando..."}
          </div>

          <div
            className="w-11 h-11 bg-cover bg-center rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${selectedImage})` }} // Usa selectedImage para la imagen actual
            onClick={toggleMenu}
          />

          {menuVisible && (
            <div className="absolute right-0 top-full w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={toggleChangeImage}
              >
                Cambiar imagen
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Configuración
              </div>
              <div
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Cerrar sesión
              </div>
            </div>
          )}
        </div>

        {changeImageVisible && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
            ref={imageMenuRef}
          >
            <div className="flex flex-wrap justify-between px-2 py-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 bg-cover bg-center rounded-full cursor-pointer m-1 ${
                    selectedImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleImageSelect(index)}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
              <label
                htmlFor="file-input"
                className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer m-1"
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                +
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
