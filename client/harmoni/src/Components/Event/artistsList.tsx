import React from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import { FaRegFrownOpen } from "react-icons/fa";
import ArtistCard from "../AddEvent/EventForms/artistCard";

interface IUser {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: any;
}

interface IProps {
  artists: IUser[];
  hideTitle?: boolean;
  riderData?: any;
  readOnly?: boolean;
  eventId?: number;
  userData?: any;
}

interface IWrapper {
  empty: boolean;
}

const Wrapper = styled.div<IWrapper>`
  border: ${props => (props.empty ? "dashed 3px #bbbbbb" : "none")};
  height: 100%;
  border-radius: 10px;
  ${props => (props.empty ? "display: grid" : "")}
  ${props =>
    props.empty ? "grid-template-rows: 5fr 3fr" : ""}
  align-items: center;
  justify-items: center;
`;

interface ITitleText {
  empty: boolean;
}

const TitleText = styled.p<ITitleText>`
  font-weight: bold;
  text-align: center;
  font-size: ${props => (props.empty ? "24px" : "18px")};
  color: grey;
  margin: 0px 10px;
`;

interface IArtistsBar {
  rider: any;
}

const ArtistBar = styled.div<IArtistsBar>`
  display: grid;
  grid-template-columns: ${props =>
    props.rider ? "30% auto 10%" : "30% auto"};
  align-items: center;
`;

/* Component for displaying a list of artists */
/* Used in eventPage */
const ArtistsList = (props: IProps) => {
  let FaIconStyle = {
    fontSize: "15vw",
    color: "#cccccc",
    margin: "10px"
  };

  return props.artists.length > 0 ? (
    <Wrapper empty={props.artists.length === 0}>
      <ListGroup>
        {!props.hideTitle && (
          <ListGroup.Item key={-1}>
            <TitleText empty={props.artists.length === 0}>
              Personer som skal opptre på dette arrangementet
            </TitleText>
          </ListGroup.Item>
        )}
        {props.artists.map((artist, index) => {
          return (
            <ListGroup.Item
              key={artist.user_id + index}
              style={
                props.userData && props.userData.user_id === artist.user_id
                  ? {
                      background: "#E3F2FF"
                    }
                  : {}
              }
            >
              <ArtistCard
                artist={artist}
                riderData={props.riderData}
                readOnly={props.readOnly}
                eventId={props.eventId}
                userData={props.userData}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Wrapper>
  ) : (
    <Wrapper empty={props.artists.length === 0}>
      <FaRegFrownOpen style={FaIconStyle} />
      <TitleText empty={props.artists.length === 0}>
        Foreløpig er ingen personer knyttet til dette arrangementet
      </TitleText>
    </Wrapper>
  );
};

export default ArtistsList;
