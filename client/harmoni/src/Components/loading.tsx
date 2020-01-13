import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 80vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
`;

const Loading = () => (
  <Container>
    <Wrapper>
      <CircularProgress />
      <Text>Vennligst vent</Text>
    </Wrapper>
  </Container>
);

export default Loading;
