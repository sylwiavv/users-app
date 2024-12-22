import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../types/users";
import { useUser } from "../../server-actions/hooks/useUser";
import { ISigInUser } from "../types/users"

export interface ICurrentUser extends IUser, ISigInUser {
  currentUser: IUser & ISigInUser
}

interface AuthContextProps {
  currentUser: Partial<ICurrentUser>;
  isAuthenticatedUser: ISigInUser | {isAuthenticated: boolean};
  login: (user: Partial<ICurrentUser>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const currentUserFromSession = JSON.parse(sessionStorage.getItem("currentUser") || "null");

  const { getUserInfo } = useUser();
  const [currentUser, setCurrentUser] = useState<Partial<ICurrentUser>>({});
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState<ISigInUser | {isAuthenticated: boolean}>(currentUserFromSession);

  const fetchUsers = async () => {
    try {
      if (currentUserFromSession?.id) {
        const currentUserData = await getUserInfo(currentUserFromSession.id);

        if (currentUserData) {
          const {user_avatar, manager, role, first_name, last_name} = currentUserData
          setCurrentUser({ user_avatar, manager, role, first_name, last_name, ...currentUserFromSession });
        }
      }
    } catch (error) {
      // TODO: Snackbar with error
      console.error("Error fetching user data:", error);
      setIsAuthenticatedUser({isAuthenticated: false})
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser?.id]);

  const login = (user: Partial<ICurrentUser>) => {
    setCurrentUser(user);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser({id: "unlogg"});
    setIsAuthenticatedUser({isAuthenticated: false})
    sessionStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
