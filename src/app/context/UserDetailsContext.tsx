import React, { createContext, useContext, useState } from "react";
import { IUser } from "../types/users";

interface UserDetailsContextType {
  userDetails: IUser | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserDetailsContext = createContext<UserDetailsContextType | undefined>(undefined);

export const UserDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
};
