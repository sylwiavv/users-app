import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../server-actions/hooks/useUser";
import { IManager, IUser } from "../types/users";
import GoBackButton from "../components/atoms/GoBackButton/GoBackButton";

import { GridLayout } from "../layouts/GridLayout";
import { useUserRole } from "../hooks/useUserRole";
import {useUserDetails} from "../context/UserDetailsContext";
import { useAuth } from "../context/AuthContext";

import { UserDetailsProvider } from "../context/UserDetailsContext";
import { Loader } from "../components/atoms/Loader/Loader";
import UserDetailsButtonActions from "../components/templates/UserDetails/actions/UserDetailsButtonActions";
import UserDetailsContacts from "../components/templates/UserDetails/UserDetailsContacts";
import UserDetailsGeneral from "../components/templates/UserDetails/UserDetailsGeneral";
import { UsersDetailsPersonal } from "../components/templates/UserDetails/UserDetailsPersonal";
import UserDetailsTravel from "../components/templates/UserDetails/UserDetailsTravel";
import { useManager } from "../../server-actions/hooks/useManager";

const UserDetailsPage = () => {
  const { id } = useParams<Pick<IUser, "id">>();
  const { getUserInfo } = useUser();
  const { userDetails, setUserDetails } = useUserDetails();
  const { userCanEdit } = useUserRole({ userFromPageDetails: userDetails });
  const { isLoading } = useAuth();
  const { getManagerInfo } = useManager();

  const [manager, setManager] = useState<IManager>()

  useEffect(() => {
    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        const user = await getUserInfo(id);
        setUserDetails(user);
        const manager = await getManagerInfo(user?.manager_id as Pick<IManager, "id">);
        setManager(manager)
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
        <GoBackButton link="/address-book" />
        <UsersDetailsPersonal user={userDetails} />
        {userDetails && (
          <UserDetailsButtonActions
            userCanEdit={userCanEdit}
          />
        )}
      </section>

      <section id="user-details-container" className="user-details__data">
        <UserDetailsGeneral user={userDetails} manager={manager as IManager} />
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
