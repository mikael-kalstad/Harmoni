import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 30px;
  margin: 60px;
`;

const Img = styled.img`
  width: 70px;
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

const Success = (props: { title: string }) => (
  <Wrapper>
    <Img src="/icons/check.svg" />
    <Text>{props.title}</Text>
  </Wrapper>
);

export default Success;
