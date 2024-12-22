import FormField from "../../../atoms/FormField/FormField";
import { useForm } from "../../../../hooks/useForm";
import { signInValidate } from "../../forms/SignIn/SignInValidate";
import { useSignInUser } from "../../../../../server-actions/hooks/useSignInUser";
import { ISigInUser } from "../../../../types/users";
import { useBcrypt } from "../../../../../server-actions/hooks/useBcrypt";
import { NavLink, useNavigate } from "react-router-dom";
import { generateToken } from "../../../../../server-actions/hooks/useGenerateToken";
import { useAuth } from "../../../../context/AuthContext";
import {
  ESnackbarTypes,
  useSnackbar,
} from "../../../../context/SnackbarContex";

interface IFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const defaultValues = {
    password: "",
    email: "",
  };

  const { checkSignInUser, generateSignInToken, createSignInUser } =
    useSignInUser();
  const { checkBcryptPasswordHash } = useBcrypt();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const findPassingUser = (email: string, users: ISigInUser[]) => {
    const emailFormatted = email.toLowerCase().trim();
    return users.find(
      (user) => user.email.toLowerCase().trim() === emailFormatted
    );
  };

  const { login } = useAuth();

  const checkBcryptPassword = async ({ password, email }: IFormData) => {
    // const users = await checkSignInUser();

    // const passingUser = findPassingUser(email, users);

    // if (!passingUser) return;

    // const hashedPassword = passingUser.password;

    // const passwordPassing = await checkBcryptPasswordHash(
    //   hashedPassword,
    //   password
    // );

    const dataSignInUser = { password, email };
    const response = await createSignInUser(dataSignInUser);
    console.log(response)

    // if (response.status === 201) {
    //   enqueueSnackbar("Correct", {
    //     variant: ESnackbarTypes.SUCCESS,
    //   });
    // } else {
    //   enqueueSnackbar(response.error.message, {
    //     variant: ESnackbarTypes.ERROR,
    //   });
    // }

    // if (passwordPassing) {
    //   // here will be snackbar success
    //   const token = generateToken()
    //   const data = {email, token}

    //   generateSignInToken(data)

    //   sessionStorage.setItem(
    //     "currentUser",
    //     JSON.stringify({ isAuthenticated: true, id: passingUser.id, email, token })
    //   );
    //   login({isAuthenticated: true, id: passingUser.id, email})

    // navigate("/address-book");

    // } else {
    //   // here will be snackbar error
    // }
  };

  const handleOnSubmit = () => {
    const formData = {
      email: formValues.email,
      password: formValues.password,
    };

    checkBcryptPassword(formData);
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
        <button type="submit" className="signin__button blue-button">
          Sign In
        </button>
      </div>
      <div className="signin__form-group">
        <p className="signin__signup-link">
          <NavLink to={"/signup"}>Don't have an account? Sign Up here</NavLink>
        </p>
      </div>
    </form>
  );
};
