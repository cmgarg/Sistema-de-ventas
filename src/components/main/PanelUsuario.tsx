import React from 'react'
import Notificaciones from './navmain/Notificaciones'
import UsuarioIniciado from './navmain/UsuarioIniciado'

export default function 
() {
  return (
    <div className='flex w-full justify-end relative z-50'>
        <div className='flex items-center absolute pr-5'>
        <Notificaciones/>
        <UsuarioIniciado/>   
        </div>
    </div>
  )
}
