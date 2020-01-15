import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface IBar {
  unavailable: boolean;
}
const Bar = styled.div<IBar>`
  background: ${props => (props.unavailable ? '#f3f3f3' : '#ffffff')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 18px 0;
  display: grid;
  grid-template-columns: 7fr 4fr 3fr;
  font-size: 4vh;
  align-items: center;
  padding: 10px;
  border: 1px solid #cfcfcf;
`;

const QuantityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

const SoldOutText = styled.p`
  font-weight: bold;
  color: #ff3414;
  margin: 0;
`;

interface TicketProps {
  quantities: any;
  ticketIndex: number;
  type: string;
  price: number;
  incrementFunction: Function;
  unavailable: boolean;
}

const TicketBar = (props: TicketProps) => {
  return (
    <Bar unavailable={props.unavailable}>
      <NameText>{props.type}</NameText>
      <PriceText>{props.price + ',-'}</PriceText>
      {props.unavailable ? (
        <QuantityGrid>
          <div></div>
          <SoldOutText>Utsolgt</SoldOutText>
          <div></div>
        </QuantityGrid>
      ) : (
        <QuantityGrid>
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
        </QuantityGrid>
      )}
    </Bar>
  );
};
export default TicketBar;
