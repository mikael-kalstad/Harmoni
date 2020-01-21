import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderCarousel from "../headerCarousel";
import EventGrid from "../eventGrid";
import { eventService } from "../../services/EventService";
import Button from "../Button/button";

const ButtonWrapper = styled.div`
  width: 30%;
  display: grid;
  margin: auto;
`;

const FrontPage = () => {
  const [eventData, setEventData] = useState(undefined);
  const [offset, setOffset] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const [totalEventsCount, setTotalEventsCount] = useState(0);

  // Get data when component mounts
  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    fetchData();
  }, [offset]);

  const fetchData = () => {
    setFetchingData(true);
    eventService.getAllEventsWithOffset(offset).then(data => {
      let currData;
      eventData ? (currData = eventData.map(i => i)) : (currData = []);
      setEventData(currData.concat(data));
      setFetchingData(false);
    });
  };

  const fetchCount = () => {
    eventService.getCountOfAllEvents().then(data => {
      setTotalEventsCount(data[0].count);
    });
  };

  const allDataFetched = () => {
    return offset + 20 > totalEventsCount;
  };

  const increaseOffset = () => {
    setOffset(offset + 20);
  };

  return (
    <>
      <HeaderCarousel data={eventData} />
      <EventGrid data={eventData} title="Kommende arrangementer" />
      <ButtonWrapper>
        {(!allDataFetched() || fetchingData) && (
          <Button
            onClick={increaseOffset}
            loading={fetchingData}
            loadingColor="white"
            disabled={allDataFetched()}
            backgroundColor={allDataFetched() ? "grey" : ""}
          >
            Last inn flere
          </Button>
        )}
      </ButtonWrapper>
    </>
  );
};

export default FrontPage;
