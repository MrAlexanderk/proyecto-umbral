import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';
import UserProvider from './context/UserContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProvider>
  </StrictMode>,
)
