import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";


interface ButtonWithSpinnerProps {
  isLoading: boolean;
  onClick: (e: React.FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({
  isLoading,
  onClick,
  children,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`button-with-spinner ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? <div className="spinner"></div> : ""} {children}
    </button>
  );
};
