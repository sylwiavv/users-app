import { EUserRole, IUser } from "../../../types/users";
import { Modal } from "../../atoms/Modal/Modal";
import { useState } from "react";
import { FormButtons } from "../../atoms/FormButtons";
import { useForm } from "../../../hooks/useForm";
import { useUser } from "../../../../server-actions/hooks/useUser";
import { useUsers } from "../../../context/UsersContext";
import { EditUserRole } from "./EditUserRole";

export const SettingsTableRow = ({ user }: { user: IUser }) => {
  const { updateUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { refreshUsers } = useUsers();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  const {
    id,
    first_name,
    last_name,
    first_native_name,
    last_native_name,
    user_avatar,
    role,
  } = user;

  const defaultValues = {
    role: "",
  };

  const handleOnSubmit = () => {
    if (formValues.role === "") {
      setError({ error: true, message: "You have to choose role" });
      return;
    }
    (async () => {
      setIsLoading(true);

      try {
        const update = await updateUser({ id, data: formValues });

        if (update?.status === 200) {
          await refreshUsers();
          setIsLoading(false);

          setError({ error: false, message: "" });
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error updating user role:", error);

        setIsLoading(false);
      }
    })();
  };

  const { formValues, handleInputChange, handleSubmit } = useForm(
    defaultValues,
    handleOnSubmit
  );

  return (
    <li className="address-book__content__user">
      <div className="address-book__content__user__personal">
        <img
          className="address-book__content__user__personal__photo"
          src={user_avatar}
          alt={`${first_name} ${last_name}`}
        />
        <div className="address-book__content__user__personal__name">
          <div className="address-book__content__user__personal__name-translated">
            {first_name} {last_name}
          </div>
          <div className="address-book__content__user__personal__name-native">
            {first_native_name} {last_native_name}
          </div>
        </div>
      </div>
      <div className="address-book__content__user__role">
        <button
          disabled={
            role.toUpperCase() === EUserRole.EMPLOYEE ||
            role.toUpperCase() === EUserRole.ADMIN
          }
          className={`sharp-button ${
            role.toUpperCase() === EUserRole.HR ? "sharp-button--disabled" : ""
          }`}
        >
          HR
        </button>
        <button
          disabled={
            role.toUpperCase() === EUserRole.HR ||
            role.toUpperCase() === EUserRole.ADMIN
          }
          className={`sharp-button ${
            role.toUpperCase() === EUserRole.EMPLOYEE
              ? "sharp-button--disabled"
              : ""
          }`}
        >
          EMPLOYEE
        </button>
      </div>

      <button
        disabled={role.toUpperCase() !== EUserRole.ADMIN}
        className={`sharp-button ${
          role.toUpperCase() === EUserRole.ADMIN ? "sharp-button--disabled" : ""
        }`}
      >
        ADMIN
      </button>
      <button
        className="address-book__content__user__role-edit edit-button"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-pen"></i>Edit
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EditUserRole user={user} />
        <form onSubmit={handleOnSubmit}>
          {/* TODO: prepare Field component for select inputns */}
          <select
            name="role"
            id="role-select"
            value={formValues.role as EUserRole}
            onChange={handleInputChange}
          >
            <option value="">--Choose role--</option>
            <option value={`${EUserRole.ADMIN}`}>Admin</option>
            <option value={`${EUserRole.EMPLOYEE}`}>Employee</option>
            <option value={`${EUserRole.HR}`}>HR</option>
          </select>
        </form>
        {error && (
          <p className="input-label__wrapper__error">{error.message}</p>
        )}
        <FormButtons
          onClose={() => setIsOpen(false)}
          onSend={handleOnSubmit}
          isLoading={isLoading}
        />
      </Modal>
    </li>
  );
};
