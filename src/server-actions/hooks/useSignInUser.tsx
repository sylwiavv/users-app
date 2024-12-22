import { API_URL } from "../enums/enums";
import { useCallback } from "react";

export const useSignInUser = () => {
  const checkSignInUser = useCallback(async () => {
    try {
      return fetch(`${API_URL.SIGNED_IN_USERS}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getGeneratedSignInToken = useCallback(async () => {
    try {
        return fetch(`${API_URL.SIGN_IN_USERS_TOKEN}}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => response.json());
      }
    catch (e) {
        console.log(e)
    }
  }, []);

  const generateSignInToken = useCallback(async (data: {  email: string;
    token: string;}) => {
    try {
        return fetch(`${API_URL.SIGN_IN_USERS_TOKEN}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => console.log(response, data, "data"));
      } catch (e) {
        console.log(e);
      }
  }, [])


  // -------------------------

  const createSignInUser = useCallback(async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('https://users-app-pied.vercel.app/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      const responseData = await response.json();
        return responseData;
  
    } catch (error) {
      return error
    }
  }, []);
  

  return {
    createSignInUser,
    checkSignInUser,
    getGeneratedSignInToken,
    generateSignInToken
  };
};
