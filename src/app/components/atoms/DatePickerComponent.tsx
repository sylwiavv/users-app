import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerComponentProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>
}

const DatePickerComponent = ({
  startDate,
  setStartDate,
}: IDatePickerComponentProps) => {
  
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      scrollableYearDropdown
      showYearDropdown
      dateFormat="yyyy/MM/dd"
    />
  );
};

export default DatePickerComponent;
