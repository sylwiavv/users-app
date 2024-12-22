export const signInValidate = (
    value: string,
    name: string,
    errors: Record<string, string>
  ) => {
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        if (value.length === 0)
          newErrors = {
            ...newErrors,
            email: "Email is required",
          };
        else {
          const { email, ...withoutEmail } = newErrors;
          newErrors = withoutEmail;
        }
        break;
      case "password":
        if (value.length === 0)
          newErrors = {
            ...errors,
            password: "Password is required",
          };
        else {
          const { password, ...withoutPassword } = newErrors;
          newErrors = withoutPassword;
        }
        break;
      default:
        break;
    }
    return newErrors;
  };