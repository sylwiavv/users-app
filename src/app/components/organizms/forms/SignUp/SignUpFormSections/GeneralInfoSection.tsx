import { Dispatch, FocusEventHandler, SetStateAction } from "react";
import { IManager } from "../../../../../types/users";
import FormField from "../../../../atoms/FormField/FormField";
import NumberField from "../../../../atoms/NumberField/NumberField";
import SelectField from "../../../../atoms/SelectField/SelectField";
import { ISignUpSectionProps } from "./PersonalInfoSection";
import DatePickerComponent from "../../../../atoms/DatePickerComponent";
import { TFormValues } from "../../../../../hooks/useForm";

interface IGeneralInfoSection extends ISignUpSectionProps {
  handleSelectInputBlur: FocusEventHandler<HTMLSelectElement>;
  managers: IManager[];
  setFormValues: Dispatch<SetStateAction<TFormValues>>;
  setError: Dispatch<SetStateAction<Record<string, string>>>
}

export const GeneralInfoSection = ({
  errors,
  setError,
  formValues,
  handleInputBlur,
  handleInputChange,
  handleSelectInputBlur,
  managers,
  setFormValues,
}: IGeneralInfoSection) => {

  const today = new Date();
  const minEighteen = new Date(today);
  minEighteen.setFullYear(today.getFullYear() - 18);

  const handleSetDate = ({ dateOfBirth }: { dateOfBirth: Date }) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      date_birth: dateOfBirth,
    }));

    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.date_birth;
      return newErrors;
    });
  };

  const handleDateOnBlur = () => {
    if (!formValues.date_birth) {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors, date_birth: "Date birth is required" };
        return newErrors;
      });
    }
  }

  return (
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
            value={formValues.building}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <FormField
            id="room"
            name="room"
            value={formValues.room}
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
          <div className="input-label__wrapper">
            <label className="input-label__wrapper__label">Date of birth</label>
            <DatePickerComponent
              startDate={formValues.date_birth as Date}
              setStartDate={(dateOfBirth) =>
                handleSetDate({
                  dateOfBirth,
                })
              }
              handleOnBlur={handleDateOnBlur}
              maxDate={minEighteen}
              placeholderText="Select your date of birth"
              />
            {errors.date_birth && (
              <p className="input-label__wrapper__error">{errors.date_birth}</p>
            )}
          </div>

          <SelectField
            id="manager_id"
            name="manager_id"
            value={formValues.manager_id as string}
            error={errors.manager_id}
            onChange={handleInputChange}
            onBlur={handleSelectInputBlur}
            label="Manager"
            placeholder="Select a manager"
            children={managers}
          />
        </div>
      </div>
    </div>
  );
};
