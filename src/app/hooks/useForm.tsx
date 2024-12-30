import { useState } from "react";
import { EUserRole, IVisa } from "../types/users";

export type TFormValues = Record<string, TFormInputValue>;

export type TFormInputValue = string | IVisa[] | EUserRole | number | boolean | Date;

export type TValidateFn = (
  value: string,
  fieldName: string,
  errors: Record<string, string>
) => Record<string, string>;

export type TSubmitFn = () => void;

export const useForm = (
  initialState: TFormValues,
  submit: TSubmitFn,
  validate?: TValidateFn
) => {
  const [formValues, setFormValues] = useState<TFormValues>(initialState);
  const [errors, setError] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
  
    let newErrors = { ...errors };
  
    for (const fieldName in formValues) {
      const value = formValues[fieldName];
  
      const valueAsStringOrNumberOrBoolean =
        typeof value === "boolean"
          ? value
          : typeof value === "number"
          ? value
          : Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);
  
      if (validate) {
        newErrors = validate(String(valueAsStringOrNumberOrBoolean), fieldName, newErrors);
      }
    }
  
    if (Object.keys(newErrors).length === 0) {
      submit();
    } else {
      setError(newErrors);
    }
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validate) {
      const valueAsString = Array.isArray(value) ? JSON.stringify(value) : value;
      setError(validate(valueAsString, name, errors));
    }
  };

  const handleSelectInputBlur: React.FocusEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    if (validate) {
      const valueAsString = Array.isArray(value) ? JSON.stringify(value) : value;
      setError(validate(valueAsString, name, errors));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === "number" ? Number(value) : value,
      }));
    }

    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  return {
    formValues,
    errors,
    setError,
    handleInputBlur,
    handleInputChange,
    handleSelectInputBlur,
    handleSubmit,
    setFormValues
  };
};
