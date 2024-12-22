import { SignInForm } from "../components/organizms/forms/SignIn/SignInForm";

type TFormValues = Record<string, string>;

interface IValidateProps {
  value: string;
  name: string;
  errors: Record<string, string>;
}

const SignInPage = () => {
  return (
    <div className="signin__form">
      <h2 className="signin__title">Sign In</h2>

      <SignInForm />

    </div>
  );
};

export { SignInPage };
