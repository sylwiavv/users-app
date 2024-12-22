import { Routes, Route } from "react-router";
import { SignInPage, SignUpPage } from "../pages";

export const NotProtectedLayout = () => {
  return (
    <main className="is-not-authorized">
      <Routes>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </main>
  );
};
