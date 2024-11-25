import React from "react";
import { IoIosWarning } from "react-icons/io";
import ButtonR from "../../../buttons/ButtonR";

interface WarningModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="flex bg-[#2f2f2fff] rounded-3xl relative justify-start text-white border-gray-600 border flex-col max-w-lg w-full"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <div className="flex w-full h-full flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <IoIosWarning size={100} color="red" />
          </div>
          <h2 className="text-white text-2xl m-4">Advertencia</h2>
        </div>

        <div className="flex flex-col p-3">
          <p className="text-lg p-2 pb-4">
            Cambiar el tipo de perfil del usuario podría perjudicar el
            funcionamiento del perfil, ya que no estarían las mismas áreas
            disponibles para trabajar.
          </p>
          <div className="flex justify-end space-x-2">
            <ButtonR
              textSize="text-sm"
              onClick={onCancel}
              bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
              height="h-7"
              width="w-24"
              title="Cancelar"
            ></ButtonR>

            <ButtonR
              textSize="text-sm"
              onClick={onConfirm}
              bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
              height="h-7"
              width="w-32"
              title="Confirmar"
            ></ButtonR>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
