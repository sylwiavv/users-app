import { ReactNode } from "react";
import FormField, { IFormFieldProps } from "../FormField/FormField";

interface IIconFormFieldProps extends IFormFieldProps {
  //   icon: React.SVGProps<SVGSVGElement>;
  icon: ReactNode;
}

export const IconFormField = ({
  name,
  error,
  label,
  value,
  onChange,
  placeholder,
  icon,
}: IIconFormFieldProps) => {
  return (
    <div className="input-with-icon">
      <div className="input-with-icon__icon">{icon}</div>
      <FormField
        className={"input-with-icon__input"}
        name={name}
        error={error}
        label={label}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
