import React from "react";
import styled from "styled-components";
import ArrangementCard from "./arrangementCard";

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 100px;
`;

const Grid = styled.div`
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  grid-gap: 30px 50px;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 36px;
  margin: 70px 20px;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const InfoText = styled.h3`
  margin-top: 140px;
  font-size: 38px;
  font-weight: 400;
  color: #8a8a8a;
`;

const arrangementGrid = (props: any) => {
  let cards: JSX.Element[] = [];

  for (let i = 0; i < 8; i++) {
    cards.push(<ArrangementCard key={i} />);
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
        <ArrangementCard
          id={a.event_id}
          key={a.event_id}
          category={a.category}
          title={a.name}
          picture={a.picture}
        />
      );
    });
  }

  return (
    <Container>
      <Title>{props.title}</Title>

      <Grid>{cards}</Grid>

      {/* If there are no events */}
      {cards.length === 0 && (
        <InfoText>Det finnes ingen arrangementer i denne kategorien</InfoText>
      )}
    </Container>
  );
};

export default arrangementGrid;
