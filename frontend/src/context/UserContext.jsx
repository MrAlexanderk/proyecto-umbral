import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(true);

  // Este useEffect se ejecuta solo al montar el Provider y lee localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) setToken(storedToken);
    if (storedEmail) setEmail(storedEmail);

    setLoading(false); // Termina de cargar
  }, []);

  const login = async (credentials) => {
    try {
      // Fake login for demonstration purposes
      const fakeToken = "fake-jwt-token-1234567890";
      setToken(fakeToken);

      /*
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const { token, email } = response.data;
      setToken(token);
      */
      setEmail(email);

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Fake sign up for demonstration purposes
      const fakeToken = "fake-jwt-token-1234567890";
      setToken(fakeToken);
      setEmail(userData.email);

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("email", userData.email);

      /*
      // Código original para registro con API, comentado
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );
      const { token } = response.data;

      setToken(token);
      setEmail(userData.email);

      localStorage.setItem("token", token);
      localStorage.setItem("email", userData.email);
      */
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const getProfile = async () => {


    try {
      // Datos falsos estáticos para desarrollo sin backend
      return {
        username: "shadowhunter",
        email: "shadowhunter@umbral.com",
        passwordLength: 8, // No mostrar contraseña real, solo longitud
      };

      /*
      // Código real para cuando exista backend
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      */
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;