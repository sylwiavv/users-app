import { useCallback } from "react";
import { IManager } from "../../app/types/users";
import { API_URL } from "../enums/enums";

// Managers
export const useManager = () => {
  const getManagers = useCallback(async () => {
    try {
      const response = fetch(`${API_URL.MANAGER}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const responseData = (await response).json();
      return responseData;
    } catch (error) {
      return [];
    }
  }, []);

  const getManagerInfo = useCallback(async (id: Pick<IManager, "id">) => {
    try {
      const response = await fetch(`${API_URL.MANAGER}/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const responseData = await response.json();
  
      return responseData.data;
    } catch (e) {
      return null;
    }
  }, []);
  

  return { getManagers, getManagerInfo };
};
