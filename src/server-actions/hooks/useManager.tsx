import { useCallback } from "react";
import { IManager } from "../../app/types/users";
import { API_URL } from "../enums/enums";

// Managers
export const useManager = () => {
  const getManagers = useCallback(async () => {
    try {
      return fetch(`${API_URL.MANAGER}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getManagerInfo = useCallback(async (id: Pick<IManager, "id">) => {
    try {
      return fetch(`${API_URL.MANAGER}/${id}}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }, []);

  return { getManagers, getManagerInfo };
};
