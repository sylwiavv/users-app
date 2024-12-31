import { useEffect, useState } from "react";
import { useManager } from "../../../../../server-actions/hooks/useManager";
import { IManager, IVisa } from "../../../../types/users";
import { useForm } from "../../../../hooks/useForm";
import FormField from "../../../atoms/FormField/FormField";
import {
  INewCreatedUser,
  useUser,
} from "../../../../../server-actions/hooks/useUser";
import { NavLink } from "react-router-dom";
import CheckboxField from "../../../atoms/CheckboxField/CheckboxField";
import {
  useSnackbar,
  ESnackbarTypes,
} from "../../../../context/SnackbarContex";

import { formatDate } from "../../../../utils/helpers";
import {
  ContactInfoSection,
  PersonalInfoSection,
  GeneralInfoSection,
} from "./SignUpFormSections";
import { useNavigate } from "react-router-dom";
import { ButtonWithSpinner } from "../../../atoms/ButtonWithSpinner/ButtonWithSpinner";
import { VisaSection } from "./SignUpFormSections/VisaSection";
import { signUpValidate } from "./signUpValidate";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getManagers } = useManager();
  const { createUser } = useUser();

  const [managers, setManagers] = useState<IManager[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visaList, setVisaList] = useState<IVisa[]>([
    { issuing_country: "", type: "", start_date: "", end_date: "" },
  ]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getManagers();
        setManagers(response.data);
      } catch {
        enqueueSnackbar("Error occured during fetching managers", {
          variant: ESnackbarTypes.ERROR,
        });
      }
    })();
  }, []);

  const defaultValues = {
    first_name: "",
    last_name: "",
    department: "",
    building: "",
    room: "",
    desk_number: "",
    phone: "",
    skype: "",
    cnumber: "",
    citizenship: "",
    manager_id: "",
    isRemoteWork: false,
    email: "",
    password: "",
    user_avatar: "",
    first_native_name: "",
    last_native_name: "",
    middle_native_name: "",
    date_birth: "",
    visa: [
      {
        issuing_country: "",
        type: "",
        start_date: "",
        end_date: "",
      },
    ],
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const formattedDate = formatDate(formValues.date_birth as Date);

    const newUser = {
      ...formValues,
      date_birth: formattedDate,
      visa: visaList,
    } as INewCreatedUser;

    const response = await createUser(newUser);
    if (response.status === 201) {
      enqueueSnackbar("User successfully created!", {
        variant: ESnackbarTypes.SUCCESS,
      });
      navigate("/signin");
      setIsLoading(false);
    } else {
      enqueueSnackbar(response.error.message, {
        variant: ESnackbarTypes.ERROR,
      });
      setIsLoading(false);
    }
  };

  const {
    handleInputChange,
    formValues,
    errors,
    setError,
    handleSubmit,
    handleInputBlur,
    handleSelectInputBlur,
    setFormValues,
  } = useForm(defaultValues, handleOnSubmit, signUpValidate);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    handleInputChange(event);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className="register-form">
        <PersonalInfoSection
          errors={errors}
          formValues={formValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
        />

        <GeneralInfoSection
          errors={errors}
          setError={setError}
          formValues={formValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          handleSelectInputBlur={handleSelectInputBlur}
          managers={managers}
          setFormValues={setFormValues}
        />

        <ContactInfoSection
          errors={errors}
          formValues={formValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
        />

        <div className="form-section">
          <h3 className="form-section__title">Travel info</h3>
          <div className="form">
            <div className="row-50">
              <FormField
                error={errors.citizenship}
                label="Citizenship"
                name="citizenship"
                id="citizenship"
                value={formValues.citizenship}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>

            <CheckboxField
              label="Remote Work"
              name="isRemoteWork"
              checked={isChecked}
              error=""
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <VisaSection
          formValues={formValues}
          setVisaList={setVisaList}
          visaList={visaList}
          handleInputChange={handleInputChange}
          setFormValues={setFormValues}
        />

        <div className="form-section">
          <h3 className="form-section__title">Sign in info</h3>
          <div className="form">
            <div className="row">
              <FormField
                error={errors.email}
                label="Email"
                name="email"
                id="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <FormField
                error={errors.password}
                label="Password"
                name="password"
                id="password"
                value={formValues.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section__title">Native info</h3>
          <div className="form">
            <div className="row">
              <FormField
                error={errors.first_native_name}
                label="First Native Name"
                name="first_native_name"
                id="first_native_name"
                value={formValues.first_native_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <FormField
                error={errors.last_native_name}
                label="Last Native Name"
                name="last_native_name"
                id="last_native_name"
                value={formValues.last_native_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="row">
              <FormField
                error={errors.middle_native_name}
                label="Middle Native Name"
                name="middle_native_name"
                id="middle_native_name"
                value={formValues.middle_native_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>

        <ButtonWithSpinner
          type="submit"
          isLoading={isLoading}
          onClick={(e) => handleSubmit(e)}
          className="blue-button"
        >
          Send
        </ButtonWithSpinner>
      </form>

      <div className="link-wrapper">
        <p>
          Return to the <NavLink to="/signin">Sign In</NavLink>
        </p>
      </div>
    </>
  );
};

export { SignUpForm };
