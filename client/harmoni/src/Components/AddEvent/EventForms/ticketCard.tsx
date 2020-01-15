import React from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const ImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
`;

const ArtistImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.p`
  font-size: 15px;
  margin: 0 0 0 15px;
  justify-self: start;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 30%;
`;

interface IProps {
  ticket: any;
  remove: Function;
}

const TicketCard = (props: IProps) => (
  <ListGroup.Item>
    <Wrapper>
      <Name>{props.ticket.type}</Name>
      <Name>Pris: {props.ticket.price}</Name>
      <Name>Antall: {props.ticket.available}</Name>

      <DelBtn
        src="/icons/cross.svg"
        onClick={() => props.remove(props.ticket)}
      />
    </Wrapper>
  </ListGroup.Item>
);

export default TicketCard;
