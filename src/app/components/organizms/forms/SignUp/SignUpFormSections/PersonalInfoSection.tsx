import { TFormValues } from "../../../../../hooks/useForm";
import FormField from "../../../../atoms/FormField/FormField";

export interface ISignUpSectionProps {
  errors: Record<string, string>;
  formValues: TFormValues;
  handleInputBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const PersonalInfoSection = ({
  errors,
  formValues,
  handleInputBlur,
  handleInputChange,
}: ISignUpSectionProps) => {
  return (
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
        
        <div className="row">
          <FormField
            error={errors.user_avatar}
            label="User avatar"
            name="user_avatar"
            id="user_avatar"
            value={formValues.user_avatar}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            additionalInfo={"You cane use this link https://avatar.iran.liara.run/public"}
          />
        </div>
      </div>
    </div>
  );
};
