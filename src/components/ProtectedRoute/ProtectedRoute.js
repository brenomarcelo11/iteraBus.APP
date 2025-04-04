import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";


export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === null) {
    // Ainda não sabemos se está logado, ou deu erro na requisição
    return <Navigate to="/login" replace />;
  }

  return children;
}
