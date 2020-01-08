import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    padding: 10px;
    background: #F0F0F0;;
    width: fit-content;

    :hover {
        filter: brightness(98%);
    }
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px;
`;

const TextWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin-left: 10px;
    margin-right: 30px;
`;


const Text = styled.p`
    font-weight: 500;
    font-size: 15px;
    margin: 0;
    align-self: end;
    color: black;
`;

const UnderText = styled.p`
    font-size: 15px;
    color: #868686;
`;


const StyledLink = styled(props => <Link {...props} />)`
    :visited {
        color: black;
    }

    :hover {
        color: black;
        text-decoration: none;
    }
`;

const SmallProfileNav = (props: {img: string, name: string}) => (
    <StyledLink to='/profile'>
        <Container>
            <Img src={props.img}/>
            <TextWrapper>
                <Text>{props.name}</Text>
                <UnderText>Min side</UnderText>
            </TextWrapper>
        </Container>
    </StyledLink>
);

export default SmallProfileNav;