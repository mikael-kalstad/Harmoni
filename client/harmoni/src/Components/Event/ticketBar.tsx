import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Bar = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 12px 0;
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
`;

const QuantityText = styled.p`
  margin: 0 auto;
`;

interface TicketProps {
  name: string;
  price: number;
  addToTotal: Function;
}

const TicketBar = (props: TicketProps) => {
  const [quantity, setQuantity] = useState(0);

  const addToQuantity = (num: number) => {
    setQuantity(Math.max(quantity + num, 0));
    props.addToTotal(props.price * num);
  };
  return (
    <Bar>
      <NameText>{props.name}</NameText>
      <PriceText>{props.price + ',-'}</PriceText>
      <button className="btn" onClick={() => addToQuantity(-1)}>
        <FaMinus />
      </button>

      <QuantityText>{quantity}</QuantityText>
      <button className="btn" onClick={() => addToQuantity(1)}>
        <FaPlus />
      </button>
    </Bar>
  );
};
export default TicketBar;
