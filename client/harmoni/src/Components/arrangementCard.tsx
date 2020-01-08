import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(props => <Link {...props} />)`
   

    :hover {
        text-decoration: none;    
    }
`;

const Container = styled.div`
    margin: 20px;
    display: grid;
    width: fit-content;
    grid-template-rows: auto 15px auto;
    grid-gap: 10px;
    transition: all 200ms ease;

    :hover {
        /* transform: scale(1.01); */

    }
`;

const Img = styled.img`
    width: 300px;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
`;

const Overlay = styled.div`
    position: absolute;
    width: 300px;
    height: 170px;
    border-radius: 10px;
    transition: all 150ms ease;

    ${Container}:hover & {
        background-color: rgba(78,176,219,0.4);
    }
`

const Category = styled.p`
    font-size: 14px;
    color: #A2A2A2;
    margin-left: 5px;
`;

const Title = styled.h3`
    font-weight: 600;
    font-size: 16px;
    color: black;
    margin-left: 5px;
`;

const ArrangementCard = (props: any) => (
    <StyledLink to={'/arrangement/' + props.id}>
        <Container>
            <Overlay />   
            {props.img !== undefined && <Img src={props.img} />}
            
            <Category>{props.category}</Category>
            <Title>{props.title}</Title>
        </Container>
    </StyledLink>
);

export default ArrangementCard;