import FormField from "../../../../atoms/FormField/FormField"
import { ISignUpSectionProps } from "./PersonalInfoSection"

export const ContactInfoSection = ({  errors,
    formValues,
    handleInputBlur,
    handleInputChange,}: ISignUpSectionProps) => {
    return (
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
    )
}
