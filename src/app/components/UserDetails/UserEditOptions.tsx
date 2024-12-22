import React, { Dispatch, SetStateAction } from 'react';

export enum EDIT_OPTION {
  PERSONAL = "PERSONAL",
  GENERAL = "GENERAL",
  CONTACT = "CONTACT"
}

type SetModalState = {
  isOpen: boolean
  content: EDIT_OPTION | "";
};

type UserEditOptionsProps = {
    setIsModalOpen: Dispatch<SetStateAction<{ isOpen: boolean; content: string; }>>
    setIsEditOptionOpen: Dispatch<SetStateAction< boolean >>
};

export const UserEditOptions: React.FC<UserEditOptionsProps> = ({ setIsModalOpen, setIsEditOptionOpen }) => {

  const handleChooseOption = (content: EDIT_OPTION) => {
    setIsModalOpen({ isOpen: true, content });
    setIsEditOptionOpen(false)
  };

  return (
    <div className="edit-user-options">
      <p
        id="edit-user-option-personal"
        className="option"
        onClick={() => handleChooseOption(EDIT_OPTION.PERSONAL)}
      >
        Personal
      </p>
      <p
        id="edit-user-option-general"
        className="option"
        onClick={() => handleChooseOption(EDIT_OPTION.GENERAL)}
      >
        General
      </p>
      <p
        id="edit-user-option-contact"
        className="option"
        onClick={() => handleChooseOption(EDIT_OPTION.CONTACT)}
      >
        Contact
      </p>
    </div>
  );
};
