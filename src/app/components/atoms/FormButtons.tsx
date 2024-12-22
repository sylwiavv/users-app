import { ButtonWithSpinner } from "./ButtonWithSpinner/ButtonWithSpinner"

interface IFormButtonsProps {
    onClose: () => void, 
    onSend: () => void
    isLoading: boolean
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const FormButtons = ({onClose, onSend, isLoading, type="button"}: IFormButtonsProps) => {
    return (
        <div className="form-buttons">
            <button className="form-buttons__cancel" disabled={isLoading} onClick={onClose}>Cancel</button>
            <ButtonWithSpinner type={type} isLoading={isLoading} onClick={onSend}>Send</ButtonWithSpinner>
        </div>
    )
}