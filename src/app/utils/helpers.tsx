import { IDateOfBirth } from "../types/users";

export const formatDate = (date: Date): IDateOfBirth => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    return { year, month, day };
  };
