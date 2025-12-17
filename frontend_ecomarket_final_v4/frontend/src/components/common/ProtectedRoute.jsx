import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  if (requiredRoles && !requiredRoles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
