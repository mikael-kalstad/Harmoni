import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import SearchArtistBar from "../../Button/searchArtistBar";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

import "react-bootstrap-typeahead/css/Typeahead.css";

import Skeleton from "react-loading-skeleton";

import { eventService } from "../../../services/EventService";
import { ticketService } from "../../../services/TicketService";
import { userService } from "../../../services/UserService";
import { attachmentService } from "../../../services/AttachmentService";
import { loginService } from "../../../services/loginService";
import { riderService } from "../../../services/RiderService";

import ArtistsList from "../../Event/artistsList";
import styled from "styled-components";

interface IUser {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: string;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  vertical-align: middle;
`;

const ArtistImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  object-fit: content;
`;

const DelButton = styled.img`
  cursor: pointer;
  height: 50%;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const ArtistForm = (props: any) => {
  const [userData, setUserData] = useState<IUser[]>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setUserData(await userService.getUsersOfType("artist"));
  };

  const fetchArtistState = (s: { user: IUser }[]) => {
    if (s[0] != null) {
      let checker = props.listOfArtists.includes(s[0].user);
      if (!checker) props.setListOfArtists(array => [...array, s[0].user]);
    }
  };

  const deleteArtist = user => {
    if (user != null) {
      props.setListOfArtists(
        props.listOfArtists.filter(u => u.user_id !== user.user_id)
      );
    }
  };
  if (userData && userData != null) {
    return (
      <>
        <Title>Artister</Title>
        <h5>Legg til artister:</h5>
        <Typeahead
          labelKey={artistName => `${artistName.user.name}`}
          options={userData.map(user => ({ user }))}
          onChange={s => fetchArtistState(s)}
          onPaginate={() => console.log("clicked on name!")}
          placeholder="Søk etter artister..."
          selected={props.userData}
        />

        <h5>
          <br></br>Artistliste:{" "}
        </h5>

        <ListGroup>
          {props.listOfArtists &&
            props.listOfArtists.map(item => {
              return (
                <ListGroup.Item>
                  <Wrapper>
                    <ArtistImage
                      src={new Buffer(item.picture).toString("ASCII")}
                    />
                    <p>
                      <b>{item.name}</b>
                    </p>
                    <DelButton
                      src="/icons/cross.svg"
                      onClick={d => deleteArtist(item)}
                    />
                  </Wrapper>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </>
    );
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
};

export default ArtistForm;
