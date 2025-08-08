import './App.css'
import './styles/styles.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Footer from './components/Footer';

import { UserContext } from './context/UserContext';

function App() {
  const { token } = useContext(UserContext);



  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
            <Route 
              path="/profile" 
              element={token ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/register" 
              element={!token ? <SignUp /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!token ? <LogIn /> : <Navigate to="/" />} 
            />
        {/* Agrega más rutas luego */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
