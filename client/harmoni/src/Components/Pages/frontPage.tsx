import React, { useState, useEffect } from "react";
import HeaderCarousel from "../headerCarousel";
import EventGrid from "../eventGrid";
import { eventService } from "../../services/EventService";

const FrontPage = () => {
  const [eventData, setEventData] = useState(undefined);

  // Get data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setEventData(await eventService.getAllEvents());
  };

  return (
    <>
      <HeaderCarousel data={eventData} />
      <EventGrid data={eventData} title="Populære arrangementer" />
    </>
  );
};

export default FrontPage;
