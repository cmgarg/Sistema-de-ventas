import React, { useEffect, useState, useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Biñeta from "../mainContent/Biñeta/Biñieta";
import { AiOutlineMore } from "react-icons/ai";
import { LiaCashRegisterSolid } from "react-icons/lia";
import MenuDeLasNotf from "./MenuDeLasNotf";
import { PiBoxArrowDown } from "react-icons/pi";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import ClipLoader from "react-spinners/ClipLoader";
import { GrUpdate } from "react-icons/gr";
import { TbFileDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

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

interface MenuNotifProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  closeMenu: () => void;
}

const iconMap: { [key: number]: IconType } = {
  1: PiBoxArrowDown,
  2: GrUpdate,
  3: TbFileDollar,
  4: LiaCashRegisterSolid,
};

const customFormatDistance = (date: Date): string => {
  const distance = formatDistance(date, new Date(), {
    addSuffix: true,
    locale: es,
  });
  return distance.replace("alrededor de ", "");
};

const MenuNotif: React.FC<MenuNotifProps> = ({
  notifications,
  setNotifications,
  closeMenu,
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);
  const [disabledTypes, setDisabledTypes] = useState<string[]>([]);
  const [loadedCount, setLoadedCount] = useState(8);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreButtonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const loadingRef = useRef(false);

  const navigate = useNavigate();

  ///////////////////////////notif

  const messaging = getMessaging();

  function requestPermission() {
    console.log("Requesting permission... preguntando si me dan el permisos");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted permiso otorgadooooooooooooooo.");
        // Obtener token para enviar notificaciones a esta instancia
        getToken(messaging, {
          vapidKey: "xHNBNSS-qZ_qpo4qn8omd_cIqHyPnv0rc4wp87tz7wk",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Token:", currentToken);
              // Envía el token al backend o úsalo en tu lógica
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  }

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    window.api.enviarEvento("get-disabled-notification-types");
    window.api.recibirEvento(
      "response-get-disabled-notification-types",
      (types: string[]) => {
        setDisabledTypes(types);
      }
    );

    setVisibleNotifications(notifications.slice(0, loadedCount));

    window.api.enviarEvento("delete-old-notifications");
    const intervalId = setInterval(() => {
      window.api.enviarEvento("delete-old-notifications");
    }, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [notifications, loadedCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotifications((prevNotifications) => [...prevNotifications]);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [setNotifications]);

  const handleMoreClick = (
    notificationId: string,
    _event: React.MouseEvent
  ) => {
    setMenuVisible((prevVisible) => {
      if (prevVisible && selectedNotificationId === notificationId) {
        setSelectedNotificationId(null);
        return false;
      }
      setSelectedNotificationId(notificationId);
      return true;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".more-button")
    ) {
      setMenuVisible(false);
      setSelectedNotificationId(null);
    }
  };

  const handleMouseEnter = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, visto: true }
          : notification
      )
    );

    window.api.enviarEvento("mark-notification-as-read", notificationId);
  };

  const handleScroll = () => {
    if (menuRef.current && !loadingRef.current && !allLoaded) {
      const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        visibleNotifications.length < notifications.length
      ) {
        setLoading(true);
        loadingRef.current = true;
        setTimeout(() => {
          setLoadedCount((prevCount) => {
            const newCount = prevCount + 8;
            if (newCount >= notifications.length) {
              setAllLoaded(true);
            }
            return newCount;
          });
          setLoading(false);
          loadingRef.current = false;
        }, 1000);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (menuRef.current) {
      menuRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (menuRef.current) {
        menuRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const selectedNotification = notifications.find(
    (notification) => notification._id === selectedNotificationId
  );

  const abrirConfiguracion = () => {
    navigate("/configuracion?apartado=general-3");
    closeMenu();
  };

  const handleDisableNotificationType = (tipo: string) => {
    window.api.enviarEvento("disable-notification-type", tipo);
  };

  const handleHideNotification = (id: string) => {
    window.api.enviarEvento("hide-notification", id);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === id
          ? { ...notification, oculta: true }
          : notification
      )
    );
  };

  return (
    <div>
      <div className="absolute right-0 top-full w-[30rem] h-[50rem] bg-gray-800 shadow-lg border border-gray-600 rounded-lg text-white py-2 z-50 menu-container select-none ">
        <div className="flex flex-col">
          <div className="flex w-full h-12 justify-between items-center border-b border-gray-600">
            <div className="text-xl pl-4">Notificaciones</div>
            <div
              className="flex p-2 mr-4 rounded-full hover:bg-gray-600"
              onClick={abrirConfiguracion}
            >
              <Biñeta title={"Configuracion"}>
                <IoSettingsOutline size={25} />
              </Biñeta>
            </div>
          </div>
          <div
            ref={menuRef}
            className="w-full h-[46.3rem] rounded-md overflow-y-auto"
          >
            {visibleNotifications.map((notification) => {
              if (
                notification.oculta ||
                disabledTypes.includes(notification.tipo)
              )
                return null; // Ocultar notificaciones marcadas como ocultas o de tipos desactivados
              const IconComponent = iconMap[notification.icono];
              return (
                <div
                  key={notification._id}
                  className="relative w-full h-40 hover:bg-gray-700 flex justify-between items-center"
                  onMouseEnter={() => handleMouseEnter(notification._id)}
                >
                  {!notification.visto && (
                    <div className="flex h-1/2 w-1 bg-slate-200 rounded-full"></div>
                  )}
                  <div className="flex flex-1 h-full p-3 pt-6 pb-6">
                    <div className="flex justify-center items-center">
                      <div className="flex bg-slate-950 p-4 m-2 rounded-full">
                        {IconComponent && (
                          <IconComponent size={40} className="text-slate-300" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col pl-3 w-full justify-between">
                      <div>
                        <h1>{notification.titulo}</h1>
                        <p className=" font-light">{notification.nota}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {customFormatDistance(new Date(notification.fechaHora))}
                      </div>
                    </div>
                    <div
                      ref={(el) =>
                        (moreButtonRefs.current[notification._id] = el)
                      }
                      className="more-button"
                    >
                      <div
                        className="hover:bg-gray-600 rounded-full relative"
                        onClick={(event) =>
                          handleMoreClick(notification._id, event)
                        }
                      >
                        <AiOutlineMore size={35} />
                        {menuVisible &&
                          selectedNotificationId === notification._id && (
                            <div
                              className="flex"
                              ref={menuRef}
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "100%",
                              }}
                            >
                              <MenuDeLasNotf
                                notification={selectedNotification!}
                                onHideNotification={handleHideNotification}
                                onDisableNotificationType={
                                  handleDisableNotificationType
                                }
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {loading && !allLoaded && (
              <div className="flex justify-center my-4">
                <ClipLoader color={"#ffffff"} loading={loading} size={35} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuNotif;
