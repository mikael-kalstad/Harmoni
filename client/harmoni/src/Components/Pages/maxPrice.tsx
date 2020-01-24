import React, { useEffect, useState } from "react";
import { searchService } from "../../services/SearchService";
import ArrangementGrid from "../eventGrid";
import { IEvent } from "./eventPage";

const MaxPrice = () => {
  const [eventsData, setEventData] = useState<IEvent[]>();

  useEffect(() => {
    fetchHighPriceEvents();
  }, []);

  const fetchHighPriceEvents = async () => {
    setEventData(await searchService.sortAfterHighPrice());
  };

  // Render grid of all matching arrangements
  return (
    <ArrangementGrid title={"Arrangmenter pris høy-lav"} data={eventsData} />
  );
};

export default MaxPrice;
