import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../../components/atoms/Loader/Loader";

const OnlyAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === "admin";
  if (!currentUser?.id) return <Loader />

  return isAdmin ? <>{children}</> : <Navigate to="/address-book" replace />;
};

export default OnlyAdminRoute;
