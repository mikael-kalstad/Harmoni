import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
   height: 100vh;
   display: grid;
   justify-items: center;
   align-items: center;
`

const Wrapper = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
`;

const Title = styled.h2`
    font-size: 130px;
    font-weight: 900;
    margin: 0;
`;

const UnderTitle = styled.h3`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Text = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #8a8a8a;
    width: 80%;
    text-align: center;
`;

const Button = styled.button`
    width: 170px;
    height: 60px;
    background-color: black;
    outline: none;
    border: none;
    color: white;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 60px;

    :hover {
        filter: brightness(110%);
    }
`;

const PageNotFound = () => (
    <Container>
        <Wrapper>
            <Title>404</Title>
            <UnderTitle>Side ikke funnet</UnderTitle>
            <Text>Denne siden finnes ikke. Sjekk URL eller prøv å søke på siden du ønsker å finne. Klikk på knappen under for å gå tilbake</Text>

            <Link to='/'>
                <Button>Gå tilbake</Button>
            </Link>
        </Wrapper>
    </Container>
);

export default PageNotFound;