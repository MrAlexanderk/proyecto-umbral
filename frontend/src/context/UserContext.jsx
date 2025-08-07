import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const { token, email } = response.data;
      setToken(token);
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
      // Simulación de registro exitoso sin conexión a backend:
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
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
