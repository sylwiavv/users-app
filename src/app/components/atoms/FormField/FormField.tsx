import React from "react";
import { TFormInputValue } from "../../../hooks/useForm";

export interface IFormFieldProps {
  name: string;
  value: TFormInputValue;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  additionalInfo?: string
}

const FormField = React.forwardRef<HTMLInputElement, IFormFieldProps>(
  (
    {
      className,
      onChange,
      label,
      name,
      id,
      value,
      type = "text",
      error,
      onBlur,
      onKeyDown,
      placeholder,
      additionalInfo,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-label__wrapper">
        <label className="input-label__wrapper__label" htmlFor={id}>
          {label}
        </label>
        <input
          className={className}
          placeholder={placeholder}
          name={name}
          id={id}
          type={type}
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          onKeyDown={onKeyDown}
          {...props}
        />
        {additionalInfo && <p className="additional-info">{additionalInfo}</p>}
        {error && <p className="input-label__wrapper__error">{error}</p>}
      </div>
    );
  }
);

export default FormField;
