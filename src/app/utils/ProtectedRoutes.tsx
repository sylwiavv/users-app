import { Outlet, Navigate } from "react-router-dom";
import { useAuth,  } from "../context/AuthContext";

const PrivateRoutes = () => {
  const currentUserFromSession = JSON.parse(sessionStorage.getItem("currentUser") || "null");

  return currentUserFromSession?.isAuthenticated ? (
      <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
