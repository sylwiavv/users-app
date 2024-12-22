import { useState } from "react";
import {
  PenIcon,
  CopyIcon,
  CircleExclamationIcon,
} from "../../../assets/icons/icons";
import IconButton from "../atoms/IconButton/IconButton";
import { Modal } from "../atoms/Modal/Modal"
import { EDIT_OPTION, UserEditOptions } from "./UserEditOptions";
import { PersonalForm } from "./EditForms/PersonalForm";
import { ContactForm } from "./EditForms/ContactForm";
import { GeneralForm } from "./EditForms/GeneralForm";

interface IUserDetailsActionsProps {
  userCanEdit: boolean;
  isEditOptionOpen: boolean;
  openEditOptions: (isEditOptionOpen: boolean) => void;
  onCopyLink: () => void;
}

const UserDetailsActions = ({
  userCanEdit,
  onCopyLink,
}: IUserDetailsActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    content: "",
  });
  const [isEditOptionOpen, setIsEditOptionOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen({ isOpen: false, content: "" });
  };

  return (
    <>
      <IconButton
        onClick={onCopyLink}
        icon={<CopyIcon />}
        label={"Copy link"}
        className="user-details__personal-copy-button"
      />

      {userCanEdit ? (
        <>
          <IconButton
            onClick={() => setIsEditOptionOpen(!isEditOptionOpen)}
            icon={<PenIcon />}
            label={"Edit"}
            className="user-details__personal-edit-button edit-button"
          />

          <Modal isOpen={isModalOpen.isOpen} onClose={closeModal}>
            {isModalOpen.content === EDIT_OPTION.PERSONAL && <PersonalForm closeModal={closeModal} />}

            {isModalOpen.content === EDIT_OPTION.CONTACT && <ContactForm closeModal={closeModal} />}

            {isModalOpen.content === EDIT_OPTION.GENERAL && <GeneralForm closeModal={closeModal} />}
          </Modal>

          {isEditOptionOpen && (
            <UserEditOptions
              setIsModalOpen={setIsModalOpen}
              setIsEditOptionOpen={setIsEditOptionOpen}
            />
          )}
        </>
      ) : (
        <>
          <div className="edit-user-options__permissions">
            <p>
              <CircleExclamationIcon />
              You do not have permissions to edit these employee data.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailsActions;
