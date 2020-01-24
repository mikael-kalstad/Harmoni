import React, { useEffect, useState } from "react";
import { searchService } from "../../services/SearchService";
import ArrangementGrid from "../eventGrid";
import { IEvent } from "./eventPage";

const MinPrice = () => {
  const [eventsData, setEventData] = useState<IEvent[]>();

  useEffect(() => {
    fetchLowPriceEvents();
  }, []);

  const fetchLowPriceEvents = async () => {
    setEventData(await searchService.sortAfterLowPrice());
  };

  // Render grid of all matching arrangements
  return (
    <ArrangementGrid title={"Arrangmenter pris lav-høy"} data={eventsData} />
  );
};

export default MinPrice;
