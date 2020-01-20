import React from 'react';
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
  hideTitle?: boolean;
}
interface IWrapper {
  empty: boolean;
}

const Wrapper = styled.div<IWrapper>`
  border: ${props => (props.empty ? 'dashed 3px #bbbbbb' : 'none')};
  height: 100%;
  border-radius: 10px;
  /* padding: 10px; */
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
  margin: 0px 10px;
`;

const ArtistBar = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  align-items: center;
`;

const ArtistImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 1000px;
  object-fit: content;
  margin: 0;
  margin-right: 10px;
  box-shadow: 0px 3px 2px 0px #bababa;
`;

const ArtistNameText = styled.label`
  font-family: Arial;
  font-size: 20px;
  margin: 0;
  justify-self: start;
  font-weight: bold;
  color: #434343;
`;

/* Component for displaying a list of artists */
/* Used in eventPage */
const ArtistsList = (props: ArtistsListProps) => {
  let FaIconStyle = {
    fontSize: '15vw',
    color: '#cccccc',
    margin: '10px'
  };
  return props.artists.length > 0 ? (
    <Wrapper empty={props.artists.length === 0}>
      <ListGroup>
        {!props.hideTitle && (
          <ListGroup.Item key={'title'}>
            <TitleText empty={props.artists.length === 0}>
              Personer som skal opptre på dette arrangementet
            </TitleText>
          </ListGroup.Item>
        )}
        {props.artists.map(artist => {
          return (
            <ListGroup.Item key={artist.user_id + Math.random()}>
              <ArtistBar>
                <ArtistImage
                  src={new Buffer(artist.picture).toString('ascii')}
                  alt={artist.name}
                />
                <ArtistNameText>{artist.name}</ArtistNameText>
              </ArtistBar>
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
