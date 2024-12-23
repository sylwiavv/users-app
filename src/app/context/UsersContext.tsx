import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IUser } from "../types/users";

interface UsersContextProps {
  users: IUser[];
  filteredUsers: IUser[];
  refreshUsers: () => Promise<void>;
  setFilteredUsers: (users: IUser[]) => void;
  usersAreLoading: boolean
}

interface UsersProviderProps {
  children: ReactNode;
  getUsers: () => Promise<IUser[] | []>;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider: React.FC<UsersProviderProps> = ({ children, getUsers }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [usersAreLoading, setUsersAreLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setUsersAreLoading(true)
      const usersData = await getUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
      setUsersAreLoading(false)

    } catch (error) {
      setUsersAreLoading(false)
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
    <UsersContext.Provider value={{ users, filteredUsers, refreshUsers, setFilteredUsers, usersAreLoading }}>
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
