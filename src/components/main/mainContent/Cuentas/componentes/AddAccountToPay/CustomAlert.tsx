import React, { useEffect } from 'react';
import { IoIosWarning } from 'react-icons/io';

interface CustomAlertProps {
  title: string;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title, message, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div className="flex flex-col w-1/4 h-2/2 bg-slate-950 space-y-5 rounded-3xl relative justify-start text-white border-slate-800 border overflow-hidden p-6">
        <div className="flex flex-1 flex-row h-8 mt-6 text-3xl items-center justify-center">
          <IoIosWarning size={100} color="red"/>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="mb-4">{message}</p>
          <button
            className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800"
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
