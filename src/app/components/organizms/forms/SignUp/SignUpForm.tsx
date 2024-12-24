import { ChangeEvent, useEffect, useState } from "react";
import { useManager } from "../../../../../server-actions/hooks/useManager";
import { IManager, IVisa } from "../../../../types/users";
import { useForm } from "../../../../hooks/useForm";
import { FormButtons } from "../../../atoms/FormButtons";
import FormField from "../../../atoms/FormField/FormField";
import {
  INewCreatedUser,
  useUser,
} from "../../../../../server-actions/hooks/useUser";
import { NavLink } from "react-router-dom";
import CheckboxField from "../../../atoms/CheckboxField/CheckboxField";
import { SignUpValidate } from "./SignUpValidate";
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
import DatePickerComponent from "../../../atoms/DatePickerComponent";


const SignUpForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getManagers } = useManager();
  const { createUser } = useUser();

  const [managers, setManagers] = useState<IManager[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visaList, setVisaList] = useState<IVisa[]>([]);

  const [birthtDate, setBirthtDate] = useState(new Date());

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
    isRemoteWork: "false",
    email: "",
    password: "",
    user_avatar: "",
    first_native_name: "",
    last_native_name: "",
    middle_native_name: "",
    date_birth: "",
    visa: visaList,
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const formattedDate = formatDate(birthtDate);

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
    handleSubmit,
    handleInputBlur,
    handleSelectInputBlur,
  } = useForm(defaultValues, handleOnSubmit, SignUpValidate);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    handleInputChange(event);
  };

  const handleVisaChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedVisaList = [...visaList];
    updatedVisaList[index] = { ...updatedVisaList[index], [name]: value };
    setVisaList(updatedVisaList);
  };

  const addVisa = () => {
    setVisaList([
      ...visaList,
      {
        issuing_country: "",
        type: "",
        start_date: new Date(),
        end_date: new Date(),
      },
    ]);
  };

  const removeVisa = (index: number) => {
    const updatedVisaList = visaList.filter((_, i) => i !== index);
    setVisaList(updatedVisaList);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <PersonalInfoSection
          errors={errors}
          formValues={formValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
        />

        <GeneralInfoSection
          errors={errors}
          formValues={formValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          birthtDate={birthtDate}
          setBirthDay={setBirthtDate}
          handleSelectInputBlur={handleSelectInputBlur}
          managers={managers}
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

            <div className="form-section">
              <h3 className="form-section__title">Visa Information</h3>
              <div className="form">
                {visaList.map((visa, index) => (
                  <div key={index} className="visa-entry">
                    <div className="row">
                      <FormField
                        error={""}
                        label="Issuing Country"
                        name="issuing_country"
                        value={visa.issuing_country}
                        onChange={(e) => handleVisaChange(index, e)}
                      />
                      <FormField
                        error={""}
                        label="Visa Type"
                        name="type"
                        value={visa.type}
                        onChange={(e) => handleVisaChange(index, e)}
                      />
                    </div>
                    <div className="row">
                      <div>
                        <label>Start Date</label>
                        <DatePickerComponent
                          startDate={visa.start_date as Date}
                          setStartDate={(date) => {
                            const updatedVisaList = [...visaList];
                            updatedVisaList[index] = {
                              ...updatedVisaList[index],
                              start_date: date as Date,
                            };
                            setVisaList(updatedVisaList);
                          }}
                        />
                      </div>
                      <div>
                        <label>End Date</label>
                        <DatePickerComponent
                          startDate={visa.end_date as Date}
                          setStartDate={(date) => {
                            const updatedVisaList = [...visaList];
                            updatedVisaList[index] = {
                              ...updatedVisaList[index],
                              end_date: date as Date,
                            };
                            setVisaList(updatedVisaList);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove-visa-button"
                      onClick={() => removeVisa(index)}
                    >
                      Remove Visa
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addVisa}>
                  Add Visa
                </button>
              </div>
            </div>
          </div>
        </div>

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

        <FormButtons
          isLoading={isLoading}
          type="submit"
          onClose={() => console.log("Cancel registration")}
          onSend={handleOnSubmit}
        />
      </form>
      <NavLink to="/signin">Return to the Sign In</NavLink>
    </>
  );
};

export { SignUpForm };
