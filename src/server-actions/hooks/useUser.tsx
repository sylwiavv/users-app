import { useCallback } from "react";
import { IUser } from "../../app/types/users";
import { API_URL } from "../enums/enums";

export interface INewCreatedUser extends IUser {
  password: string;
  email: string;
}

// Users
export const useUser = () => {
  const createUser = useCallback(async (data: INewCreatedUser) => {
    try {
      return fetch(`${API_URL.USER}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response);
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

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

  const updateUser = useCallback(
    async ({ id, data }: { data: Partial<IUser>; id: string }) => {
      try {
        return fetch(`${API_URL.USER}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => response);
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    []
  );

  const getUserInfo = useCallback(async (id: string): Promise<IUser | null> => {
    try {
      return fetch(`${API_URL.USER}/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);
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
      return responseData;
    } catch (error) {
      return [];
    }
  }, []);

  return { updateUser, getUserInfo, getUsers, createUser, generateSignUser };
};
