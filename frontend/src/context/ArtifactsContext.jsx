import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  GiSkeleton,
  GiMirrorMirror,
  GiAncientSword,
  GiDiamondRing,
  GiClothes,
} from "react-icons/gi";
import { FaBookDead, FaMicrochip, FaQuestionCircle } from "react-icons/fa";

/** Categorías 1-based (mismo orden que en UserContext) */
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


// ------- Datos dummy (type_id 1-based para coincidir con UserContext) -------
const DUMMY = [
  {
    id: 1,
    name: "Grimoire of Whispers",
    image:
      "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop",
    type_id: 3, // Books
    history: "Encontrado en un desván húmedo; susurros a medianoche.",
    origin: "Transylvania",
    age: 120,
    price: 100000,
  },
  {
    id: 2,
    name: "Marionette Élodie",
    image:
      "https://images.unsplash.com/photo-1547323995-8c9a1d7c9d8b?q=80&w=1200&auto=format&fit=crop",
    type_id: 1, // Dolls
    history: "Ojos móviles sin mecanismo aparente.",
    origin: "Paris",
    age: 90,
    price: 80000,
  },
  {
    id: 3,
    name: "Gazing Glass",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop",
    type_id: 2, // Mirrors
    history: "Reflejos con retardo de varios segundos.",
    origin: "Venice",
    age: 200,
    price: 120000,
  },
  {
    id: 4,
    name: "Hexed Microchip v1",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    type_id: 4, // Tech
    history: "Provoca estática y glitches en radios cercanas.",
    origin: "Silicon Valley",
    age: 5,
    price: 15000,
  },
  {
    id: 5,
    name: "Crimson Locket",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1200&auto=format&fit=crop",
    type_id: 6, // Lockets
    history: "La foto interior se renueva cada luna llena.",
    origin: "London",
    age: 70,
    price: 50000,
  },
  {
    id: 6,
    name: "Torn Shroud",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    type_id: 7, // Garments
    history: "Olor a incienso incluso sellado al vacío.",
    origin: "Jerusalem",
    age: 600,
    price: 200000,
  },
];

const ArtifactsContext = createContext(null);

export const ArtifactsProvider = ({ children }) => {
  const [artifacts, setArtifacts] = useState(DUMMY);

  /** Helpers de categorías */
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

  /** Si luego conectas backend, expón una función para traer artefactos del “mercado” */
  const getAllArtifacts = useCallback(async () => {
    // TODO: reemplazar por fetch real
    return artifacts;
  }, [artifacts]);

  const value = useMemo(
    () => ({
      artifacts,
      setArtifacts,
      getAllArtifacts,
      categories: CATEGORIES,        // acceso directo
      getCategories,                 // función para obtener todas
      getCategoryById,               // objeto categoría
      getCategoryLabelById,          // string label
      getCategoryIconById,           // componente Icon
    }),
    [
      artifacts,
      getAllArtifacts,
      getCategories,
      getCategoryById,
      getCategoryLabelById,
      getCategoryIconById,
    ]
  );

  return (
    <ArtifactsContext.Provider value={value}>{children}</ArtifactsContext.Provider>
  );
};

export const useArtifacts = () => {
  const ctx = useContext(ArtifactsContext);
  if (!ctx) throw new Error("useArtifacts debe usarse dentro de ArtifactsProvider");
  return ctx;
};
