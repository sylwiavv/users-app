import { IUser } from "../../types/users";
import { AtSymbolIcon, CIcon, MobileIcon, SkypeIcon } from "../../../assets/icons/icons";

const UserDetailsContacts = ({ user }: { user: IUser }) => {
  const { phone, email, skype, cnumber } = user;
  return (
    <div className="user-details__contacts">
      <h3 className="user-details__subtitle">Contacts info</h3>
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <MobileIcon />
          </span>
          <p className="user-details__label">Mobile Phone</p>
        </div>
        <p className="user-details__value">{phone}</p>
      </div>
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon"><AtSymbolIcon /></span>
          <p className="user-details__label">Email</p>
        </div>
        <p className="user-details__value">{email}</p>
      </div>
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <SkypeIcon />
          </span>
          <p className="user-details__label">Skype</p>
        </div>
        <p className="user-details__value">{skype}</p>
      </div>
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <CIcon />{" "}
          </span>
          <p className="user-details__label">C-Number</p>
        </div>
        <p className="user-details__value">{cnumber}</p>
      </div>
    </div>
  );
};

export default UserDetailsContacts;
