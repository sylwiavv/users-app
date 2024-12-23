import { useState } from "react";
import UserDetailsActions from "../UserDetailsActions";
import { useAuth } from "../../../context/AuthContext"
import { Loader } from "../../atoms/Loader/Loader";

const UserDetailsButtonActions = ({
  userCanEdit,
}: {
  userCanEdit: boolean;
}) => {  
  const [isEditOptionOpen, setIsEditOptionOpen] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const openEditOptions = (newState: boolean) => {
    setIsEditOptionOpen(newState);
  };

  return (
    <>
      <div className="user-details__actions-buttons-container">
        <UserDetailsActions
          userCanEdit={userCanEdit}
          onCopyLink={copyLink}

          isEditOptionOpen={isEditOptionOpen}
          openEditOptions={openEditOptions}
        />
      </div>
    </>
  );
};

export default UserDetailsButtonActions;
