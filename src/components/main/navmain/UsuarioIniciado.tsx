import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/estados/authSlice";
import { MdAddPhotoAlternate } from "react-icons/md";
import { cambiar } from "../../../../src/redux/estados/estadoTipoDeUser.js";
import "../../../App.css";
import "../../../index.css";

interface UsuarioIniciadoProps {
  setLoginUser: Dispatch<SetStateAction<boolean>>;
}

interface UserData {
  username?: string;
  nombre?: string;
  imageUrl?: string;
}

interface AppState {
  auth: {
    isAuthenticated: boolean;
  };
}

const UsuarioIniciado: React.FC<UsuarioIniciadoProps> = ({ setLoginUser }) => {
  const images = [
    "assets/imagen-usuario/user-1.jpg",
    "assets/imagen-usuario/user-2.jpg",
    "assets/imagen-usuario/user-3.jpg",
    "assets/imagen-usuario/user-4.jpg",
    "assets/imagen-usuario/user-5.jpg",
    "assets/imagen-usuario/user-6.jpg",
    "assets/imagen-usuario/user-7.jpg",
    "assets/imagen-usuario/user-8.jpg",
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    console.log("Componente UsuarioIniciado montado");

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageSelect = async (index: number) => {
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
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

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(".menu-container") === null &&
      target.closest(".image-menu-container") === null
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
    dispatch(
      cambiar({
        userType: "",
        datosUsuario: {
          email: "",
          ubicacion: "",
          direccion: "",
          codigopostal: "",
          imageUrl: "",
          esAdmin: false,
          _id: "",
        },
      })
    ); // Ajusta {} según sea necesario
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
    setLoginUser(true);
    navigate("/login");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      window.api.enviarEvento("obtener-datos-usuario", userId);
    }

    const handleDatosUsuarioObtenidos = (respuesta: any) => {
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
    const lastCacheClear = localStorage.getItem("lastCacheClear");
    const currentTime = new Date().getTime();

    if (
      !lastCacheClear ||
      currentTime - parseInt(lastCacheClear) > 30 * 24 * 60 * 60 * 1000
    ) {
      window.api.enviarEvento("clear-cache");
      window.api.recibirEvento("cache-cleared", (_response: any) => {
        localStorage.setItem("lastCacheClear", currentTime.toString());
      });

      return () => {
        window.api.removeAllListeners("cache-cleared");
      };
    }
  }, []);

  const abrirConfiguracion = () => {
    navigate("/configuracion");
  };

  return (
    <>
      <div className="flex text-white text-lg items-center justify-center martin">
        <div></div>
      </div>
      <div className="relative cursor-pointer">
        <div
          className="flex flex-row rounded-lg menu-container group relative pt-1 pb-1 p"
          onClick={toggleMenu}
        >
          <div className="flex items-center justify-center text-2xl text-white pr-3 pl-3 select-none">
            {datosUsuario ? datosUsuario.username || datosUsuario.nombre : ""}
          </div>

          <div
            className="w-11 h-11 bg-cover bg-center rounded-full cursor-pointer border mr-2"
            style={{ backgroundImage: `url(${selectedImage})` }}
          />
          {/* TOP */}
          <span className="absolute left-0 top-0 h-[2px] w-0 bg-sky-700 transition-all duration-100 group-hover:w-full rounded-t-lg" />

          {/* RIGHT */}
          <span className="absolute right-0 top-0 h-0 w-[2px] bg-sky-700 transition-all delay-100 duration-100 group-hover:h-full rounded-r-lg" />

          {/* BOTTOM */}
          <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-sky-700 transition-all delay-200 duration-100 group-hover:w-full rounded-b-lg" />

          {/* LEFT */}
          <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-sky-700 transition-all delay-300 duration-100 group-hover:h-full rounded-l-lg" />
        </div>

        {menuVisible && (
          <div className="absolute right-0 top-full w-48 bg-gray-800 shadow-lg border border-gray-600 rounded-lg text-white py-2 z-50 menu-container select-none">
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
};

export default UsuarioIniciado;
