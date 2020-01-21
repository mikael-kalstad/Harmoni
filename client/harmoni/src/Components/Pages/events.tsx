import React, { useState, useEffect } from "react";
import Button from "../Button/button";
import styled from "styled-components";
import EventGrid from "../eventGrid";
import { eventService } from "../../services/EventService";

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  width: 30%;
  display: grid;
  margin: auto;
`;

const Events = (props: any) => {
  const [eventData, setEventData] = useState(undefined);
  const [offset, setOffset] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const [totalEventsCount, setTotalEventsCount] = useState(0);

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
    const fetchCount = () => {
      eventService
        .getCountOfEventsByCategoryNotCancelledNotFinished(
          props.match.params.type
        )
        .then(data => {
          setTotalEventsCount(data[0].count);
        });
    };

    const fetchData = () => {
      eventService
        .getEventsByCategoryWithOffset(props.match.params.type, offset)
        .then(data => {
          setEventData(data);
        });
    };

    setOffset(0);
    fetchData();
    fetchCount();
  }, [props.match.params.type]);

  useEffect(() => {
    const fetchNewData = () => {
      if (eventData) {
        setFetchingData(true);
        eventService
          .getEventsByCategoryWithOffset(props.match.params.type, offset)
          .then(data => {
            let currData = eventData.map(i => i);
            setEventData(currData.concat(data));
            setFetchingData(false);
          });
      }
    };

    fetchNewData();
  }, [offset]);

  const allDataFetched = () => {
    return offset + 20 >= totalEventsCount;
  };

  const increaseOffset = () => {
    setOffset(offset + 20);
  };

  // Render grid of all matching arrangements
  return (
    <Wrapper>
      <EventGrid
        title={
          types_translated[types.indexOf(props.match.params.type)] +
          " arrangementer"
        }
        data={eventData}
        emptyText="Det finnes ingen arrangementer i denne kategorien"
      />
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
    </Wrapper>
  );
};

export default Events;
