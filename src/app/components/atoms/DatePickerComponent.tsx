import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerComponentProps {
  startDate: Date;
  placeholderText?: string;
  maxDate?: Date;
  setStartDate: (date: Date) => void;
  handleOnBlur?: () => void;
}

const DatePickerComponent = ({
  startDate,
  setStartDate,
  handleOnBlur,
  maxDate,
  placeholderText,
}: IDatePickerComponentProps) => {
  return (
    <DatePicker
      placeholderText={placeholderText}
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      scrollableYearDropdown
      showYearDropdown
      dateFormat="yyyy/MM/dd"
      onBlur={handleOnBlur}
      maxDate={maxDate}
    />
  );
};

export default DatePickerComponent;
