import React, { ChangeEvent, ChangeEventHandler, FocusEventHandler } from "react";

interface IFormFieldProps<T> {
  name: string;
  value: string | number | boolean;
  error: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  children: T[];
}

const SelectField = React.forwardRef<HTMLSelectElement, IFormFieldProps<any>>(
  (
    {
      className,
      onChange,
      label,
      name,
      id,
      value,
      error,
      onBlur,
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-label__wrapper">
        <label className="input-label__wrapper__label" htmlFor={id}>
          {label}
        </label>
        <select
          className={className}
          name={name}
          id={id}
          value={value as string}
          onChange={onChange}
          onBlur={onBlur} 
          ref={ref}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children.map((item) => (
            <option key={item.id} value={item.id}>
              {item.first_name} {item.last_name}
              </option>
          ))}
        </select>
        {error && <p className="input-label__wrapper__error">{error}</p>}
      </div>
    );
  }
);

export default SelectField;
