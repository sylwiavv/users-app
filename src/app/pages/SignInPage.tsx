import { SignInForm } from "../components/organizms/forms/SignIn/SignInForm";

type TFormValues = Record<string, string>;

interface IValidateProps {
  value: string;
  name: string;
  errors: Record<string, string>;
}

const SignInPage = () => {
  return (
    <div className="sign__form in">
      <h2 className="sign__title">Sign In</h2>

      <SignInForm />

    </div>
  );
};

export { SignInPage };
