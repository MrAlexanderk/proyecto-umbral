import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  GiSkeleton,
  GiMirrorMirror,
  GiAncientSword,
  GiDiamondRing,
  GiClothes,
} from "react-icons/gi";
import { FaBookDead, FaMicrochip, FaQuestionCircle } from "react-icons/fa";


// Por ahora están aquí, después con el backend lo actualizaré
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


// ------- Datos dummy (type_id para coincidir con UserContext) -------
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
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
    description: "Esta es una descripción genérica solo para ejemplo visual.",
  },
  {
    id: 7,
    name: "Echoing Bell",
    image:
      "https://images.unsplash.com/photo-1522430251042-06d4a2de8bdb?q=80&w=1200&auto=format&fit=crop",
    type_id: 5, // Instruments
    history: "Repica sin tocarla cuando hay tormenta eléctrica.",
    origin: "Salem",
    age: 150,
    price: 45000,
    description: "Campana antigua con sonido inquietante.",
  },
  {
    id: 8,
    name: "Shadow Puppet",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    type_id: 1, // Dolls
    history: "Se mueve solo cuando no la miras.",
    origin: "Bali",
    age: 60,
    price: 60000,
    description: "Marioneta oscura con vida propia.",
  },
  {
    id: 9,
    name: "Cursed Compass",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200&auto=format&fit=crop",
    type_id: 4, // Tech
    history: "Siempre apunta hacia la tragedia más cercana.",
    origin: "Iceland",
    age: 130,
    price: 110000,
    description: "Brújula que predice eventos funestos.",
  },
  {
    id: 10,
    name: "Phantom Cloak",
    image:
      "https://images.unsplash.com/photo-1518674660708-462e7f702533?q=80&w=1200&auto=format&fit=crop",
    type_id: 7, // Garments
    history: "Desaparece y reaparece con su portador.",
    origin: "Scotland",
    age: 250,
    price: 180000,
    description: "Capa que juega con la realidad.",
  },
  {
    id: 11,
    name: "Witch's Mirror",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop",
    type_id: 2, // Mirrors
    history: "Refleja futuros inciertos.",
    origin: "Salem",
    age: 300,
    price: 140000,
    description: "Espejo que muestra más allá del presente.",
  },
  {
    id: 12,
    name: "Siren's Locket",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1200&auto=format&fit=crop",
    type_id: 6, // Lockets
    history: "Emite sonidos de sirena al abrirse.",
    origin: "Greece",
    age: 110,
    price: 75000,
    description: "Relicario con voces del mar.",
  },
  {
    id: 13,
    name: "The Whispering Doll",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop",
    type_id: 1, // Dolls
    history: "Susurra secretos antiguos por la noche.",
    origin: "New Orleans",
    age: 95,
    price: 82000,
    description: "Muñeca con voz misteriosa.",
  },
  {
    id: 14,
    name: "Bloodied Tome",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
    type_id: 3, // Books
    history: "Las páginas se manchan solas con sangre fresca.",
    origin: "Prague",
    age: 210,
    price: 130000,
    description: "Libro maldito con historias sangrientas.",
  },
  {
    id: 15,
    name: "Mirror of Lost Souls",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop",
    type_id: 2, // Mirrors
    history: "Atrapó las almas de sus antiguos dueños.",
    origin: "Venice",
    age: 400,
    price: 160000,
    description: "Espejo con presencia espectral.",
  },
  {
    id: 16,
    name: "Ghostly Phonograph",
    image:
      "https://images.unsplash.com/photo-1516166320925-c3b5d5c41ff2?q=80&w=1200&auto=format&fit=crop",
    type_id: 5, // Instruments
    history: "Reproduce voces de otra dimensión.",
    origin: "New York",
    age: 90,
    price: 90000,
    description: "Fonógrafo que reproduce el más allá.",
  },
  {
    id: 17,
    name: "Enchanted Tarot Deck",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
    type_id: 3, // Books (could be cards but keep consistent)
    history: "Las cartas cambian su significado con cada lectura.",
    origin: "Morocco",
    age: 50,
    price: 65000,
    description: "Baraja mágica con destino variable.",
  },
  {
    id: 18,
    name: "The Howling Skull",
    image:
      "https://images.unsplash.com/photo-1533055640609-24b498cdfa20?q=80&w=1200&auto=format&fit=crop",
    type_id: 8, // Skulls or similar
    history: "Emite aullidos en noches sin luna.",
    origin: "Alaska",
    age: 300,
    price: 110000,
    description: "Calavera con sonidos inquietantes.",
  },
  {
    id: 19,
    name: "Cursed Pocket Watch",
    image:
      "https://images.unsplash.com/photo-1486308510493-cb917f2acb4e?q=80&w=1200&auto=format&fit=crop",
    type_id: 4, // Tech / accessories
    history: "El tiempo se detiene cuando se abre.",
    origin: "Berlin",
    age: 85,
    price: 85000,
    description: "Reloj de bolsillo con poder sobre el tiempo.",
  },
  {
    id: 20,
    name: "Haunted Typewriter",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    type_id: 4, // Tech (mechanical)
    history: "Escribe mensajes sin que nadie la toque.",
    origin: "London",
    age: 100,
    price: 98000,
    description: "Máquina de escribir con voluntad propia.",
  },
  {
    id: 21,
    name: "Spectral Lantern",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    type_id: 5, // Instruments / tools
    history: "Ilumina sombras que no existen.",
    origin: "Iceland",
    age: 180,
    price: 70000,
    description: "Farol que revela lo invisible.",
  },
  {
    id: 22,
    name: "Eldritch Ring",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    type_id: 6, // Lockets / Jewelry
    history: "Quien lo lleva puede oír voces lejanas.",
    origin: "Egypt",
    age: 400,
    price: 210000,
    description: "Anillo con conexión a otro plano.",
  },
  {
    id: 23,
    name: "Veil of the Banshee",
    image:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop",
    type_id: 7, // Garments
    history: "Al cubrirse, se escuchan lamentos lejanos.",
    origin: "Ireland",
    age: 350,
    price: 190000,
    description: "Velo con aura fantasmal.",
  },
];


export const ArtifactsContext = createContext();

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

  const getAllArtifacts = useCallback(async () => {
    // TODO: reemplazar por fetch real
    // Tengo que revisarlo de todas formas porque tengo que ajustarlo para que los filtros los haga SQL
    return artifacts;
  }, [artifacts]);

  return (
    <ArtifactsContext.Provider
      value={{
        artifacts,
        setArtifacts,
        getAllArtifacts,
        categories: CATEGORIES,
        getCategories,
        getCategoryById,
        getCategoryLabelById,
        getCategoryIconById
      }}
    >
      {children}
    </ArtifactsContext.Provider>
  );
};

export const useArtifacts = () => {
  const ctx = React.useContext(ArtifactsContext);
  if (!ctx) throw new Error("useArtifacts debe usarse dentro de <ArtifactsProvider>");
  return ctx;
};

export default ArtifactsProvider;