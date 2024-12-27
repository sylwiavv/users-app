import GoBackButton from "../components/atoms/GoBackButton/GoBackButton";
import { SignUpForm } from "../components/organizms/forms/SignUp/SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <div className="sign__form up">
      <GoBackButton link="/signin" text="go to sign in" />

        <h2 className="sign__title">Sign Up</h2>
        <p className="sign__leading">Hello new user.</p>

        <SignUpForm />
      </div>
    </>
  );
};
export { SignUpPage };
