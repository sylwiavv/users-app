import React, { ChangeEventHandler } from "react";

interface NumberInputProps {
  id: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: number;
  step?: number;
  label?: string;
}

const NumberField: React.FC<NumberInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  min = 1,
  step = 1,
  label,
  error,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const numericValue = Math.max(parseInt(e.target.value, 10), min);
    e.target.value = numericValue.toString();
    onChange(e);
  };

  return (
    <div className="number-input input-label__wrapper">
      <label className="input-label__wrapper__label" htmlFor={id}>
        {label}

        <input
          id={id}
          name={name}
          type="number"
          value={value === 0 ? "" : value}
          onChange={handleChange}
          onBlur={onBlur}
          min={min}
          step={step}
        />
      </label>
      {error && <p className="input-label__wrapper__error">{error}</p>}
    </div>
  );
};

export default NumberField;
