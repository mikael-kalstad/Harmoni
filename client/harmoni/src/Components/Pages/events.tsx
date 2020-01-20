import React, { useState, useEffect } from "react";
import EventGrid from "../eventGrid";
import { eventService } from "../../services/EventService";

const Events = (props: any) => {
  const [eventData, setEventData] = useState(undefined);
  const types_translated = [
    "Konsert",
    "Festival",
    "Teater",
    "Standup",
    "Show",
    "Annet"
  ];
  const types = ["concert", "festival", "theatre", "standup", "show", "other"];

  // Get data when component mounts or when type/category is changed
  useEffect(() => {
    setEventData(undefined);

    // Get event data from DB and set state
    const fetchData = async () => {
      // Async DB call
      let res = await eventService.getAllEvents();

      // Only display arrangements that match the type/category selected
      setEventData(
        res.filter(
          (a: any) => a.category === props.match.params.type.toLowerCase()
        )
      );
    };

    fetchData();
  }, [props.match.params.type]);

  // Render grid of all matching arrangements
  return (
    <EventGrid
      title={
        types_translated[types.indexOf(props.match.params.type)] +
        " arrangementer"
      }
      data={eventData}
      emptyText="Det finnes ingen arrangementer i denne kategorien"
    />
  );
};

export default Events;
