import React, { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const BwSwal = withReactContent(Swal)

export const Config = createContext()

function ConfigProvider({children}) {
    const [sidebar,setSidebar] = useState(false);
  return (
   <Config.Provider value={{sidebar,setSidebar,BwSwal}}>{children} <ToastContainer autoClose={500} theme="colored"  /></Config.Provider>
  )
}

export default ConfigProvider