import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { token, loading } = useContext(UserContext);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
