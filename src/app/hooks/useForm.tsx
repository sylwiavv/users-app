import { useState,  } from "react";

export type TFormValues = Record<string, TFormInputValue>;

export type TFormInputValue = string;

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
        if (validate) {
          newErrors = validate(formValues[fieldName], fieldName, newErrors);
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

  const handleSelectInputBlur: React.FocusEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    if (validate) {
      setError(validate(value, name, errors));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      console.log(checked)

      // setFormValues(() => ({
      //   ...formValues,
      //   [name]: checked,
      // }));
    }
   else {
    setFormValues(() => ({
      ...formValues,
      [name]: value,
    }));
   }

    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    // setFormValues({
    // ...formValues,
    // [name]: value,
    // });

  };

  return {
    formValues,
    errors,
    handleInputBlur,
    handleInputChange,
    handleSelectInputBlur,
    handleSubmit,
  };
};
