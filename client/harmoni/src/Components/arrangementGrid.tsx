import React from 'react';
import styled from 'styled-components';
import ArrangementCard from './arrangementCard';

const Container = styled.div`
    width: 80%;
    margin: auto;
`

const Grid = styled.div`
    max-width: 100vw;
    display: grid; 
    grid-template-columns: repeat(auto-fill, 350px);
    grid-gap: 30px 50px;
    /* justify-content: center;  */
    /* justify-items: center; */
`;

const Title = styled.h2`
    font-weight: 500;
    font-size: 36px;
    margin: 70px 20px;
`;

const arrangementGrid = (props:any) => {
    let cards: JSX.Element[] = [];

    props.data.forEach((a:any) => {
        cards.push(
            <ArrangementCard
                id={a.id}
                category={a.category}
                title={a.title}
                img={a.img}
            />
        );
    });

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