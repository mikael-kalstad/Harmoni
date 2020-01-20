import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { isEventInProgress, hasEventHappened } from '../utils';
import { eventService } from '../../services/EventService';
import { ticketService } from '../../services/TicketService';
import { userService } from '../../services/UserService';
import { geoService } from '../../services/GeoService';

import TicketMenu from '../Event/ticketMenu';
import ArtistsList from '../Event/artistsList';
import Map from '../Event/map';

export interface IEvent {
  event_id: number;
  name: string;
  organizer: number;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: number;
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
    width: 90%;
  }
`;

const InfoGrid = styled.div`
  margin: 0 40px;
`;

const ArtistsAndMapGrid = styled.div`
  display: grid;
  margin: 20px 40px;
  grid-gap: 30px;
  min-height: 450px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const ArtistsGrid = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  justify-self: start;
  border-radius: 10px;
  height: 100%;

  @media screen and (max-width: 800px) {
    justify-self: center;
  }
`;

const MapGrid = styled.div`
  display: grid;
  border: solid;
  min-height: 300px;
  width: 100%;
  height: 100%;
  margin: 0;
  align-items: center;
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

const BoldSpan = styled.span`
  font-weight: bold;
`;

const DateText = styled.p``;

const AddressText = styled.p``;

const OrganizerText = styled.p``;

const Title = styled.h1``;

interface IStatusSpan {
  color: string;
}

const StatusSpan = styled.span<IStatusSpan>`
  color: ${props => props.color};
`;

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
  const [coords, setCoords] = useState();
  let statuses = ['Kommende', 'Arkivert', 'Avlyst'];

  useEffect(() => {
    const fetchEvent = async () => {
      eventService.getEventById(props.match.params.id).then(data => {
        setEvent(data);
        fetchCoords(data[0].address);
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

    const fetchOrganizer = async () => {
      setOrganizer(
        await userService.getOrganizerForEvent(props.match.params.id)
      );
    };

    const fetchCoords = async (address: string) => {
      geoService.getLatAndLndOfAddress(address).then(data => {
        console.log(data);

        setCoords({ lat: data[0], lng: data[1] });
      });
    };

    fetchEvent();
    fetchTickets();
    fetchArtists();
    fetchOrganizer();
  }, [props.match.params.id]);

  if (
    event != null &&
    eventTickets != null &&
    organizer != null &&
    artists != null
  ) {
    let dateFrom = event[0].from_date.split(' ');
    let dateTo = event[0].to_date.split(' ');
    let inProgress = isEventInProgress(event[0].from_date, event[0].to_date);
    let finished = hasEventHappened(event[0].to_date);

    let status = inProgress ? 'Pågående' : statuses[event[0].status];
    return (
      <Wrapper>
        <ImageGrid>
          <EventImage
            src={new Buffer(event[0].picture).toString('ascii')}
            alt={event[0].name}
          ></EventImage>
        </ImageGrid>
        <InfoGrid>
          <Title>
            {event[0].name}{' '}
            {status === 'Pågående' ? (
              <>
                {' - '} <StatusSpan color="#448b30">{status}</StatusSpan>
              </>
            ) : status == 'Avlyst' || finished ? (
              <>
                {' - '}{' '}
                <StatusSpan color="#c7554f">
                  {finished ? 'Ferdig' : status}
                </StatusSpan>
              </>
            ) : (
              <></>
            )}
          </Title>
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
          <MapGrid>{coords && <Map coords={coords} zoom={14} />}</MapGrid>
        </ArtistsAndMapGrid>
        <TicketsGrid>
          <TicketMenu
            tickets={eventTickets}
            canceled={
              event[0].status == 2 || hasEventHappened(event[0].to_date)
            }
          />
        </TicketsGrid>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

export default Event;
