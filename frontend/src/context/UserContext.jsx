import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CATEGORIES } from "./ArtifactsContext";

export const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({ baseURL: API_URL });
console.log("API_URL =", API_URL); // Debe mostrar http://localhost:5000/api

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) setToken(storedToken);
    if (storedEmail) setEmail(storedEmail);

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      const { token: jwt, email: serverEmail } = data;

      setToken(jwt);
      setEmail(serverEmail);
      localStorage.setItem("token", jwt);
      localStorage.setItem("email", serverEmail);

      return true;
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      const { token: jwt, email: serverEmail } = data;

      setToken(jwt);
      setEmail(serverEmail);
      localStorage.setItem("token", jwt);
      localStorage.setItem("email", serverEmail);

      return true;
    } catch (error) {
      console.error("Registration failed:", error?.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setEmail("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const getProfile = useCallback(async () => {
    try {
      if (user) return user;
      const { data } = await api.get("/auth/me");
      setUser(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch profile:", error?.response?.data || error.message);
      return null;
    }
  }, [user]);

  const getArtifactsFromUser = async () => {
    try {
      // Datos de prueba (asignados al user)
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
          image: "https://images.unsplash.com/photo-1602592867152-ba321a437ff0?q=80&w=687&auto=format&fit=crop"
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
          image: "https://images.unsplash.com/photo-1438012940875-4bf705025a8a?q=80&w=1170&auto=format&fit=crop"
        }
      ];

      return testData;

      /*
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

  const addArtifact = async (artifactData) => {
    try {
      console.log("Simulación: enviando artifact al backend:", artifactData);
      return {
        id: Math.floor(Math.random() * 10000),
        ...artifactData,
        created_at: new Date().toISOString(),
      };

      /*
      const response = await axios.post(
        "http://localhost:5000/api/artifacts",
        artifactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
      */
    } catch (error) {
      console.error("Failed to add artifact:", error);
      throw error;
    }
  };

  const updateProfile = async (updatedData) => {
    try {

      const { data } = await api.put("/auth/me", updatedData);

      if (data?.email) {
        setEmail(data.email);
        localStorage.setItem("email", data.email);
      }
      setUser((prev) => ({ ...(prev || {}), ...data }));
      return data;
    } catch (error) {
      console.error("Update profile failed:", error?.response?.data || error.message);
      throw error;
    }
  };

  const getTypeNameById = useCallback(
    async (id) => {
      const found = CATEGORIES.find((cat) => cat.id === Number(id));
      return found ? found.label : null;
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        user,
        login,
        register,
        logout,
        getProfile,
        loading,
        updateProfile,
        getArtifactsFromUser,
        addArtifact,
        getTypeNameById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
