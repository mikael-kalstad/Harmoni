import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TicketBar from './ticketBar';
import TicketSummary from './ticketSummary';
import Button from '../Button/button';

interface ITicket {
  ticket_id: number;
  event_id: number;
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

const BuyButtonWrapper = styled.div`
  width: 35%;
  margin: 20px auto;
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
      <BuyButtonWrapper>
        <Button backgroundColor={'#47BD29'} dropShadow={true}>
          Kjøp
        </Button>
      </BuyButtonWrapper>
    </div>
  );
};

export default TicketMenu;
