import React from "react";
import { useNavigate } from "react-router-dom";
import { GoBackIcon } from "../../../../assets/icons/icons";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/address-book');
  };

  return (
    <button onClick={handleGoBack} className="go-back-button">
      <GoBackIcon />
    </button>
  );
};

export default GoBackButton;