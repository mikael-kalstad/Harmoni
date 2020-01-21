import React from "react";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 10px;

  :hover {
    filter: brightness(98%);
  }
`;

const ProfileOptions = () => (
  <Container>
    <Dropdown alignRight>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <img src="/icons/settings.svg" alt="settings icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ position: "absolute" }}>
        <LinkContainer to="/profile/change">
          <Dropdown.Item>Endre info</Dropdown.Item>
        </LinkContainer>
        <LinkContainer to="/profile/password">
          <Dropdown.Item>Endre passord</Dropdown.Item>
        </LinkContainer>
      </Dropdown.Menu>
    </Dropdown>
  </Container>
);

export default ProfileOptions;
