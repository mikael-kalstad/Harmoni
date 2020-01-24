/**
 * Date and time component which combines
 * two date pickers from material UI to create an single component
 * with both date and time input.
 */

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
          invalidDateMessage="Ugyldig format"
          maxDateMessage="Dato er for langt fram i tid"
          minDateMessage="Dato er for langt bak i tid"
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
          invalidDateMessage="Ugyldig format"
          ampm={false}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateTimePicker;
