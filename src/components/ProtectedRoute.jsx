import { Navigate, useLocation } from "react-router-dom";
import { getStoredUser } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === "agent" ? "/agent/dashboard" : "/dashboard"} replace />;
  }

  return children;
}
