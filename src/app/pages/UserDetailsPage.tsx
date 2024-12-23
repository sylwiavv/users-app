import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../server-actions/hooks/useUser";
import { IUser } from "../types/users";
import GoBackButton from "../components/atoms/GoBackButton/GoBackButton";
import UserDetailsContacts from "../components/UserDetails/UserDetailsContacts";
import UserDetailsTravel from "../components/UserDetails/UserDetailsTravel";
import UserDetailsGeneral from "../components/UserDetails/UserDetailsGeneral";
import UserDetailsButtonActions from "../components/UserDetails/actions/UserDetailsButtonActions";
import { UsersDetailsPersonal } from "../components/UserDetails/UserDetailsPersonal";
import { GridLayout } from "../layouts/GridLayout";
import { useUserRole } from "../hooks/useUserRole";
import {useUserDetails} from "../context/UserDetailsContext";
import { useAuth } from "../context/AuthContext";

import { UserDetailsProvider } from "../context/UserDetailsContext";
import { Loader } from "../components/atoms/Loader/Loader";

const UserDetailsPage = () => {
  const { id } = useParams<Pick<IUser, "id">>();
  const { getUserInfo } = useUser();
  const { userDetails, setUserDetails } = useUserDetails();
  const { userCanEdit } = useUserRole({ userFromPageDetails: userDetails });
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        const user = await getUserInfo(id);
        setUserDetails(user);
      } catch (err) {
        // TODO: snackbar
      }
    };
    fetchUserDetails();
  }, [id]);

  if (!userDetails || isLoading) return <Loader />

  return (
    <GridLayout>
      <section className="user-details__actions">
        <GoBackButton />
        <UsersDetailsPersonal user={userDetails} />
        {userDetails && (
          <UserDetailsButtonActions
            userCanEdit={userCanEdit}
          />
        )}
      </section>

      <section id="user-details-container" className="user-details__data">
        <UserDetailsGeneral user={userDetails} />
        <UserDetailsContacts user={userDetails} />
        <UserDetailsTravel user={userDetails} />
      </section>
    </GridLayout>
  );
};

export const WrappedUserDetailsPage = () => (
  <UserDetailsProvider>
    <UserDetailsPage />
  </UserDetailsProvider>
);

export default WrappedUserDetailsPage;
