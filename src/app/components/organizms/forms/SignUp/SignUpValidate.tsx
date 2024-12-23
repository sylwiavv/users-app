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
    manager_id: "Manger",
    user_avatar: "User avatar"
  };

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

// export const SignUpValidate = (
//     value: string,
//     name: string,
//     errors: Record<string, string>
//   ): Record<string, string> => {
//     let newErrors = { ...errors };
  
//     if (
//       [
//         "first_name",
//         "last_name",
//         "department",
//         "building",
//         "room",
//         "desk_number",
//         "phone",
//         "skype",
//         "cnumber",
//         "citizenship",
//         "manager_id",
//         "email",
//         "password",
//         "first_native_name",
//         "last_native_name",
//         "middle_native_name",
//         "date_birth_day",
//         "date_birth_month",
//         "date_birth_year",
//       ].includes(name) &&
//       value.trim().length === 0
//     ) {
//       newErrors = {
//         ...newErrors,
//         [name]: `Field "${name}" is required`,
//       };
//     } else {
//       const { [name]: _, ...withoutFieldError } = newErrors;
//       newErrors = withoutFieldError;
//     }
  
//     if (name === "email" && value.trim() && !/\S+@\S+\.\S+/.test(value)) {
//       newErrors = {
//         ...newErrors,
//         email: "Podaj poprawny adres email",
//       };
//     }
  
//     if (name === "password" && value.trim() && value.length < 6) {
//       newErrors = {
//         ...newErrors,
//         password: "Hasło musi mieć co najmniej 6 znaków",
//       };
//     }
  
//     return newErrors;
//   };
  
// export const SignUpValidate = (
//   value: string,
//   name: string,
//   errors: Record<string, string>
// ) => {
//   let newErrors = { ...errors };
//   switch (name) {
//     case "first_name":
//       if (value.length === 0)
//         newErrors = {
//           ...newErrors,
//           first_name: "Email is required",
//         };
//       else {
//         const { first_name, ...withoutEmail } = newErrors;
//         newErrors = withoutEmail;
//       }
//       break;
//     case "password":
//       if (value.length === 0)
//         newErrors = {
//           ...errors,
//           password: "Password is required",
//         };
//       else {
//         const { password, ...withoutPassword } = newErrors;
//         newErrors = withoutPassword;
//       }
//       break;
//     default:
//       break;
//   }
//   return newErrors;
// };