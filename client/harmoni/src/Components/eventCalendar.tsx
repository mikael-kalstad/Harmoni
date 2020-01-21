import React, {useEffect, useState} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useHistory} from "react-router-dom";
import Loading from "./loading";

const localizer = momentLocalizer(moment);

interface DateEvent {
    start: Date;
    end: Date;
    title: string;
    id?: number,
}

const EventCalendar = (props: any) => {

    const history = useHistory();

    const [events, setEvents] = useState<DateEvent[]>([]);

    useEffect(() => {
        if (props.data) {
            let newArr: DateEvent[];
            newArr = props.data.map(e => {
                    return {
                        start: moment(e.from_date, 'DD-MM-YYYY HH:mm').toDate(),
                        end: moment(e.to_date, 'DD-MM-YYYY HH:mm').toDate(),
                        title: e.name,
                        id: e.event_id
                    }
                }
            );
            setEvents(newArr);
        }
    }, [props.data]);

    function handleDoubleClick(e : any) {
        if(e.id) {
            history.push('/event/details/'+e.id);
            window.scrollTo(0, 0);
        }
    }

  if (props.data) {
    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "80vh", maxWidth: "100vh" }}
        views={["month"]}
        //toolbar={false}
        onDoubleClickEvent={e => handleDoubleClick(e)}
      />
    );
  }
  return <Loading />;
};

export default EventCalendar;
