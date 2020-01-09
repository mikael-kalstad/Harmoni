import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 4vh;
  justify-items: center;
`;

const TicketBar = (props: { name: string; price: number }) => (
  <Bar>
    <p>{props.name}</p>
    <p>{props.price}</p>
  </Bar>
);
export default TicketBar;
