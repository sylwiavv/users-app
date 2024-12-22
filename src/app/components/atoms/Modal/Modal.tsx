import { ReactNode, useEffect } from "react";
import { XMarkIcon } from "../../../../assets/icons/icons";

interface IModlProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
export const Modal = ({ isOpen, onClose, children }: IModlProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-actions" onClick={onClose}>
          <div className="modal-actions__close">
          <XMarkIcon />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
