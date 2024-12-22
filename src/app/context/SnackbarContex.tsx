import React, { createContext, useContext, useState } from 'react';
import { CircleExclamationIcon } from '../../assets/icons/icons';

export enum ESnackbarTypes {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info"
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: { variant?: ESnackbarTypes; autoHideDuration?: number }) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [variant, setVariant] = useState<ESnackbarTypes>(ESnackbarTypes.SUCCESS);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const enqueueSnackbar = (message: string, options: { variant?: ESnackbarTypes; autoHideDuration?: number } = {}) => {

    setMessage(message);
    setVariant(options.variant || ESnackbarTypes.SUCCESS);
    setIsVisible(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const autoHideDuration = options.autoHideDuration || 3000;
    const newTimeoutId = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDuration);

    setTimeoutId(newTimeoutId);
  };

  const closeSnackbar = () => {
    setIsVisible(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}
      {isVisible && (
        <div
          className={`snackbar snackbar--${variant}`}
          onClick={closeSnackbar}
        >
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
