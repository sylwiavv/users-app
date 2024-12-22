import React from "react";
import { IUser } from "../../types/users";
import { AddressIcon, CalendarIcon, EarthIcon } from "../../../assets/icons/icons";

const UserDetailsTravel = ({ user }: { user: IUser }) => {
  const { citizenship, visa } = user;

  return (
    <div className="user-details__travel-info">
      <h3 className="user-details__subtitle">Travel info</h3>
      {/* Citizenship */}
      <div className="user-details__item">
        <div className="user-details__icon-and-label">
          <span className="user-details__icon">
            <EarthIcon />
          </span>
          <p className="user-details__label">Citizenship</p>
        </div>
        <p className="user-details__value">{citizenship}</p>
      </div>

      {/* Visa Details */}
      {visa?.map((visaItem, index) => (
        <div key={index}>
          {/* Visa Type */}
          <div className="user-details__item">
            <div className="user-details__icon-and-label">
              <span className="user-details__icon"><AddressIcon /></span>
              <p className="user-details__label">Visa {index + 1}</p>
            </div>
            <p className="user-details__value">{visaItem.type}</p>
          </div>

          {/* Visa Validity Period */}
          <div className="user-details__item">
            <div className="user-details__icon-and-label">
              <span className="user-details__icon"><CalendarIcon /></span>
              <p className="user-details__label">
                Visa {index + 1} Validity Period
              </p>
            </div>
            <p className="user-details__value">
              {new Date(visaItem.start_date).toLocaleDateString()} -{" "}
              {new Date(visaItem.end_date).toLocaleDateString()} (
              {new Date(visaItem.end_date) < new Date() ? "Expired" : "Active"})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailsTravel;
