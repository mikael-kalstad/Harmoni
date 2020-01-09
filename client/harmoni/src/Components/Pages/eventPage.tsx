import React, { useState } from 'react';
import styled from 'styled-components';

import TicketBar from '../Event/ticketBar';
import Button from '../Button/button';

let data = {
  id: 1234,
  category: 'Konsert',
  title: 'Rihanna i Oslo Spektrum',
  summary:
    'Kom og se rihanna live i Januar 2020. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris nunc congue nisi vitae suscipit tellus mauris a. Aliquet sagittis id consectetur purus. Nulla pharetra diam sit amet nisl suscipit. Iaculis eu non diam phasellus vestibulum lorem',
  img: '/icons/test.jpg'
};

let tickets = [
  {
    name: 'Premium VIP Circle',
    price: 19000
  },
  {
    name: 'Meet & Greet & Hamburger',
    price: 2000
  },
  {
    name: 'Ståplass',
    price: 10
  }
];

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

const Event = (props: any) => {
  const [price, setPrice] = useState(0);
  const setTotalPrice = (sum: number) => {
    setPrice(price + sum);
  };
  return (
    <Wrapper>
      <EventImage src="https://i.imgur.com/Glo8oxy.jpg"></EventImage>
      <DoubleColumnGrid>
        <DateText>Mandag, 10.februar 2020, 20:00</DateText>
        <AddressText>Oslo Spektrum</AddressText>
      </DoubleColumnGrid>
      <Title>Jahn Teigen sine siste hits</Title>
      <ContentText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mauris nunc congue
        nisi vitae suscipit tellus mauris a. Aliquet sagittis id consectetur
        purus. Nulla pharetra diam sit amet nisl suscipit. Iaculis eu non diam
        phasellus vestibulum lorem
      </ContentText>
      <h3>Billetter</h3>
      {tickets.map(ticket => (
        <TicketBar
          name={ticket.name}
          price={ticket.price}
          addToTotal={setTotalPrice}
        />
      ))}
      <TotalSumText>
        Total sum: <TotalSumValueText>{price + ',-'}</TotalSumValueText>
      </TotalSumText>
      <BuyButtonWrapper>
        <Button backgroundColor={'#47BD29'} dropShadow={true}>
          Kjøp
        </Button>
      </BuyButtonWrapper>
    </Wrapper>
  );
};

export default Event;
