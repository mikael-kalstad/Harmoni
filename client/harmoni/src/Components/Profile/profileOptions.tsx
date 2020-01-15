import React from "react";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  /* display: grid; */
  /* grid-template-rows: 1fr 1fr 1fr 1fr; */
  /* background: #F0F0F0; */
  padding: 10px;
  /* height: 400px; */
  /* overflow: hidden; */
  :hover {
    filter: brightness(98%);
  }
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 50px;
`;

const Text = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 30px;
  align-self: end;
  color: #868686;
`;

const UnderText = styled.p`
  font-weight: 500;
  font-size: 50px;
  font-size: 2vmax;
  width: 300px;
`;

const ProfileButton = styled.button`
    background-color: #B0BEC5;
    color: black;
    font-size: 16px;
    font-weight: 500;
    border none;
    padding: 10px 15px 10px;
    margin: 15px;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    outline: none;   
    
    :hover {
        background-color: black;
        color: white;
        text-decoration: none;
    }
    
`;

const ProfileOptions = () => (
  <Container>
    <Dropdown alignRight>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <img src="/icons/settings.svg" />
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
    {/* <ProfileLink to="/newEvent">
      <ProfileButton>Opprett arrangement</ProfileButton>
    </ProfileLink>
    <ProfileLink to="/profile/password">
      <ProfileButton>Endre passord</ProfileButton>
    </ProfileLink>
    <ProfileLink to="/profile/change">
      <ProfileButton>Endre profil</ProfileButton>
    </ProfileLink> */}
    {/* <ProfileLink to="/">
      <ProfileButton>Endre noe annet nyttig</ProfileButton>
    </ProfileLink> */}
  </Container>
);

export default ProfileOptions;
