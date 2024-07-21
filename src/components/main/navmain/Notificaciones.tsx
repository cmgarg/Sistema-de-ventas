import React, { useState, useEffect, useRef } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import MenuNotif from "./MenuNotif";
import Biñeta from "../mainContent/Biñeta/Biñieta";

export default function Notificaciones() {
  const [isClicked, setIsClicked] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleNotification = (data) => {
      if (data && data.nota) {
        setNotifications(prevNotifications => {
          const exists = prevNotifications.some(notification => notification._id === data._id);
          if (!exists) {
            return [data, ...prevNotifications].sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
          }
          return prevNotifications;
        });
      } else {
        console.error('Datos de notificación no válidos:', data);
      }
    };

    const handleGetNotifications = (data) => {
      console.log(data, "esto se recibe del backend");
      if (Array.isArray(data)) {
        setNotifications(data.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)));
        setUnreadCount(data.filter(notification => !notification.visto).length);
      } else {
        console.error('Datos de notificación no válidos:', data);
      }
    };

    window.api.recibirEvento('notification', handleNotification);
    window.api.recibirEvento('response-get-notifications', handleGetNotifications);
    window.api.enviarEvento('get-notifications');

    return () => {
      window.api.removeListener('notification', handleNotification);
      window.api.removeListener('response-get-notifications', handleGetNotifications);
    };
  }, []);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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
    setUnreadCount(notifications.filter(notification => !notification.visto).length);
  }, [notifications]);

  const closeMenu = () => {
    setIsClicked(false);
  };

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
          <MenuNotif notifications={notifications} setNotifications={setNotifications} closeMenu={closeMenu} />
        </div>
      )}
    </div>
  );
}
