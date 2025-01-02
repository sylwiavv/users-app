import { IVisa } from "../../../../types/users";

export const SignUpValidate = (
  value: string | number | boolean | IVisa[],
  name: string,
  errors: Record<string, string>
): Record<string, string> => {  
  const names: Record<string, string> = {
    first_name: "First name",
    last_name: "Last name",
    desk_number: "Desk number",
    date_birth_day: "Birth day",
    date_birth_month: "Month day",
    date_birth_year: "Year day",
    cnumber: "C-number",
    first_native_name: "First native name",
    last_native_name: "Last native name",
    middle_native_name: "Middle native name",
    manager_id: "Manager",
    user_avatar: "User avatar",
    date_birth: "Date birth"
  };

  const fieldsToIgnore = [
    "visa", "first_native_name", "last_native_name", "middle_native_name"
  ];

  if (fieldsToIgnore.includes(name)) {
    return errors;
  }

  const readableName = names[name] || name; 
  const newErrors = { ...errors };

  if (typeof value === "object" && value.length === 0) {
    newErrors[name] = `${readableName} is required`;
  }

  if (value === 0) {
    newErrors[name] = `${readableName} is required`;
  } else {
    delete newErrors[name];
  }

  if (typeof value === 'string' && !value.trim()) {
    newErrors[name] = `${readableName} is required`;
  } else {
    delete newErrors[name];
  }

  return newErrors;
};
