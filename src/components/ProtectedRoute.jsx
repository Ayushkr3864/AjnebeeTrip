import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking admin access...</p>;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
