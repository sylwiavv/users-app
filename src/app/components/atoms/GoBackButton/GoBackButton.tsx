import React from "react";
import { useNavigate } from "react-router-dom";
import { GoBackIcon } from "../../../../assets/icons/icons";

interface IGoBackButtonProps {
  link: string;
  text?: string;
}

const GoBackButton = ({ link, text }: IGoBackButtonProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`${link}`);
  };

  return (
    <button onClick={handleGoBack} className="go-back-button">
      <div className="go-back-button__icon-wrapper">
        <GoBackIcon />
      </div>
      {text}
    </button>
  );
};

export default GoBackButton;
