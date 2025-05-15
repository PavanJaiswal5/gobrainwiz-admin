import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import ConfigProvider from './components/ConfigProvider.jsx'
import { AuthProvider } from './context/AuthContext.jsx' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/admin">
    <ConfigProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </ConfigProvider>
  </BrowserRouter>
)
