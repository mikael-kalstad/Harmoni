import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
}

interface TicketSummaryProps {
  tickets: ITicket[];
  quantities: any;
  totalPrice: number;
}

const Wrapper = styled.div`
  background-color: #fff1d6;
  padding: 0px 10px;
`;

const SummaryGrid = styled.div`
  display: grid;
  font-family: Arial;
  grid-template-columns: 1fr;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;
`;

const TicketNameText = styled.div`
  font-weight: bold;
`;

const TicketQuantityText = styled.div``;

const TicketPriceText = styled.div`
  justify-self: end;
`;

const TicketSummary = (props: TicketSummaryProps) => {
  return (
    <Wrapper>
      Billetter du har valgt:
      <SummaryGrid>
        {props.tickets.map((ticket: ITicket, i: number) =>
          props.quantities[i] > 0 ? (
            <GridRow>
              <TicketNameText>{ticket.type}</TicketNameText>
              <TicketQuantityText>x{props.quantities[i]}</TicketQuantityText>
              <TicketPriceText>
                {ticket.price * props.quantities[i]},-
              </TicketPriceText>
            </GridRow>
          ) : (
            <></>
          )
        )}
      </SummaryGrid>
    </Wrapper>
  );
};

export default TicketSummary;
