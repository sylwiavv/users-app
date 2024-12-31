import { useCallback } from "react";
import { IUser } from "../../app/types/users";
import { API_URL } from "../enums/enums";

export interface INewCreatedUser extends IUser {
  password: string;
  email: string;
}

// Users
export const useUser = () => {
  const generateSignUser = useCallback(
    async (data: Pick<INewCreatedUser, "id" | "email" | "password">) => {
      try {
        return fetch(`${API_URL.SIGNED_IN_USERS}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => response);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  //---------------------
  const getUsers = useCallback(async (): Promise<IUser[] | []> => {
    try {
      const response = await fetch(`${API_URL.USER}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      return [];
    }
  }, []);

  //---------------------
  const createUser = useCallback(async (data: INewCreatedUser) => {
    try {
      const response = await fetch(`${API_URL.USER}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return null;
    }
  }, []);

  //---------------------
  const getUserInfo = useCallback(async (id: string): Promise<IUser | null> => {
    try {
      const response = await fetch(`${API_URL.USER}/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const responseData = await response.json();
      return responseData.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  //---------------------
  const updateUser = useCallback(
    async ({ id, data }: { data: Partial<IUser>; id: string }) => {
      try {
        const response = await fetch(`${API_URL.USER}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const responseData = await response.json();
        return responseData;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    []
  );

  return { updateUser, getUserInfo, getUsers, createUser, generateSignUser };
};
