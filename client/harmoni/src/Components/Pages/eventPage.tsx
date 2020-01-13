import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { eventService } from '../../services/EventService';
import { ticketService } from '../../services/TicketService';
import { userService } from '../../services/UserService';

import TicketMenu from '../Event/ticketMenu';
import ArtistsList from '../Event/artistsList';

interface IEvent {
  event_id: number;
  name: string;
  organizer: number;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: string;
  information: string;
  category: string;
  picture: File;
}

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
}

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
  grid-template-areas:
    'img img artists'
    'info info info'
    'tickets tickets tickets';

  @media screen and (max-width: 800px) {
    grid-template-areas:
      'img img img'
      'info info info'
      'artists artists artists'
      'tickets tickets tickets';
    justify-content: center;
    margin: auto;
  }
`;

const ImageGrid = styled.div`
  grid-area: img;
  @media screen and (max-width: 800px) {
    justify-content: center;
    margin: auto;
  }
`;

const InfoGrid = styled.div`
  grid-area: info;
  margin: 0 20px;
`;

const ArtistsGrid = styled.div`
  grid-area: artists;
`;

const TicketsGrid = styled.div`
  grid-area: tickets;
  width: 70%;
  margin: auto;
`;

const EventImage = styled.img`
  height: 65vh;
  object-fit: cover;

  @media screen and (max-width: 800px) {
    border-radius: 10px;
    height: 40vh;
  }
`;

const DateText = styled.p`
  color: grey;
`;

const AddressText = styled.p`
  color: grey;
  justify-self: end;
`;

const OrganizerText = styled.p``;

const Title = styled.h1``;

const ContentText = styled.p`
  font-size: 20px;
  color: #535353;
  white-space: pre-wrap;
`;

const Event = (props: any) => {
  const [event, setEvent] = useState<IEvent[]>();
  const [eventTickets, setEventTickets] = useState<ITicket[]>();
  const [artists, setArtists] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    fetchEvent();
    fetchTickets();
    fetchArtists();
  }, []);

  const fetchEvent = async () => {
    eventService.getEventById(props.match.params.id).then(fetchedEvent => {
      setEvent(fetchedEvent);
      userService
        .getOrganizerForEvent(fetchedEvent[0].organizer)
        .then(fetchedUser => setUser(fetchedUser));
    });
  };

  const fetchTickets = async () => {
    setEventTickets(
      await ticketService.getAllTicketsByEventId(props.match.params.id)
    );
  };

  const fetchArtists = async () => {
    setArtists(await userService.getArtistsForEvent(props.match.params.id));
  };

  if (event != null && eventTickets != null && user != null) {
    return (
      <Wrapper>
        <ImageGrid>
          <EventImage
            src="https://i.imgur.com/Glo8oxy.jpg"
            alt={event[0].name}
          ></EventImage>
        </ImageGrid>
        <InfoGrid>
          <DateText>{event[0].from_date}</DateText>
          <AddressText>{event[0].address}</AddressText>
          <Title>{event[0].name}</Title>
          <OrganizerText>Arrangør: {user[0].name}</OrganizerText>
          <ContentText>{event[0].information}</ContentText>
        </InfoGrid>
        <ArtistsGrid>
          <ArtistsList artists={artists} />
        </ArtistsGrid>
        <TicketsGrid>
          <TicketMenu tickets={eventTickets} />
        </TicketsGrid>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

export default Event;
