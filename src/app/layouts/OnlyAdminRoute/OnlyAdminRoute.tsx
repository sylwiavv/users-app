import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../../components/atoms/Loader/Loader";
import { useEffect, useState } from "react";

const OnlyAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    if (!isLoading && currentUser?.role) {
      setIsAdmin(currentUser?.role?.toUpperCase() === "ADMIN");
      setIsReady(true);
    }
  }, [isLoading, currentUser]);

  if (isLoading || !isReady) {
    return <Loader />;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/address-book" replace />;
};

export default OnlyAdminRoute;
