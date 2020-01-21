import React from "react";
import styled from "styled-components";
import EventCard from "./eventCard";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 100px;
`;

const Grid = styled.div`
  max-width: 100vw;
  overflow: hidden;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, 350px); */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px 70px;

  @media screen and (max-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 36px;
  margin: 70px 20px;
  width: 60%;
  max-width: 100%;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const InfoText = styled.h3`
  font-size: 27px;
  margin-top: 30px;
  font-weight: 400;
  color: #a7a7a7;
`;

const arrangementGrid = (props: any) => {
  let cards: JSX.Element[] = [];

  for (let i = 0; i < 8; i++) {
    cards.push(<EventCard key={i} />);
  }

  if (props.data) {
    // Sort by date
    props.data.sort((a: any, b: any) => {
      let fromA: any;
      fromA = new Date(a.fromDate);

      let fromB: any;
      fromB = new Date(b.fromDate);

      return fromA - fromB;
    });

    cards = [];

    props.data.forEach((a: any) => {
      cards.push(
        <EventCard
          id={a.event_id}
          key={a.event_id}
          status={a.status}
          category={a.category}
          title={a.name}
          picture={a.picture}
          fromDate={a.from_date}
          toDate={a.to_date}
          eventInProfile={props.eventInProfile}
        />
      );
    });
  }

  return (
    <Container>
      <Title>{!props.data ? <Skeleton /> : props.title}</Title>

      <Grid>{cards}</Grid>

      {/* If there are no events */}
      {cards.length === 0 && <InfoText>{props.emptyText}</InfoText>}
    </Container>
  );
};

export default arrangementGrid;
