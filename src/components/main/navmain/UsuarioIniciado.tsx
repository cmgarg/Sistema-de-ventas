import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/estados/authSlice.ts";
import { MdAddPhotoAlternate } from "react-icons/md";

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
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Componente UsuarioIniciado montado");

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageSelect = async (index) => {
    setSelectedImage(images[index]);
    setChangeImageVisible(false);

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        window.api.enviarEvento("actualizar-imagen-usuario", {
          userId,
          imageUrl: images[index],
        });
        console.log("Imagen del usuario actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la imagen del usuario:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
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

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".menu-container") &&
      !event.target.closest(".image-menu-container")
    ) {
      setMenuVisible(false);
      setChangeImageVisible(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    console.log("Ejecutando handleLogout");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
    setLoginUser(false); // Aquí ocurre el error
    navigate("/login");
  };

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
  useEffect(() => {
    console.log(datosUsuario, "GONZAAAAAAAAAAAAAAA");
  }, [datosUsuario]);

  const navigate2 = useNavigate();

  const abrirConfiguracion = () => {
    navigate("/configuracion");
  };

  return (
    <>
      <div className="flex text-white text-lg mr-4 items-center justify-center">
        <div></div>
      </div>
      <div className="relative">
        <div
          className="flex flex-row border-4 border-gray-600 rounded-lg p-1 menu-container "
          onClick={toggleMenu}
        >
          <div className="flex items-center justify-center text-2xl text-white mr-3">
            {datosUsuario
              ? datosUsuario.username || datosUsuario.nombre
              : "Cargando..."}
          </div>

          <div
            className="w-11 h-11 bg-cover bg-center rounded-full cursor-pointer border "
            style={{ backgroundImage: `url(${selectedImage})` }}
          />
        </div>

        {menuVisible && (
          <div className="absolute right-0 top-full w-48 bg-gray-800 shadow-lg border border-gray-600 rounded-lg text-white py-2 z-50 menu-container">
            <div
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={toggleChangeImage}
            >
              Cambiar imagen
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={abrirConfiguracion}
            >
              Configuración
            </div>
            <div
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              Cerrar sesión
            </div>
          </div>
        )}

        {changeImageVisible && (
          <div className="absolute right-0 w-48 bg-gray-800 border border-gray-600 shadow-lg rounded-lg py-4 z-50 image-menu-container">
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
                  className="hidden text-5xl"
                />
                <MdAddPhotoAlternate size={35} color="black" />
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
