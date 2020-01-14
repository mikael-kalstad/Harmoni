import React, { useState } from 'react';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaRegFrownOpen } from 'react-icons/fa';

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
interface IWrapper {
  empty: boolean;
}

const Wrapper = styled.div<IWrapper>`
  border: ${props => (props.empty ? 'dashed 3px #bbbbbb' : 'none')};
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  ${props => (props.empty ? 'display: grid' : '')}
  ${props =>
    props.empty ? 'grid-template-rows: 5fr 3fr' : ''}
  align-items: center;
  justify-items: center;
`;

interface ITitleText {
  empty: boolean;
}

const TitleText = styled.p<ITitleText>`
  font-weight: bold;
  text-align: center;
  font-size: ${props => (props.empty ? '24px' : '18px')};
  color: grey;
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

const FaIconStyle = {
  fontSize: '120px',
  color: 'grey'
};

/* Component for displaying a list of artists */
/* Used in eventPage */
const ArtistsList = (props: ArtistsListProps) => {
  console.log(props.artists);
  if (props.artists.length > 0) {
    return (
      <Wrapper empty={props.artists.length == 0}>
        <TitleText empty={props.artists.length == 0}>
          Personer som skal opptre på dette arrangementet:
        </TitleText>
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
      <Wrapper empty={props.artists.length == 0}>
        <FaRegFrownOpen style={FaIconStyle} />
        <TitleText empty={props.artists.length == 0}>
          Foreløpig er ingen artister knyttet til dette arrangementet
        </TitleText>
      </Wrapper>
    );
  }
};

export default ArtistsList;
