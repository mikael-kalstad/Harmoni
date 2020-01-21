import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface IBar {
  unavailable: boolean;
}
const Bar = styled.div<IBar>`
  background-color: ${props => (props.unavailable ? '#f3f3f3' : '#ffffff')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 18px 0;
  display: grid;
  grid-template-columns: 7fr 4fr 3fr;
  font-size: 4vh;
  align-items: center;
  padding: 10px;
  border: 1px solid #dfdfdf;
  @media screen and (max-width: 650px) {
    font-size: 4.5vw;
  }
`;

const QuantityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

interface IPriceText {
  unavailable: boolean;
}
const PriceText = styled.p<IPriceText>`
  font-weight: bold;
  color: ${props => (props.unavailable ? 'grey' : '#47bd29')};
  margin: 0;
`;

const NameText = styled.p`
  margin: 0;
  padding-right: 10px;
  max-width: 30vw;
`;

const QuantityText = styled.p`
  margin: auto;
`;

const SoldOutText = styled.p`
  font-weight: bold;
  color: #e74c3c;
  margin: 0;
  grid-column: 1 / span 3;
  justify-self: center;
  @media screen and (max-width: 850px) {
    font-size: 2.5vw;
  }
`;

const FaIconStyle = {
  color: '#434343',
  fontSize: '130%'
};

interface TicketProps {
  quantities: any;
  ticketIndex: number;
  type: string;
  price: number;
  incrementFunction: Function;
  unavailable: boolean;
  eventCanceled: boolean;
}

const TicketBar = (props: TicketProps) => {
  return (
    <Bar unavailable={props.unavailable || props.eventCanceled}>
      <NameText>{props.type}</NameText>
      <PriceText unavailable={props.unavailable || props.eventCanceled}>
        {props.price + ',-'}
      </PriceText>
      {props.unavailable || props.eventCanceled ? (
        <QuantityGrid>
          <SoldOutText>
            {props.eventCanceled ? 'Utilgjengelig' : 'Utsolgt'}
          </SoldOutText>
        </QuantityGrid>
      ) : (
        <QuantityGrid>
          <button
            className="btn"
            onClick={() => {
              props.incrementFunction(props.ticketIndex, -1);
            }}
          >
            <FaMinus style={FaIconStyle} />
          </button>

          <QuantityText>{props.quantities[props.ticketIndex]}</QuantityText>
          <button
            className="btn"
            onClick={() => {
              props.incrementFunction(props.ticketIndex, 1);
            }}
          >
            <FaPlus style={FaIconStyle} />
          </button>
        </QuantityGrid>
      )}
    </Bar>
  );
};
export default TicketBar;
