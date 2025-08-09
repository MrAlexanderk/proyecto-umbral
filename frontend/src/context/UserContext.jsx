import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

import {
  GiSkeleton,
  GiMirrorMirror,
  GiAncientSword,
  GiDiamondRing,
  GiClothes,
} from "react-icons/gi";
import { FaBookDead, FaMicrochip, FaQuestionCircle } from "react-icons/fa";

const categories = [
  { label: "Dolls", icon: GiSkeleton, to: "/category/dolls" },
  { label: "Mirrors", icon: GiMirrorMirror, to: "/category/mirrors" },
  { label: "Books", icon: FaBookDead, to: "/category/books" },
  { label: "Tech", icon: FaMicrochip, to: "/category/tech" },
  { label: "Relics", icon: GiAncientSword, to: "/category/relics" },
  { label: "Lockets", icon: GiDiamondRing, to: "/category/lockets" },
  { label: "Garments", icon: GiClothes, to: "/category/garments" },
  { label: "Others", icon: FaQuestionCircle, to: "/category/others" },
];

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

  const getProfile = useCallback(async () => {
    try {
      if(user) return user;
      else{
        // Datos falsos por el momento
        const fakeUser = {
          username: "shadowhunter",
          email: "shadowhunter@umbral.com",
          passwordLength: 8,
          id: 1
        };

        setUser(fakeUser);
        return fakeUser;
      }

    /*
    // Código real para cuando exista backend
    const response = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
    return response.data;
    */

    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  }, [user, token]);

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

  const addArtifact = async (artifactData) => {
    try {
      // --- Datos de prueba para desarrollo ---
      console.log("Simulación: enviando artifact al backend:", artifactData);
      return {
        id: Math.floor(Math.random() * 10000), // id simulado
        ...artifactData,
        created_at: new Date().toISOString(),
      };

      /*
      // --- Código real para backend ---
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
      /*
      // Código real para backend (descomenta y ajusta URL)
      const response = await axios.put(
        "/api/auth/me",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
      */

      // Fake update (simulación por ahora)
      console.log("Updating profile with data:", updatedData);

      if (updatedData.email) {
        setEmail(updatedData.email);
        localStorage.setItem("email", updatedData.email);
      }

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
        passwordLength: updatedData.password ? updatedData.password.length : prevUser?.passwordLength || 8,
      }));

      // Retornar el perfil actualizado (fake)
      return {
        ...user,
        ...updatedData,
        passwordLength: updatedData.password ? updatedData.password.length : user?.passwordLength || 8,
      };
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  };



  const getTypeNameById = useCallback(
    async (id) => {
      // Código real backend:
      /*
      try {
        const response = await axios.get('/api/types');
        const types = response.data;
        const found = types.find((type) => type.id === id);
        return found ? found.name : null;
      } catch (error) {
        console.error("Failed to fetch types:", error);
        return null;
      }
      */

      // Código falso/hardcodeado:
      // Nota: asumiendo que id corresponde a índice+1 en categories
      const index = id - 1;
      if (index >= 0 && index < categories.length) {
        return categories[index].label;
      }
      return null;
    },
    []
  );


  return (
    <UserContext.Provider
      value={{ token, email, user, login, register, 
        logout, getProfile, loading, updateProfile, 
        getArtifactsFromUser, addArtifact, getTypeNameById
       }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;