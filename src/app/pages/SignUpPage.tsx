import { SignUpForm } from "../components/organizms/forms/SignUp/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="signin__form">
      <h2 className="signin__title">Sign Up</h2>
      <p className="signin__leading">Hello new user!</p>

      <SignUpForm />
    </div>
  );
};
export { SignUpPage };
