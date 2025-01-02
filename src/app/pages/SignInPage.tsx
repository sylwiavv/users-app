import { SignInForm } from "../components/organizms/forms/SignIn/SignInForm";

const SignInPage = () => {
  const IS_PRODUCTION = process.env.NODE_ENV === "production";
console.log(IS_PRODUCTION, "IS_PRODUCTION")
  return (
    <div className="sign__form in">
      <h2 className="sign__title">Sign In</h2>

      <SignInForm />
    </div>
  );
};

export { SignInPage };
