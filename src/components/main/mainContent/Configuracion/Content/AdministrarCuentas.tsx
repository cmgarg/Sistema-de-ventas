import React, { useEffect, useState, useRef } from "react";
import AgregarUserSVG from "../../../../../../src/assets/MAINSVGS/Configuracion SVG/AgregarUserSVG";
import UsuarioModal from "./AdministrarCuentas/UsuarioModal";
import EditUserModal from "./AdministrarCuentas/EditUserModal";
import Permisos from "./AdministrarCuentas/Permisos";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Tooltip from "../../../../nav/aside/Tooltip";

export default function AdministrarCuentas() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const [selectedImagee, setSelectedImagee] = useState(null);
  const imageRef = useRef(null);

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

  useEffect(() => {
    // Solicitar la carga de todos los usuarios al backend cuando el componente se monte
    window.api.enviarEvento("cargar-todos-usuarios");

    // Escuchar la respuesta del backend
    window.api.recibirEvento("respuesta-cargar-todos-usuarios", (response) => {
      if (response.exito) {
        setUsuarios(response.usuarios);
        if (response.usuarios.length > 0) {
          setUsuarioSeleccionado(response.usuarios[0]._id);
        }
      } else {
        console.error("Error al cargar usuarios:", response.error);
      }
    });

    // Escuchar la respuesta de la actualización de la imagen del subusuario
    window.api.recibirEvento(
      "respuesta-actualizar-imagen-subusuario",
      (response) => {
        if (response.exito) {
          // Actualizar la URL de la imagen del subusuario en el estado
          setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
              usuario._id === response.userId
                ? { ...usuario, imageUrl: response.imageUrl }
                : usuario
            )
          );
          console.log("Imagen del subusuario actualizada con éxito");
        } else {
          console.error(
            "Error al actualizar la imagen del subusuario:",
            response.mensaje
          );
        }
      }
    );

    // Escuchar la respuesta de la actualización del usuario
    window.api.recibirEvento("respuesta-guardar-usuario-editado", (response) => {
      if (response.exito) {
        // Solicitar nuevamente la carga de todos los usuarios para reflejar los cambios
        window.api.enviarEvento("cargar-todos-usuarios");
      } else {
        console.error("Error al guardar el usuario:", response.mensaje);
      }
    });

    // Limpiar los listeners al desmontar el componente
    return () => {
      window.api.removeAllListeners("respuesta-cargar-todos-usuarios");
      window.api.removeAllListeners("respuesta-actualizar-imagen-subusuario");
      window.api.removeAllListeners("respuesta-guardar-usuario-editado");
    };
  }, []);

  const handleMenuClick = (userId) => {
    setUsuarioSeleccionado(userId); // Establecer el usuario seleccionado
    setSelectedImagee(null); // Resetear la imagen seleccionada cuando se selecciona un nuevo usuario
  };

  const handleImageClick = (ref) => {
    if (imageRef.current === ref.current && changeImageVisible) {
      setChangeImageVisible(false);
    } else {
      imageRef.current = ref.current;
      setChangeImageVisible(true);
    }
  };

  const handleImageSelectt = (index:number) => {
    setSelectedImagee(images[index]);
    setChangeImageVisible(false);

    if (usuarioSeleccionado) {
      try {
        window.api.enviarEvento("actualizar-imagen-subusuario", {
          userId: usuarioSeleccionado, // Usar el ID del subusuario seleccionado
          imageUrl: images[index],
        });
      } catch (error) {
        console.error("Error al actualizar la imagen del subusuario:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImagee(e.target.result);
        setChangeImageVisible(false);

        if (usuarioSeleccionado) {
          try {
            window.api.enviarEvento("actualizar-imagen-subusuario", {
              userId: usuarioSeleccionado, // Usar el ID del subusuario seleccionado
              imageUrl: e.target.result,
            });
          } catch (error) {
            console.error(
              "Error al actualizar la imagen del subusuario:",
              error
            );
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".menu-container") &&
      !event.target.closest(".image-menu-container")
    ) {
      setChangeImageVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function agregarUser() {
    setShowModal(true); // Abre el modal
  }

  function editarUsuario() {
    const userToEdit = usuarios.find((u) => u._id === usuarioSeleccionado);
    setUsuarioParaEditar(userToEdit);
    setShowEditModal(true);
  }

  return (
    <div className="flex flex-1 text-white bg-gray-800 rounded-lg shadow-2xl shadow-black space-x-2 overflow-hidden">
      <div className="flex flex-col w-1/4 border border-gray-600 rounded-lg overflow-hidden">
        <div className="h-12 flex justify-between pl-1 items-center border border-gray-600 rounded-lg">
          <div className="text-2xl select-none pl-1">Usuarios</div>
          <div className="flex">
            <Tooltip content="Editar Usuario">
              <div
                className="text-2xl p-2 hover:bg-gray-950 rounded-full flex justify-center items-center"
                onClick={editarUsuario}
              >
                <FaUserEdit size={30} />
              </div>
            </Tooltip>
            <Tooltip content="Agregar Usuario">
              <div
                className="text-2xl p-2 hover:bg-gray-950 rounded-full flex"
                onClick={agregarUser}
              >
                <AgregarUserSVG width="30" height="30" />
              </div>
            </Tooltip>
          </div>
          <UsuarioModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
        <div className="h-[53.6rem] overflow-auto">
          {usuarios.map((usuario) => {
            const ref = React.createRef();
            return (
              <div
                key={usuario._id}
                onClick={() => handleMenuClick(usuario._id)}
                className={`relative flex flex-1 w-full border-b-2 border-gray-600 p-3 justify-between items-center ${
                  usuarioSeleccionado === usuario._id
                    ? "border-l-8 border-white border-b-none border-b-gray-600 bg-gradient-to-r from-gray-800 to-gray-950 transition rounded-l-lg duration-300 ease-in-out"
                    : "bg-gray-950"
                }`}
              >
                <div className="text-2xl">{usuario.nombre}</div>
                <div
                  className="relative hover:bg-gray-700 p-2 rounded-full cursor-pointer menu-container"
                  ref={ref}
                  onClick={() => handleImageClick(ref)} // Evento de clic para mostrar el modal
                >
                  <div
                    className="h-14 w-14 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${usuario.imageUrl})` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 border border-gray-600 rounded-lg flex-col overflow-auto">
        <Permisos
          usuarios={usuarios}
          usuarioSeleccionado={usuarioSeleccionado}
          setUsuarios={setUsuarios}
        />
      </div>
      {changeImageVisible && imageRef.current && (
        <div
          className="absolute w-48 bg-gray-800 border border-gray-600 shadow-lg rounded-lg py-4 z-50 image-menu-container"
          style={{
            top: imageRef.current.getBoundingClientRect().top + window.scrollY,
            left: imageRef.current.getBoundingClientRect().right + 10,
          }}
        >
          <div className="flex flex-wrap justify-between px-2 py-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-12 h-12 bg-cover bg-center rounded-full cursor-pointer m-1 ${
                  selectedImagee === image ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleImageSelectt(index)}
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
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={usuarioParaEditar}
        onSave={(updatedUser) => {
          // Lógica para guardar los cambios del usuario editado
          const updatedUsuarios = usuarios.map((usuario) =>
            usuario._id === updatedUser._id ? updatedUser : usuario
          );
          setUsuarios(updatedUsuarios);
          window.api.enviarEvento("guardar-usuario-editado", updatedUser);
        }}
      />
    </div>
  );
}
