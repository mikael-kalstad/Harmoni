import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DateTimePicker = (props: any) => {
  const handleDateChange = (date: Date | null) => {
    props.setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          inputVariant="outlined"
          margin="normal"
          format="dd/MM/yyyy"
          label="Dato"
          value={props.selectedDate}
          onChange={handleDateChange}
          error={props.error}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          fullWidth
          inputVariant="outlined"
          margin="normal"
          label="Tid"
          value={props.selectedDate}
          onChange={handleDateChange}
          error={props.error}
          helperText={props.helperText}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateTimePicker;
