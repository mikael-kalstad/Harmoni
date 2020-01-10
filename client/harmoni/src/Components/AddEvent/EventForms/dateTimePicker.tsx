import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pickerBox: {
            marginBottom: '40px',
            height: '55px',
            border: 'none',
            background: '#efefef',
        },
    }),
);

export default function DateTimePicker(props: any) {

    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2020-01-01T00:00:00'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                className={classes.pickerBox}
                margin="normal"
                id="date-picker-inline"
                variant="inline"
                format="dd/MM/yyyy"
                label="Dato"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <br/>
            <KeyboardTimePicker
                className={classes.pickerBox}
                margin="normal"
                id="time-picker"
                label="Tid"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
