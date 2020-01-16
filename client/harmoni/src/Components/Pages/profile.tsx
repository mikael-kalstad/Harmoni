import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ProfilePageImage from "../Profile/profilePageImage";
import ProfileOptions from "../Profile/profileOptions";
import ArrangementGrid from "../arrangementGrid";
import { eventService } from "../../services/EventService";

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 100px auto;
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

const AddBtn = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr;
    justify-items: start;
    align-items: center;
    width: 220px;
    height: 60px;
    background-color: #73CF5C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    font-size: 16px;
    font-weight: 500;
    border none;
    margin: 0;
    margin-top: 100px;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    outline: none;   
    
    :hover {
        filter: brightness(95%);
    }
    :active {
        box-shadow: none;
    }
`;

const BtnIcon = styled.img`
  height: 40%;
  filter: invert(100%);
  justify-self: center;
`;

const Profile = (props: { userData: any }) => {
  const [events, setEvents] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setEvents(await eventService.getEventsByOrganizer(props.userData.user_id));
  };

  return (
    <>
      <Wrapper>
        <ProfileOptions />

        <ProfilePageImage
          picture={
            props.userData.picture
              ? new Buffer(props.userData.picture, "base64").toString("ascii")
              : ""
          }
          name={props.userData.name}
          type={props.userData.type}
        />

        {props.userData.type == "organizer" ? (
          <StyledLink to="/newEvent">
            <AddBtn>
              <BtnIcon src="/icons/plus-1.svg" />
              Nytt arrangement
            </AddBtn>
          </StyledLink>
        ) : (
          <></>
        )}
      </Wrapper>

      <ArrangementGrid data={events} title="Mine arrangementer" />
    </>
  );
};
export default Profile;
