import { IUser } from "../types/users";
import { ICurrentUser, useAuth } from "../context/AuthContext";

export const useUserRole = ({ userFromPageDetails }: { userFromPageDetails: ICurrentUser | IUser | Partial<ICurrentUser> | null }) => {
  const { currentUser } = useAuth();

  const idFromPage = userFromPageDetails?.id;
  const isAdmin = currentUser?.role === "admin" || false;
  const isEmployee = currentUser?.role === "employee" || false;
  const isCurrentLoggedInUser = currentUser?.id === idFromPage?.trim().toLowerCase();
  const isSameManagerId = currentUser?.id === userFromPageDetails?.manager?.id;
  const isManagerRole = currentUser?.role === "hr";
  const isUserManager = isManagerRole && isSameManagerId;

  let userCanEdit = false;

  switch (true) {
    case isCurrentLoggedInUser && isAdmin:
      userCanEdit = false;
      break;

    case isAdmin:
      userCanEdit = true;
      break;

    case isEmployee:
      userCanEdit = false;
      break;

    case isUserManager:
      userCanEdit = true;
      break;

    default:
      userCanEdit = false;
      break;
  }

  return { isAdmin, isUserManager, userCanEdit };
};
