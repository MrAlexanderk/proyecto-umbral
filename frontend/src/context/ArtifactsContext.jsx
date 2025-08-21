import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import {
  GiSkeleton,
  GiMirrorMirror,
  GiAncientSword,
  GiDiamondRing,
  GiClothes,
} from "react-icons/gi";
import { FaBookDead, FaMicrochip, FaQuestionCircle } from "react-icons/fa";

export const CATEGORIES = [
  { id: 1, label: "Dolls",    icon: GiSkeleton,      to: "/category/dolls" },
  { id: 2, label: "Mirrors",  icon: GiMirrorMirror,  to: "/category/mirrors" },
  { id: 3, label: "Books",    icon: FaBookDead,      to: "/category/books" },
  { id: 4, label: "Tech",     icon: FaMicrochip,     to: "/category/tech" },
  { id: 5, label: "Relics",   icon: GiAncientSword,  to: "/category/relics" },
  { id: 6, label: "Lockets",  icon: GiDiamondRing,   to: "/category/lockets" },
  { id: 7, label: "Garments", icon: GiClothes,       to: "/category/garments" },
  { id: 8, label: "Others",   icon: FaQuestionCircle,to: "/category/others" },
];

export const ArtifactsContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({ baseURL: API_URL });

export const ArtifactsProvider = ({ children }) => {
  const [artifacts, setArtifacts] = useState([]);

  const getCategories = useCallback(() => CATEGORIES, []);
  const getCategoryById = useCallback(
    (id) => CATEGORIES.find((c) => c.id === Number(id)) || null,
    []
  );
  const getCategoryLabelById = useCallback(
    (id) => getCategoryById(id)?.label ?? null,
    [getCategoryById]
  );
  const getCategoryIconById = useCallback(
    (id) => getCategoryById(id)?.icon ?? null,
    [getCategoryById]
  );

  const getAllArtifacts = useCallback(async () => {
    try {
      const { data } = await api.get("/artifacts");
      setArtifacts(data);
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch artifacts.";
      console.error(message);
      throw new Error(message);
    }
  }, []);

  const getMyArtifacts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const { data } = await api.get("/artifacts/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch your artifacts.";
      console.error(message);
      throw new Error(message);
    }
  }, []);

  const addArtifact = async (artifactData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const { data } = await api.post("/artifacts", artifactData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArtifacts((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to add artifact.";
      console.error(message);
      throw new Error(message);
    }
  };

  const updateArtifact = async (id, patch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const { data } = await api.put(`/artifacts/${id}`, patch, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArtifacts((prev) => prev.map((a) => (a.id === id ? data : a)));
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update artifact.";
      console.error(message);
      throw new Error(message);
    }
  };

  const removeArtifact = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await api.delete(`/artifacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArtifacts((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to remove artifact.";
      console.error(message);
      throw new Error(message);
    }
  };

  return (
    <ArtifactsContext.Provider
      value={{
        artifacts,
        setArtifacts,
        getAllArtifacts,
        getMyArtifacts,
        addArtifact,
        updateArtifact,
        removeArtifact,
        categories: CATEGORIES,
        getCategories,
        getCategoryById,
        getCategoryLabelById,
        getCategoryIconById,
      }}
    >
      {children}
    </ArtifactsContext.Provider>
  );
};

export const useArtifacts = () => {
  const ctx = useContext(ArtifactsContext);
  if (!ctx) throw new Error("useArtifacts debe usarse dentro de <ArtifactsProvider>");
  return ctx;
};

export default ArtifactsProvider;
