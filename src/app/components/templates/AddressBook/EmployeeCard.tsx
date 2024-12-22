import { memo } from "react";
import { IUser } from "../../../types/users";
import { DoorIcon, SuitcaseIcon } from "../../../../assets/icons/icons";
import { useUserRole } from "../../../hooks/useUserRole";

interface IEmployeeCard {
  user: IUser;
  handleOnClick: (id: Pick<IUser, "id">) => void;
}

const EmployeeCardComponent = ({ user, handleOnClick }: IEmployeeCard) => {
  const { isUserManager } = useUserRole({ userFromPageDetails: user });

  const {
    id,
    user_avatar,
    first_name,
    last_name,
    department,
    role,
    room,
  } = user;

  return (
    <div className="employee-card" onClick={() => handleOnClick({ id })}>
      <div className="employee-card__avatar">
        <img
          className="employee-card__avatar_img"
          src={user_avatar}
          alt={`${first_name} ${last_name}`}
        />
        <h6 className="user-details__role">{role}</h6>
        <h4 className="employee-card__name">
          {first_name} {last_name}
        </h4>
      </div>
      <div className="employee-card__details">
        {isUserManager && (
          <div className="employee-card__label">You're a manager</div>
        )}
        <div className="employee-card__detail employee-card__department">
          <span className="user-details__icon fa-solid fa-suitcase">
            <SuitcaseIcon />
          </span>
          <p className="employee-card__text">{department}</p>
        </div>
        <div className="employee-card__detail employee-card__room">
          <span className="user-details__icon fa-solid fa-door-closed">
            <DoorIcon />
          </span>
          <p className="employee-card__text">{room}</p>
        </div>
      </div>
    </div>
  );
};

export const EmployeeCard = memo(EmployeeCardComponent);
