import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  width: 100px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 5px;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #777;
`;

const Arrow = styled.img`
  position: relative;
  filter: invert(100%);
  transform: rotate(180deg);
  height: 20px;
  transition: all 200ms ease;

  ${Container}:hover & {
    transform: translateX(-7px) rotate(180deg);
  }
`;

const BackBtn = (props: { to?: string; name?: string }) => (
  <Link to={props.to || "/"} style={{ textDecoration: "none" }}>
    <Container>
      <Arrow src="/icons/arrow.svg" />
      <Text>{props.name || "Tilbake"}</Text>
    </Container>
  </Link>
);

export default BackBtn;
