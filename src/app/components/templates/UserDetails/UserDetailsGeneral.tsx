import { SuitcaseIcon, BuildingIcon, DoorIcon, HashIcon, PersonIcon, CalendarIcon } from "../../../../assets/icons/icons";
import { IUser } from "../../../types/users";

const UserDetailsGeneral = ({ user }: { user: IUser }) => {
  const { department, building, room, desk_number, date_birth, manager } = user;

  return (
    <div className="user-details__general">
      <h3 className="user-details__subtitle">General info</h3>

      {/* Department */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <SuitcaseIcon />
          </span>

          <p className="user-details__label">Department</p>
        </div>
        <p className="user-details__value">{department}</p>
      </div>

      {/* Building */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <BuildingIcon />
          </span>
          <p className="user-details__label">Building</p>
        </div>
        <p className="user-details__value">{building}</p>
      </div>

      {/* Room */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <DoorIcon />
          </span>
          <p className="user-details__label">Room</p>
        </div>
        <p className="user-details__value">{room}</p>
      </div>

      {/* Desk number */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon"><HashIcon /></span>
          <p className="user-details__label">Desk number</p>
        </div>
        <p className="user-details__value">{desk_number}</p>
      </div>

      {/* Date of Birth */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <CalendarIcon />
          </span>
          <p className="user-details__label">Date of Birth</p>
        </div>
        <p className="user-details__value">
          {date_birth
            ? `${date_birth.day}/${date_birth.month}/${date_birth.year}`
            : ""}
        </p>
      </div>

      {/* Manager */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            {" "}
            <PersonIcon />
          </span>
          <p className="user-details__label">Manager</p>
        </div>
        <p className="user-details__value">
          {manager ? `${manager.first_name} ${manager.last_name}` : ""}
        </p>
      </div>
    </div>
  );
};

export default UserDetailsGeneral;
