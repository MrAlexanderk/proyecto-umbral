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
import AddArtifact from './pages/AddArtifact';
import ArtifactView from './pages/ArtifactView';
import ArtifactSingle from './pages/ArtifactSingle';
import Cart from "./pages/Cart"
import Footer from './components/Footer';

import { UserContext } from './context/UserContext';

function App() {
  const { token, loading } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artifacts" element={<ArtifactView />} />
        <Route
          path="/login"
          element={!loading ? <LogIn /> : null}
        />
        <Route
          path="/signup"
          element={!loading ? <SignUp /> : null}
        />
        {/* Rutas protegidas */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-artifact"
          element={
            <ProtectedRoute>
              <AddArtifact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artifacts/:id"
          element={
            <ProtectedRoute>
              <ArtifactSingle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
