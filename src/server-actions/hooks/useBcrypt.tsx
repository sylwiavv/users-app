import { API_URL } from "../enums/enums";
import { useCallback } from "react";

export const useBcrypt = () => {
  const generateBcryptHash = useCallback(
    async (
      password: string,
      bcryptCost: number
    ): Promise<string | undefined> => {
      try {
        const response = await fetch(`${API_URL.BCRYPT_GENERATE_PASSWORD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `password=${password}&cost=${bcryptCost}`,
        });

        const data = await response.json();

        if (data.ok) {
          return data.hash;
        } else {
          return undefined;
        }
      } catch (e) {
        return undefined;
      }
    },
    []
  );

  const checkBcryptPasswordHash = useCallback(
    async (hash: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch(`${API_URL.BCRYPT_CHECK_PASSWORD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `hash=${hash}&password=${password}`,
        });

        const data = await response.json();

        if (data.ok) {
        //   return data.isValid;
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },[] );

  return {
    generateBcryptHash,
    checkBcryptPasswordHash,
  };
};
