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

  const getArtifactsFromUser = async () => {
    try {
      // Datos de prueba estáticos para desarrollo
      const testData = [
        {
          id: 1,
          user_id: 101,
          status_id: 1,
          type_id: 3,
          name: "Amuleto de Sombras",
          description: "Un amuleto antiguo que absorbe la luz.",
          history: "Se dice que perteneció a un guardián de secretos oscuros.",
          price: 2500,
          age: "476",
          origin: "España",
          created_at: "2024-12-01T10:00:00Z",
          image: "https://images.unsplash.com/photo-1602592867152-ba321a437ff0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 2,
          user_id: 101,
          status_id: 2,
          type_id: 2,
          name: "Espada de Fuego",
          description: "Una espada que siempre está caliente al tacto.",
          history: "Fue forjada en un volcán activo por un herrero legendario.",
          price: 4800,
          age: "23",
          origin: "Japón",
          created_at: "2025-01-15T14:30:00Z",
          image: "https://images.unsplash.com/photo-1438012940875-4bf705025a8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ];

      return testData;

      /*
      // Código real comentado para el backend
      const response = await axios.get("/artifacts/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      */
    } catch (error) {
      console.error("Failed to fetch artifacts:", error);
      return [];
    }
  };


  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile, loading, getArtifactsFromUser  }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;