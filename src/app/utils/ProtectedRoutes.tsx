import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UsersProvider } from "../context/UsersContext";
import { useUser } from "./../../server-actions/hooks/useUser";

const PrivateRoutes = () => {
  const currentUserFromSession = JSON.parse(
    sessionStorage.getItem("currentUser") || "null"
  );
  const { getUsers } = useUser();

  return currentUserFromSession?.isAuthenticated ? (
    <UsersProvider getUsers={getUsers}>
      <Outlet />
    </UsersProvider>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
