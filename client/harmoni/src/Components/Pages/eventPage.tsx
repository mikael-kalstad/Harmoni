import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { ListGroup } from 'react-bootstrap';

import { eventService } from '../../services/EventService';
import { ticketService } from '../../services/TicketService';
import { userService } from '../../services/UserService';

import TicketMenu from '../Event/ticketMenu';
import ArtistsList from '../Event/artistsList';
import MapContainer from '../Event/Map';

export interface IEvent {
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
  picture: string;
}

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
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
  grid-template-columns: 1fr;
  @media screen and (max-width: 800px) {
    justify-content: center;
    margin: auto 30px;
  }
`;

const ImageGrid = styled.div`
  justify-items: center;

  @media screen and (max-width: 800px) {
    margin: auto;
    margin-top: 10px;
    width: 70%;
  }
`;

const InfoGrid = styled.div`
  margin: 0 20px;
`;

const ArtistsAndMapGrid = styled.div`
  display: grid;
  margin: 20px 20px;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const ArtistsGrid = styled.div`
  justify-self: start;
  border-radius: 10px;
  height: 100%;
  @media screen and (max-width: 800px) {
    justify-self: center;
  }
`;

const MapGrid = styled.div`
  border: solid;
  width: 350px;
  height: 350px;
`;

const TicketsGrid = styled.div`
  width: 70%;
  margin: auto;
`;

const EventImage = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  @media screen and (max-width: 800px) {
    height: 40vh;
    justify-self: center;
    border-radius: 10px;
  }
`;

const DoubleColumnGrid = styled.div`
  margin: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const DateText = styled.p``;

const AddressText = styled.p``;

const OrganizerText = styled.p``;

const Title = styled.h1``;

const ContentText = styled.p`
  font-size: 20px;
  color: #535353;
  white-space: pre-wrap;
`;
const Event = (props: { match: { params: { id: number } } }) => {
  const [event, setEvent] = useState<IEvent[]>();
  const [eventTickets, setEventTickets] = useState<ITicket[]>();
  const [artists, setArtists] = useState<IUser[]>();
  const [organizer, setOrganizer] = useState();

  useEffect(() => {
    fetchEvent();
    fetchTickets();
    fetchArtists();
    fetchOrganizer();
  }, []);

  const fetchEvent = async () => {
    setEvent(await eventService.getEventById(props.match.params.id));
  };

  const fetchTickets = async () => {
    setEventTickets(
      await ticketService.getAllTicketsByEventId(props.match.params.id)
    );
  };

  const fetchArtists = async () => {
    setArtists(await userService.getArtistsForEvent(props.match.params.id));
  };

  const fetchOrganizer = async () => {
    setOrganizer(await userService.getOrganizerForEvent(props.match.params.id));
  };

  if (
    event != null &&
    eventTickets != null &&
    organizer != null &&
    artists != null
  ) {
    let dateFrom = event[0].from_date.split(' ');
    let dateTo = event[0].to_date.split(' ');
    return (
      <Wrapper>
        <ImageGrid>
          <EventImage
            src={new Buffer(event[0].picture).toString('ascii')}
            alt={event[0].name}
          ></EventImage>
        </ImageGrid>
        <InfoGrid>
          <Title>{event[0].name}</Title>
          <OrganizerText>
            <BoldSpan>Arrangør: </BoldSpan>
            {organizer[0].name}
          </OrganizerText>
          <DateText>
            <BoldSpan>Tid: </BoldSpan>
            {dateFrom[0] === dateTo[0]
              ? dateFrom[0] + ', fra kl. ' + dateFrom[1] + ' til ' + dateTo[1]
              : 'Fra: ' +
                dateFrom[0] +
                ' kl. ' +
                dateFrom[1] +
                ' til ' +
                dateTo[0] +
                ' kl. ' +
                dateTo[1]}
          </DateText>
          <AddressText>
            <BoldSpan>Sted: </BoldSpan>
            {event[0].address}
          </AddressText>
          <ContentText>
            {event[0].information === ''
              ? 'Arrangementet har ingen beskrivelse eller program'
              : event[0].information}
          </ContentText>
        </InfoGrid>
        <ArtistsAndMapGrid>
          <ArtistsGrid>
            <ArtistsList artists={artists} />
          </ArtistsGrid>
          <MapGrid>
            <MapContainer />
          </MapGrid>
        </ArtistsAndMapGrid>
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
