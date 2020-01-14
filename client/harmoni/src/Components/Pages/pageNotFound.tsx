import React from "react";
import styled from "styled-components";
import OutlineButton from "../Button/outlineButton";

const Container = styled.div`
  height: 80vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

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
  margin-bottom: 40px;
`;

const PageNotFound = () => (
  <Container>
    <Wrapper>
      <Title>404</Title>
      <UnderTitle>Side ikke funnet</UnderTitle>
      <Text>
        Denne siden finnes ikke. Sjekk URL eller prøv å søke på siden du ønsker
        å finne. Klikk på knappen under for å gå tilbake
      </Text>

      <OutlineButton width="170px" height="60px" to="/" solid={true}>
        Gå tilbake
      </OutlineButton>
    </Wrapper>
  </Container>
);

export default PageNotFound;
