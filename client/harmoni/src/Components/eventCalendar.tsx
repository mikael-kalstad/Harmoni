import React, {useEffect, useState} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 10vh;
    margin-top: 0vh;
`;

const localizer = momentLocalizer(moment);

interface DateEvent {
    start: Date;
    end: Date;
    title: string;
    resource?: any,
}

const EventCalendar = (props: any) => {

    const [events, setEvents] = useState<DateEvent[]>([]);

    useEffect(() => {
        if (props.data) {
            let newArr: DateEvent[];
            newArr = props.data.map(e => {
                    return {
                        start: moment(e.from_date, 'DD-MM-YYYY HH:mm').toDate(),
                        end: moment(e.to_date, 'DD-MM-YYYY HH:mm').toDate(),
                        title: e.name,
                        resource: e
                    }
                }
            );
            setEvents(newArr);
        }
    }, [props.data]);

    if (props.data) {
        return (
            <Wrapper>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={events}
                    style={{height: "80vh", maxWidth: "100vh"}}
                    views={['month']}
                    //toolbar={false}
                    onDoubleClickEvent={e => console.log(e)}
                />
            </Wrapper>
        );
    } else {
        return <></>
    }

};

export default EventCalendar;
