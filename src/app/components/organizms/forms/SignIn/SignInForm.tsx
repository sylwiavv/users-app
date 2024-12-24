import FormField from "../../../atoms/FormField/FormField";
import { useForm } from "../../../../hooks/useForm";
import { signInValidate } from "../../forms/SignIn/SignInValidate";
import { useSignInUser } from "../../../../../server-actions/hooks/useSignInUser";
import { ISigInUser } from "../../../../types/users";
import { NavLink, useNavigate } from "react-router-dom";
import { generateToken } from "../../../../../server-actions/hooks/useGenerateToken";
import { useAuth } from "../../../../context/AuthContext";
import {
  ESnackbarTypes,
  useSnackbar,
} from "../../../../context/SnackbarContex";
import { ButtonWithSpinner } from "../../../atoms/ButtonWithSpinner/ButtonWithSpinner";
import { useState } from "react";

interface IFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const defaultValues = {
    password: "",
    email: "",
  };

  const { generateSignInToken, createSignInUser } = useSignInUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const findPassingUser = (email: string, users: ISigInUser[]) => {
    const emailFormatted = email.toLowerCase().trim();
    return users.find(
      (user) => user.email.toLowerCase().trim() === emailFormatted
    );
  };

  const { login } = useAuth();

  const signIn = async ({ password, email }: IFormData) => {
    setIsLoading(true);

    const dataSignInUser = { password, email };
    const response = await createSignInUser(dataSignInUser);

    if (response.error) {
      enqueueSnackbar(response.error.message, {
        variant: ESnackbarTypes.ERROR,
      });
      setIsLoading(false);
    } else if (response.data) {
      enqueueSnackbar("Success", {
        variant: ESnackbarTypes.SUCCESS,
      });
      setIsLoading(false);

      const token = generateToken();
      const data = { email, token };
      generateSignInToken(data);

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          isAuthenticated: true,
          id: response.data.id,
          email,
          token,
        })
      );
      login({ isAuthenticated: true, id: response.data.id, email });

      navigate("/address-book");
    }
  };

  const handleOnSubmit = () => {
    const formData = {
      email: formValues.email as string,
      password: formValues.password as string,
    };

    signIn(formData);
  };

  const {
    handleInputChange,
    formValues,
    errors,
    handleSubmit,
    handleInputBlur,
  } = useForm(defaultValues, handleOnSubmit, signInValidate);

  return (
    <form className="signin__form-content" onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="email"
        name="email"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={formValues.email}
        error={errors.email}
      />

      <FormField
        id="password"
        label="password"
        name="password"
        type="password"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={formValues.password}
        error={errors.password}
      />

      <div className="signin__form-group">
        <ButtonWithSpinner
          type={"submit"}
          className="signin__button blue-button"
          isLoading={isLoading}
          onClick={handleOnSubmit}
        >
          Send
        </ButtonWithSpinner>
      </div>
      <div className="signin__form-group">
        <p className="signin__signup-link">
        Don't have an account?
          <NavLink to={"/signup"}>{" "}Sign Up here</NavLink>
        </p>
      </div>
    </form>
  );
};
