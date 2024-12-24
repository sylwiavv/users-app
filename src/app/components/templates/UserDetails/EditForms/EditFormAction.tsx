import { useCallback } from "react";
import { IUser } from "../../../../types/users";

type T = Record<string, any>;

interface EditFormActionParams {
  id: string;
  updateDataMethod: ({ id, data }: { data: Partial<IUser>; id: string; }) => Promise<Response | null>;
  formValues: { [key: string]: T[keyof T] };
}

export const useEditFormAction = ({
  id,
  updateDataMethod,
  formValues,
}: EditFormActionParams) => {
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: Partial<T> = {};

      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          data[key as keyof T] = value;
        }
      });

      try {
        await updateDataMethod({id, data});
      } catch (error) {
        //TODO: error snackbar
      }
    },
    [id, updateDataMethod, formValues]
  );

  return {
    handleSubmit,
  };
};
