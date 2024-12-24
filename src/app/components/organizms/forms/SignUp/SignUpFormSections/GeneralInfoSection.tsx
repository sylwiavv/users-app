import { Dispatch, FocusEventHandler, SetStateAction } from "react";
import { IManager } from "../../../../../types/users";
import FormField from "../../../../atoms/FormField/FormField";
import NumberField from "../../../../atoms/NumberField/NumberField";
import SelectField from "../../../../atoms/SelectField/SelectField";
import { ISignUpSectionProps } from "./PersonalInfoSection";
import DatePickerComponent from "../../../../atoms/DatePickerComponent";

interface IGeneralInfoSection extends ISignUpSectionProps {
  birthtDate: Date;
  setBirthDay: Dispatch<SetStateAction<Date>>;
  handleSelectInputBlur: FocusEventHandler<HTMLSelectElement>;
  managers: IManager[];
}

export const GeneralInfoSection = ({
  errors,
  formValues,
  handleInputBlur,
  handleInputChange,
  birthtDate,
  setBirthDay,
  handleSelectInputBlur,
  managers,
}: IGeneralInfoSection) => {
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
          <DatePickerComponent
            startDate={birthtDate}
            setStartDate={setBirthDay}
          />
        </div>
        <SelectField
          id="manager_id"
          name="manager_id"
          value={formValues.manager_id as string}
          error={errors.manager_id}
          onChange={handleInputChange}
          onBlur={handleSelectInputBlur}
          label="Manager"
          placeholder="Select a Manager"
          children={managers}
        />
      </div>
    </div>
  );
};
