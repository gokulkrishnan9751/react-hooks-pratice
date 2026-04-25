import React from 'react'
import { createContext, useContext, useState } from 'react'
import Toast from '../component/tost';

export const ToastContext = createContext();

export default function toastProvider({children}) {
    const [toasts, setToasts] = useState([]);
    function addToast(message, type) {
        const id = Date.now()
        setToasts((prev) => [...prev, {id, message, type}])

        setTimeout(() => {
            removeToast(id)
        }, 3000);
    }
    
    function removeToast(id) {
        setToasts((prev) => prev.filter((t) => t.id != id))
    }

  return (
    <ToastContext.Provider value={{addToast}}>
        {children}
        <Toast toasts={toasts}/>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
