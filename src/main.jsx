 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import ConfigProvider from './components/ConfigProvider.jsx'
 

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/admin">
    <ConfigProvider>
    <App />
    </ConfigProvider>
   
  </BrowserRouter>,
)
