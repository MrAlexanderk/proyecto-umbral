import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CATEGORIES } from "./ArtifactsContext";

export const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({ baseURL: API_URL });

const setAuthHeader = (jwt) => {
  if (jwt) api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  else delete api.defaults.headers.common.Authorization;
};

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

      setAuthHeader(jwt);

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

      setAuthHeader(jwt);

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
    setAuthHeader(null);
    setToken(null);
    setEmail("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const getProfile = useCallback(async () => {
    try {
      if(!token) return null;
      if (user) return user;
      const { data } = await api.get("/auth/me");
      setUser(data);
      return data;
    } catch (error) {
      if (error?.response?.status === 401) {
        logout();
      }
      console.error("Failed to fetch profile:", error?.response?.data || error.message);
      return null;
    }
  }, [user, token]);

  const getArtifactsFromUser = async () => {
    try {
      // Evita llamar si no hay token
      if (!token) return [];
      const { data } = await api.get("/artifacts/user");
      return data; // array de artefactos
    } catch (error) {
      console.error("Failed to fetch artifacts:", error?.response?.data || error.message);
      return [];
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
        getTypeNameById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
