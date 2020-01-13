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
  picture: string;
}

interface ArtistsListProps {
  artists: IUser[];
}

const Wrapper = styled.div`
  margin: 20px;
`;
const ArtistsList = (props: ArtistsListProps) => {
  return (
    <Wrapper>
      De opptredende
      <ListGroup>
        {props.artists.map(artist => (
          <ListGroup.Item>{artist.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Wrapper>
  );
};

export default ArtistsList;
