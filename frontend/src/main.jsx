import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';
import UserProvider from './context/UserContext.jsx';
import { ArtifactsProvider } from './context/ArtifactsContext.jsx';
import CartProvider from "./context/CartContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArtifactsProvider>
      <CartProvider>
        <UserProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </UserProvider>
      </CartProvider>
    </ArtifactsProvider>
  </StrictMode>,
)
