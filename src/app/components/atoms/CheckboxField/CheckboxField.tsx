import React from "react";

export interface ICheckboxFieldProps {
  name: string;
  checked: boolean;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id?: string;
}

const CheckboxField: React.FC<ICheckboxFieldProps> = ({
  name,
  checked,
  error,
  onChange,
  label,
  id,
}) => {

  return (
    <div className="checkbox-field__wrapper">
      <label className="checkbox-field__label input-label__wrapper__label" htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked} 
          onChange={onChange}
        />
        {label}
      </label>
      {error && <p className="input-label__wrapper__error">{error}</p>}
    </div>
  );
};

export default CheckboxField;
