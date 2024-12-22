export const searchUserValidate = (
  value: string,
  name: string,
  errors: Record<string, string>
) => {
  let newErrors = { ...errors };
  switch (name) {
    case "searchQuery":
      if (value.length === 0)
        newErrors = {
          ...newErrors,
          email: "searchQuery is required",
        };
      else {
        const { searchQuery, ...withoutsearchQuery} = newErrors;
        newErrors = withoutsearchQuery;
      }
      break;
  }
  return newErrors;
};