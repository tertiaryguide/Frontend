import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth(); // ✅ Use isAuthenticated instead of isLoggedIn

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
