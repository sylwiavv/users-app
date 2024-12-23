import { EUserRole, IUser } from "../types/users";
import { ICurrentUser, useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export const useUserRole = ({ userFromPageDetails }: { userFromPageDetails: ICurrentUser | IUser | Partial<ICurrentUser> | null }) => {
  const idFromPage = userFromPageDetails?.id;

  const { currentUser, isLoading  } = useAuth();
  const [userCanEdit, setUserCanEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isUserManager, setIsUserManager] = useState(false)

  useEffect(() => {
  const isAdmin = currentUser?.role?.toUpperCase() === EUserRole.ADMIN.toUpperCase();
  const isEmployee = currentUser?.role?.toUpperCase() === EUserRole.EMPLOYEE.toUpperCase();
  const isCurrentLoggedInUser = currentUser?.id === idFromPage?.trim().toLowerCase();
  const isSameManagerId = currentUser?.id === userFromPageDetails?.manager?.id;
  const isManagerRole = currentUser?.role?.toUpperCase() === EUserRole.HR.toUpperCase();
  const isUserManager = isManagerRole && isSameManagerId;

  setIsUserManager(isUserManager)
  setIsAdmin(isAdmin)
  
    switch (true) {
      case isCurrentLoggedInUser && isAdmin:
        setUserCanEdit(false)
        break;
  
      case isAdmin:
        setUserCanEdit(true)
        break;
  
      case isEmployee:
        setUserCanEdit(false)
        break;
  
      case isUserManager:
        setUserCanEdit(true)
        break;
  
      default:
        setUserCanEdit(false)
        break;
    }
  }, [isLoading, idFromPage])


  return { isAdmin, isUserManager, userCanEdit };
};
