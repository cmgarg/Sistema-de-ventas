import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastCustomProps = {
  message: string;
  icon: any;
  backGround: string;
  title: string;
  fontSize: string;
  backGroundIcon?: string;
  titleColor: string;
  close: () => void; // Callback para cerrar el toast
  on: boolean;
};

const ToastCustom: React.FC<ToastCustomProps> = ({
  message,
  icon,
  backGround,
  title,
  fontSize,
  backGroundIcon,
  on,
  titleColor,
  close,
}) => {
  const divRef = useRef(null);
  const [showCloseButton, setShowCloseButton] = useState(false); // Estado para mostrar/ocultar botón de cierre

  // Efecto para cerrar automáticamente después de 3 segundos
  useEffect(() => {
    if (on) {
      const timer = setTimeout(() => {
        close(); // Llama al callback de cierre
      }, 3000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [on, close]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          ref={divRef}
          className={`flex overflow-hidden items-center justify-evenly border bg-gray-800 absolute border-gray-600 min-h-24 w-96 bottom-3 right-3 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.50)] z-50`}
          onMouseEnter={() => setShowCloseButton(true)}
          onMouseLeave={() => setShowCloseButton(false)}
          initial={{ y: "100%", opacity: 0 }} // Aparece desde abajo
          animate={{ y: 0, opacity: 1 }} // Animación activa
          exit={{ x: "100%", opacity: 0 }} // Sale hacia la derecha
          transition={{ duration: 0.3, ease: "easeInOut" }} // Duración y suavidad
        >
          {showCloseButton && (
            <div
              onClick={close}
              className="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer z-50 bg-red-500"
            >
              ✕
            </div>
          )}

          <div className="flex items-center justify-center h-24 flex-1 pl-2 relative">
            <div
              className={`h-12 w-12 ${backGround} opacity-20 absolute z-40 rounded-full`}
            ></div>
            <div
              className={`flex items-center w-9 justify-center relative z-50 h-9 rounded-full ${backGround}`}
            >
              {icon}
            </div>
          </div>
          <div
            className={`absolute bg-gradient-to-l from-gray-800 via-gray-700 to${backGround.slice(
              2,
              backGround.length
            )} w-full h-full right-20`}
          ></div>
          <div className={`absolute  w-full h-full`}></div>
          <div
            className={`flex pl-5 justify-center text-wrap w-80 h-full flex-col relative z-40`}
          >
            <p className={`font-bold text-xl ${titleColor}`}>{title}</p>
            <p
              style={{ fontSize: fontSize }}
              className="font-extralight text-gray-300 flex-1"
            >
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastCustom;
