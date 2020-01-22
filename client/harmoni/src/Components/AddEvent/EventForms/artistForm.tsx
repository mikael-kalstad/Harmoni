import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { userService } from "../../../services/UserService";
import styled from "styled-components";
import ArtistCard from "./artistCard";
import CircularProgress from "@material-ui/core/CircularProgress";

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
interface IRider {
  riderId: number;
  text: string;
}
interface IRiderList {
  riderListId: number;
  userId: number;
  eventId: number;
  riderId: number;
  text: string;
  quantity;
  number;
}

const LoadingWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 20px;
`;

const LoadingText = styled.p`
  font-size: 24px;
`;

const UnderTitle = styled.h3`
  font-size: 24px;
  margin: 50px 0 20px 0;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin-top: 45px;
  font-size: 16px;
  font-weight: 400;
  color: #777777;
`;

const ArtistForm = (props: any) => {
  const [artistsData, setArtistsData] = useState<IUser[]>();
  let typeahead;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setArtistsData(await userService.getUsersOfType("artist"));
  };

  const addArtist = (s: { user: IUser }[]) => {
    if (s[0] != null) {
      let checker = props.listOfArtists.includes(s[0].user);
      if (!checker) props.setListOfArtists(array => [...array, s[0].user]);
      typeahead.clear();
    }
  };

  const deleteArtist = user => {
    if (user != null) {
      props.setListOfArtists(
        props.listOfArtists.filter(u => u.user_id !== user.user_id)
      );
    }
  };

  if (artistsData && artistsData != null) {
    return (
      <>
        <Title>Artister</Title>
        <Text>
          Du kan legge til og endre artister senere ved å redigere arrangementet
          i min side.
        </Text>
        <UnderTitle>Legg til artister:</UnderTitle>
        <Typeahead
          id="typeahead"
          labelKey={artistName => `${artistName.user.name}`}
          options={artistsData.map(user => ({ user }))}
          onChange={s => addArtist(s)}
          placeholder="Søk etter artister..."
          selected={props.userData}
          ref={elem => (typeahead = elem)}
        />

        {props.listOfArtists && props.listOfArtists.length !== 0 && (
          <UnderTitle>Artistliste:</UnderTitle>
        )}

        {props.listOfArtists &&
          props.listOfArtists.map(u => (
            <ListGroup.Item key={u.email}>
              <ArtistCard
                user={u}
                remove={deleteArtist}
                riderData={props.listOfRiders}
                setRiderData={props.setListOfRiders}
              />
            </ListGroup.Item>
          ))}
      </>
    );
  }

  return (
    <LoadingWrapper>
      <CircularProgress size={30} />
      <LoadingText>Vennligst vent</LoadingText>
    </LoadingWrapper>
  );
};

export default ArtistForm;
