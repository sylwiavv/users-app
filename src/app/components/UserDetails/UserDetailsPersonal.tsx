import { IUser } from "../../types/users";

export const UsersDetailsPersonal = ({ user }: { user: IUser }) => {
  const {
    user_avatar,
    first_name,
    last_name,
    first_native_name,
    last_native_name,
    role,
  } = user;
  return (

    <div id="user-avatar-container" className="user-details__avatar-container">
      <img
        src={user_avatar}
        alt={first_name}
        className="user-details__avatar-img"
      />
      <div className="user-details__personal">
        <h6 className="user-details__role">{role}</h6>
        <h2 className="user-details__personal__name-translated">
          {first_name} {last_name}
        </h2>
        <h3 className="user-details__personal__name-native">
          {first_native_name} {last_native_name}
        </h3>
      </div>
    </div>
    
  );
};
