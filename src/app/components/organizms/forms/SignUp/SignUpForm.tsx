import { ChangeEvent, useEffect, useState } from "react";
import { useManager } from "../../../../../server-actions/hooks/useManager";
import { EUserRole, IManager } from "../../../../types/users";
import { useForm } from "../../../../hooks/useForm";
import { useCreateIUniqued } from "../../../../hooks/useCreateIUniqued";
import { FormButtons } from "../../../atoms/FormButtons";
import FormField from "../../../atoms/FormField/FormField";
import {
  INewCreatedUser,
  useUser,
} from "../../../../../server-actions/hooks/useUser";
import { useBcrypt } from "../../../../../server-actions/hooks/useBcrypt";
import { NavLink } from "react-router-dom";
import CheckboxField from "../../../atoms/CheckboxField/CheckboxField";
import { SignUpValidate } from "./SignUpValidate";
import {
  useSnackbar,
  ESnackbarTypes,
} from "../../../../context/SnackbarContex";

import DatePickerComponent from "../test";
import { formatDate } from "../../../../utils/helpers";
import NumberField from "../../../atoms/NumberField/NumberField";
import SelectField from "../../../atoms/SelectField/SelectField";

const SignUpForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { getManagers } = useManager();
  const { createUser, generateSignUser } = useUser();
  const { generateId } = useCreateIUniqued();
  const { generateBcryptHash } = useBcrypt();

  const [managers, setManagers] = useState<IManager[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getManagers();
      setManagers(response || []);
    })();
  }, []);

  //   const defaultValues: INewCreatedUser = {
  const defaultValues = {
    id: "",
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
    // manager:{ id: "", first_name: "", last_name: "" },
    manager_id: "",

    isRemoteWork: 'false',
    email: "",
    password: "",
    role: EUserRole.EMPLOYEE,
    user_avatar: "/assets/avatars/default-avatar.png",
    first_native_name: "",
    last_native_name: "",
    middle_native_name: "",
    date_birth: "",
    visa: "",
  };

  const [startDate, setStartDate] = useState(new Date());

  const handleOnSubmit = async () => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const id = generateId();
    const formattedDate = formatDate(startDate);

    try {
      if (!formValues.password) {
        return
      }
      
      const hashedPassword = await generateBcryptHash(
        formValues.password as string,
        10
      );

      const newUser = {
        ...formValues,
        date_birth: formattedDate,
        role: EUserRole.EMPLOYEE,
        password: hashedPassword,
        id,
      } as INewCreatedUser;

      const response = await createUser(newUser);

      if (response?.status === 201) {
        if (hashedPassword) {
          const data = {
            id,
            email: formValues.email as string,
            password: hashedPassword,
          };

          const generateUser = await generateSignUser(data);

          if (generateUser?.status === 201) {
            enqueueSnackbar("User successfully created!", {
              variant: ESnackbarTypes.SUCCESS,
            });
          }
        } else {
          enqueueSnackbar("Password is wrong, user was not created", {
            variant: ESnackbarTypes.ERROR,
          });
        }
      }
    } catch (err) {
      enqueueSnackbar("Password is wrong", {
        variant: ESnackbarTypes.ERROR,
      });
    }
  };

  const {
    handleInputChange,
    formValues,
    errors,
    handleSubmit,
    handleInputBlur,
    handleSelectInputBlur
  } = useForm(defaultValues, handleOnSubmit, SignUpValidate);

  const [isChecked, setIsChecked] = useState(false)

  // const handdleCheckInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
  //   setIsChecked(!isChecked)
  //   handleInputChange(e)
  // }

  console.log(formValues)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
        handleInputChange(event)

  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-section">
          <h3 className="form-section__title">Personal info</h3>
          <div className="form">
            <div className="row">
              <FormField
                error={errors.first_name}
                label="First Name"
                name="first_name"
                id="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <FormField
                error={errors.last_name}
                label="Last Name"
                name="last_name"
                id="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section__title">General info</h3>
          <div className="form-section__inputs-wrapper">
            <div className="row">
              <FormField
                error={errors.department}
                label="Department"
                name="department"
                id="department"
                value={formValues.department}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <FormField
                error={errors.building}
                label="Building"
                name="building"
                id="building"
                type="number"
                value={formValues.building}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <NumberField
                id="room"
                name="room"
                value={Number(formValues.room)}
                label="Room"
                error={errors.room}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <NumberField
                name="desk_number"
                id="desk_number"
                value={Number(formValues.desk_number)}
                label="Desk Number"
                error={errors.desk_number}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="row">
              <DatePickerComponent
                startDate={startDate}
                setStartDate={setStartDate}
        
              />
            </div>
            <SelectField
              id="manager_id"
              name="manager_id"
              value={formValues.manager_id}
              error={errors.manager_id}
              onChange={handleInputChange}
              onBlur={handleSelectInputBlur}
              label="Manager"
              placeholder="Select a Manager"
              children={managers}
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section__title">Contact info</h3>
          <div className="form">
            <div className="row">
              <FormField
                error={errors.phone}
                label="Phone"
                name="phone"
                id="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <FormField
                error={errors.skype}
                label="Skype"
                name="skype"
                id="shype"
                value={formValues.skype}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <FormField
                error={errors.cnumber}
                label="C-Number"
                name="cnumber"
                id="cnumber"
                value={formValues.cnumber}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>

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
              // onBlur={handleInputBlur}
            />
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
          isLoading={false}
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
