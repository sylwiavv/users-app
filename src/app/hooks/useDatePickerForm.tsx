import { useState } from "react";

export type TFormValues = Record<string, TFormInputValue>;

export type TFormInputValue = string | Date | boolean;

export type TValidateFn = (
  value: TFormInputValue,
  fieldName: string,
  errors: Record<string, string>
) => Record<string, string>;

export type TSubmitFn = () => void;

export const useDatePickerForm = (
  initialState: TFormValues,
  submit: TSubmitFn,
  validate?: TValidateFn
) => {
  const [datePickerFormValues, setDatePickerFormValues] = useState<TFormValues>(initialState);
  const [errors, setError] = useState<Record<string, string>>({});

  // Obsługuje wysyłanie formularza
  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();

    let newErrors = { ...errors };
    for (const fieldName in datePickerFormValues) {
      if (validate) {
        newErrors = validate(datePickerFormValues[fieldName], fieldName, newErrors);
      }
    }

    if (Object.keys(newErrors).length === 0) submit();
    else setError(newErrors);
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validate) {
      setError(validate(value, name, errors));
    }
  };

  const handleDateChange = (name: string, date: Date) => {
    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    setDatePickerFormValues({
      ...datePickerFormValues,
      [name]: date,
    });
  };

  return {
    datePickerFormValues,
    errors,
    handleSubmit,
    handleInputBlur,
    handleDateChange,
  };
};
