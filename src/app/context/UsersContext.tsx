import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IUser } from "../types/users";

interface UsersContextProps {
  users: IUser[];
  filteredUsers: IUser[];
  refreshUsers: () => Promise<void>;
  setFilteredUsers: (users: IUser[]) => void;
}

interface UsersProviderProps {
  children: ReactNode;
  getUsers: () => Promise<IUser[] | []>;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider: React.FC<UsersProviderProps> = ({ children, getUsers }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
    // TODO: snackbar with error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [getUsers]);

  const refreshUsers = async () => {
    await fetchUsers();
  };

  return (
    <UsersContext.Provider value={{ users, filteredUsers, refreshUsers, setFilteredUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
