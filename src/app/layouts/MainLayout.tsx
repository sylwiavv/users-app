import { Header } from "./Header";
import { Routes, Route, useLocation, Navigate } from "react-router";
import {
  AddressBookPage,
  SettingsPage,
  WrappedUserDetailsPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
} from "../pages";
import PrivateRoutes from "../utils/ProtectedRoutes";
import OnlyAdminRoute from "./OnlyAdminRoute/OnlyAdminRoute";
import { useAuth } from "../context/AuthContext";
import { Loader } from "../components/atoms/Loader/Loader";

const MainLayout = () => {
  const location = useLocation();
  const isUserDetails = location.pathname.includes("user-details");
  const currentUserFromSession = JSON.parse(
    sessionStorage.getItem("currentUser") || "null"
  );
  const { isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <>
      {currentUserFromSession?.isAuthenticated && <Header />}

      <main
        className={`${
          currentUserFromSession?.isAuthenticated
            ? "is-authorized"
            : "is-not-authorized"
        } ${isUserDetails ? "background-with-shadow" : ""}`}
      >
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Navigate to="/address-book" replace />} />
            <Route path="address-book" element={<AddressBookPage />} />
            <Route
              path="settings"
              element={
                <OnlyAdminRoute>
                  <SettingsPage />
                </OnlyAdminRoute>
              }
            />
            <Route
              path="user-details/:id"
              element={<WrappedUserDetailsPage />}
            />
          </Route>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
      </main>
    </>
  );
};

export default MainLayout;
