import React, { useState } from 'react';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';

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

interface ArtistsListProps {
  artists: IUser[];
}

const Wrapper = styled.div``;

const TitleText = styled.p`
  font-weight: bold;
`;

const ArtistBar = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  align-items: center;
`;

const ArtistImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 1000px;
  object-fit: content;
  margin: 0;
  margin-right: 10px;
`;

const ArtistNameText = styled.label`
  font-size: 20px;
  margin: 0;
  justify-self: start;
`;

/* Component for displaying a list of artists */
/* Used in eventPage */
const ArtistsList = (props: ArtistsListProps) => {
  console.log(props.artists);
  if (props.artists.length > 0) {
    return (
      <Wrapper>
        <TitleText>Personer som skal opptre på dette arrangementet:</TitleText>
        <ListGroup>
          {props.artists.map(artist => {
            let base64 = new Buffer(artist.picture).toString('base64');

            return (
              <ListGroup.Item key={artist.user_id}>
                <ArtistBar>
                  <ArtistImage
                    src={
                      artist.picture != null
                        ? 'data:image/jpg;base64,' + base64
                        : ''
                    }
                  />
                  <ArtistNameText>{artist.name}</ArtistNameText>
                </ArtistBar>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Wrapper>
    );
  } else {
    return (
      <>
        <TitleText>
          Foreløpig er ingen artister knyttet til dette arrangementet
        </TitleText>
      </>
    );
  }
};

export default ArtistsList;
