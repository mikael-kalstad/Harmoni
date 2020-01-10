import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { eventService } from '../../services/EventService';
import { ticketService } from '../../services/TicketService';

import TicketMenu from '../Event/ticketMenu';
import Button from '../Button/button';

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
  ticketId: number;
  eventId: number;
  price: number;
  type: string;
}

const Wrapper = styled.div`
  justify-content: center;
  display: grid;
`;

const EventImage = styled.img`
  border-radius: 10px;
  height: 60vh;
  object-fit: cover;
`;

const DoubleColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const DateText = styled.p`
  color: grey;
`;

const AddressText = styled.p`
  color: grey;
`;

const Title = styled.h1``;

const ContentText = styled.p`
  font-size: 20px;
  width: 50vw;
  color: #535353;
  margin-bottom: 50px;
`;

const BuyButtonWrapper = styled.div`
  width: 35%;
  margin: 20px auto;
`;

const Event = (props: any) => {
  const [eventData, setEventData] = useState<IEvent[]>();
  const [eventTickets, setEventTickets] = useState<ITicket[]>();
  useEffect(() => {
    fetchEvent();
    fetchTickets();
  }, []);

  const fetchEvent = async () => {
    setEventData(await eventService.getEventById(props.match.params.id));
  };

  const fetchTickets = async () => {
    setEventTickets(
      await ticketService.getAllTicketsByEventId(props.match.params.id)
    );
  };

  if (eventData != null && eventTickets != null) {
    return (
      <Wrapper>
        <EventImage
          src="https://i.imgur.com/Glo8oxy.jpg"
          alt={eventData[0].name}
        ></EventImage>
        <DoubleColumnGrid>
          <DateText>{eventData[0].from_date}</DateText>
          <AddressText>{eventData[0].address}</AddressText>
        </DoubleColumnGrid>
        <Title>{eventData[0].name}</Title>
        <ContentText>{eventData[0].information}</ContentText>
        <TicketMenu tickets={eventTickets} />
        <BuyButtonWrapper>
          <Button backgroundColor={'#47BD29'} dropShadow={true}>
            Kjøp
          </Button>
        </BuyButtonWrapper>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

export default Event;
