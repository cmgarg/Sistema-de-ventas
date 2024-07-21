import React from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoNotificationsOffOutline } from 'react-icons/io5';

export default function MenuDeLasNotf({ notification, onHideNotification, onDisableNotificationType }) {
  return (
    <div className="absolute right-0 top-full bg-gray-800 shadow-lg border border-gray-600 rounded-lg text-white py-2 z-50 menu-container select-none">
      <div className='flex flex-1 flex-col h-20 w-96'>
        <div className='flex flex-1 items-center hover:bg-gray-700' onClick={() => onHideNotification(notification._id)}>
          <div className='p-1 pr-4 pl-4'><IoNotificationsOffOutline size={25} /></div>
          <div>Ocultar esta notificación</div>
        </div>
        <div className='flex flex-1 items-center hover:bg-gray-700' onClick={() => onDisableNotificationType(notification.tipo)}>
          <div className='p-1 pr-4 pl-4'><FaRegEyeSlash size={25} /></div>
          <div>Desactivar notificaciones de {notification.tipo}</div>
        </div>
      </div>
    </div>
  );
}
