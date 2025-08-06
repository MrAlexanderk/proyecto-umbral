import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  return (
    <AppContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
