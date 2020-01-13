import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Bar = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 18px 0;
  display: grid;
  grid-template-columns: 7fr 4fr 1fr 1fr 1fr;
  font-size: 4vh;
  align-items: center;
  padding: 10px;
  border: 1px solid #cfcfcf;
`;

const PriceText = styled.p`
  font-weight: bold;
  color: #47bd29;
  margin: 0;
`;

const NameText = styled.p`
  margin: 0;
  padding-right: 10px;
  max-width: 30vw;
`;

const QuantityText = styled.p`
  margin: 0 auto;
`;

interface TicketProps {
  quantities: any;
  ticketIndex: number;
  name: string;
  price: number;
  incrementFunction: Function;
}

const TicketBar = (props: TicketProps) => {
  return (
    <Bar>
      <NameText>{props.name}</NameText>
      <PriceText>{props.price + ',-'}</PriceText>
      <button
        className="btn"
        onClick={() => {
          props.incrementFunction(props.ticketIndex, -1);
        }}
      >
        <FaMinus />
      </button>

      <QuantityText>{props.quantities[props.ticketIndex]}</QuantityText>
      <button
        className="btn"
        onClick={() => {
          props.incrementFunction(props.ticketIndex, 1);
        }}
      >
        <FaPlus />
      </button>
    </Bar>
  );
};
export default TicketBar;
