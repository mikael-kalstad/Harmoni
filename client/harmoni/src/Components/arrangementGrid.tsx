import React from 'react';
import styled from 'styled-components';
import ArrangementCard from './arrangementCard';

const Container = styled.div`
    width: 80%;
    margin: auto;
    margin-bottom: 100px;
`

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
`;

const arrangementGrid = (props:any) => {
    let cards: JSX.Element[] = [];

    for (let i = 0; i < 8; i++) {
        cards.push(
            <ArrangementCard key={i} />
        )
    }

    if (props.data) {
        cards = [];

        props.data.forEach((a:any) => {
            cards.push(
                <ArrangementCard
                    id={a.event_id}
                    key={a.event_id}
                    category={a.category}
                    title={a.name}
                    img={a.picture}
                />
            );
        });
    }

    return (
        <Container>
            <Title>{props.title}</Title>

            <Grid>
                {cards}
            </Grid>
        </Container>
    )
}

export default arrangementGrid;