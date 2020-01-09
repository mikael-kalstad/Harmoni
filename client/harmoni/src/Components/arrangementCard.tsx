import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const StyledLink = styled(props => <Link {...props} />)`
    width: fit-content;

    :hover {
        text-decoration: none;    
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-rows: auto 15px auto;
    grid-gap: 8px;
    width: fit-content;
`;

const Img = styled.img`
    width: 350px;
    height: 210px;
    object-fit: cover;
    border-radius: 10px;
`;

const Overlay = styled.div`
    position: absolute;
    width: 350px;
    height: 210px;
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
    width: 30%;
`;

const Title = styled.h3`
    font-weight: 600;
    font-size: 16px;
    color: black;
    margin-left: 5px;
    width: 70%;
`;

const ArrangementCard = (props: any) => {
    const card = (
        <Container>
            {props.img 
                ? (
                    <>
                        <Overlay />   
                        <Img src={props.img} alt={props.title} />
                    </>
                )
                : <Skeleton width='350px' height='210px' />
            }
            
            <Category>{props.category || <Skeleton />}</Category>
            <Title>{props.title || <Skeleton />}</Title>
        </Container>
    );

    if (props.id) {
        return (
            <StyledLink to={'/event/' + props.id}>
                {card}
             </StyledLink>
        )
    }

    return card;
}

export default ArrangementCard;