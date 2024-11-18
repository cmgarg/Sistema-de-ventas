import React, { useState, useEffect, useRef } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import MenuNotif from "./MenuNotif";
import Biñeta from "../mainContent/Biñeta/Biñieta";
import { sendNotification } from "../Main";
import { io, Socket } from 'socket.io-client';

interface Notification {
  _id: string;
  tipo: string;
  icono: number;
  titulo: string;
  nota: string;
  fechaHora: string;
  visto: boolean;
  oculta: boolean;
}

const Notificaciones: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  ///////////////////////////////////

//    const socket = io("http://localhost:4500");

//   socket.emit('register_as_program_2');
  
//   socket.on('receive_notification', (data) => {
//     console.log('Notificación recibida:', data);

//       // Enviar la notificación al backend para ser guardada
//   saveNotificationToDatabase(data);

//   });
//   // Función para enviar la notificación al backend
// const saveNotificationToDatabase = async (notificationData: any) => {
//   try {
//     window.api.enviarEvento("save-notification", notificationData);
//     console.log("Notificación enviada al backend para ser guardada");
//   } catch (error) {
//     console.error("Error al enviar la notificación al backend:", error);
//   }
// };




  ////////////////////////////////////////////////

  useEffect(() => {
    const handleNotification = (data: Notification) => {
      if (data && data.nota) {
        setNotifications((prevNotifications) => {
          const exists = prevNotifications.some((notification) => notification._id === data._id);
          if (!exists) {
            return [data, ...prevNotifications].sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
          }
          return prevNotifications;
        });
      } else {
        console.error("Datos de notificación no válidos:", data);
      }
    };

    const handleGetNotifications = (data: Notification[]) => {
      console.log(data, "esto se recibe del backend");
      if (Array.isArray(data)) {
        setNotifications(data.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime()));
        setUnreadCount(data.filter((notification) => !notification.visto).length);
      } else {
        console.error("Datos de notificación no válidos:", data);
      }
    };

    window.api.recibirEvento("notification", handleNotification);
    window.api.recibirEvento("response-get-notifications", handleGetNotifications);
    window.api.enviarEvento("get-notifications");

  }, []);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((notification) => !notification.visto).length);
  }, [notifications]);

  const closeMenu = () => {
    setIsClicked(false);
  };


  //////////////////////Notificaciones predeterminadas
  ///////////////
  ////sendNotification("Cuentas", "Se Vencio tu cuenta. Si ya la pagaste Marcala y evita futuras confuciones", 2, "Cuentas")

  const [cuentas2, setcuentas2] = useState([]);
  const notifiedAccounts = new Set(); // Para rastrear qué cuentas ya fueron notificadas

  const getAccountsToPay = () => {
    window.api.enviarEvento("get-accountToPay");
  };

  const updateNotificationStatus = (accountId) => {
    // Enviar el evento al backend para actualizar el estado de 'senotifico' a true
    window.api.enviarEvento("actualizar-senotifico", { idCuenta: accountId, estadoSenotifico: true });
  };

  const isSameOrBeforeToday = (accountDate) => {
    const today = new Date();
    const accountDateObj = new Date(accountDate);

    // Comparamos si la fecha de la cuenta es igual o anterior a la fecha actual
    return accountDateObj <= today;
  };

  const filterAndNotifyAccounts = (accounts) => {
    // Filtra las cuentas cuya fecha es igual o anterior a hoy y aún no han sido notificadas
    accounts.forEach(account => {
      const accountDate = account.date;

      if (account.notifiacion && !account.senotifico && isSameOrBeforeToday(accountDate)) {
        if (!notifiedAccounts.has(account._id)) {
          // Si la cuenta no ha sido notificada aún, enviamos la notificación y actualizamos
          sendNotification(
            "Cuentas",
            `Tu cuenta "${account.descripcion}" ha vencido. Si ya realizaste el pago, márcala para evitar confusiones o posibles recargos.`,
            5,
            "cuentas",
            `${account._id}`,
          );

          // Actualizar el estado de 'senotifico' a true para no volver a notificar
          updateNotificationStatus(account._id);

          // Agregar la cuenta al conjunto de notificadas
          notifiedAccounts.add(account._id);
        }
      }
    });
  };

  useEffect(() => {
    // Solicitar cuentas cada vez que el componente se monta
    getAccountsToPay();

    const recibirCuentas = (accounts) => {
      console.log("Cuentas recibidas desde el backend:", accounts);
      setcuentas2(accounts);

      // Filtrar y notificar las cuentas que cumplen con las condiciones
      filterAndNotifyAccounts(accounts);
    };

    // Configurar el listener para recibir las cuentas
    window.api.recibirEvento("response-get-accountToPay", recibirCuentas);

    return () => {
      // Eliminar el listener cuando el componente se desmonta
      console.log("Eliminando listener para 'response-get-accountToPay'");
      window.api.removeListener("response-get-accountToPay", recibirCuentas);
    };
  }, []); // Se elimina accountToPay de las dependencias para evitar bucles


  console.log(cuentas2, "ESTAS SON LAS CUENTAS ACTUALIZADAS CON LA AGREGADA")

  return (
    <div className="relative cursor-pointer">
      <div
        className="rounded-full hover:bg-gray-600 p-2 mr-2 relative"
        onClick={handleIconClick}
      >
        {!isClicked && (
          <Biñeta title={"Notificaciones"}>
            <IoMdNotificationsOutline size={30} color="white" />
          </Biñeta>
        )}
        {isClicked && <IoMdNotifications size={29} color="white" />}
        {!isClicked && unreadCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm select-none">
            {unreadCount}
          </div>
        )}
      </div>
      {isClicked && (
        <div ref={menuRef}>
          <MenuNotif
            notifications={notifications}
            setNotifications={setNotifications}
            closeMenu={closeMenu}
          />
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
