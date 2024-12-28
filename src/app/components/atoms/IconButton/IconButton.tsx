import React, { ReactNode } from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label?: string;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const IconButton = ({ onClick, icon, label, className, type ="button" }: IconButtonProps) => {
  return (
    <button type={type} className={`icon-button ${className || ""}`} onClick={onClick}>
      <span className="icon-button__icon">{icon}</span>
      {label === "" ? "" : <span className="icon-button__label">{label}</span>}
    </button>
  );
};

export default IconButton;
