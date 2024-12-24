import { IUser } from "../../../types/users";

export const EditUserRole = ({ user }: { user: IUser }) => {
  const { first_name, last_name, role } = user;

  return (
    <div className="user-edit-role">
      <div className="user-edit-role__header">
        <h3 className="user-edit-role__header-title">Edit user role</h3>
      </div>

      <div className="user-edit-role__description">
        <p>
          You are editing {first_name} {last_name}
          role.
        </p>
        <p>Current role is {role}</p>
      </div>
    </div>
  );
};
