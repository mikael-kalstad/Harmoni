import React, { useState, useEffect } from "react";
import { eventService } from "../../services/EventService";
import AddEvent from "../AddEvent/addEvent";

const EditEvent = (props: any) => {
  const [eventData, setEventData] = useState();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () =>
    setEventData(await eventService.getEventById(props.match.params.id));

  return <AddEvent userData={props.userData} eventData={eventData} />;
};

export default EditEvent;
