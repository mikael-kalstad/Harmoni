import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

import TicketBar from './ticketBar';
import TicketSummary from './ticketSummary';
import Button from '../Button/button';
import InfoDialog from '../infoDialog';

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

let checkCircleStyle = {
  fontSize: 120,
  color: '#82c91e',
  marginTop: 50
};

const TicketMenu = (props: { tickets: ITicket[] }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState(
    new Array(props.tickets.length).fill(0)
  );
  const [displayDialog, setDisplayDialog] = useState(false);

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

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const buyTickets = () => {
    setDisplayDialog(true);
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
        <Button
          backgroundColor={'#47BD29'}
          dropShadow={true}
          onClick={buyTickets}
        >
          Kjøp
        </Button>
      </BuyButtonWrapper>
      {displayDialog && (
        <InfoDialog width="300px" height="200px" closeDialog={closeDialog}>
          <FaCheckCircle style={checkCircleStyle} />
        </InfoDialog>
      )}
    </div>
  );
};

export default TicketMenu;
