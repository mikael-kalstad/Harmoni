import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TicketBar from './ticketBar';
import TicketSummary from './ticketSummary';
import { ticketService } from '../../services/TicketService';

interface ITicket {
  ticketId: number;
  eventId: number;
  price: number;
  type: string;
}

const TotalSumText = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const TotalSumValueText = styled.label`
  color: #47bd29;
`;

const TicketMenu = (props: { tickets: ITicket[] }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState(
    new Array(props.tickets.length).fill(0)
  );
  const incrementQuantityOfTicket = (index: number, num: number) => {
    setQuantities(
      quantities.map((val, i) => (i == index ? Math.max(val + num, 0) : val))
    );
  };

  useEffect(() => {
    updateTotalPrice();
  }, quantities);

  const updateTotalPrice = () => {
    setTotalPrice(
      props.tickets.reduce(
        (sum, ticket, i) => sum + ticket.price * quantities[i],
        0
      )
    );
  };

  const getChosenTickets = () => {
    return props.tickets.filter((ticket, i) => quantities[i] != 0);
  };
  return (
    <div>
      <h3>Billetter</h3>
      {props.tickets.map((ticket, index) => (
        <TicketBar
          quantities={quantities}
          ticketIndex={index}
          name={ticket.type}
          price={ticket.price}
          incrementFunction={incrementQuantityOfTicket}
          key={ticket.type}
        />
      ))}
      <TicketSummary
        tickets={props.tickets}
        quantities={quantities}
        totalPrice={totalPrice}
      />
      <TotalSumText>
        Total pris: <TotalSumValueText>{totalPrice + ',-'}</TotalSumValueText>
      </TotalSumText>
    </div>
  );
};

export default TicketMenu;
