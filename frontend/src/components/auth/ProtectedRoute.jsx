import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: 'umbral-popup', 
          title: 'umbral-title',
        },
      });
    } else {
      Swal.close(); // Cierra el loading cuando ya no esté cargando
    }
  }, [loading]);

  if (loading) {
    // Si aún está cargando, no renderiza nada. Agregar un componente
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;