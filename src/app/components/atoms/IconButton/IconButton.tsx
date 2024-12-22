import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string; 
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, label, className }) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <span className="icon-button__icon">{icon}</span>
      {label === "" ? "" : <span className="icon-button__label">{label}</span>}
    </button>
  );
};

export default IconButton;
