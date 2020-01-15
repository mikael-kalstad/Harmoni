import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import TicketCard from "./ticketCard";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;
const UnderTitle = styled.h3`
  font-size: 24px;
  margin: 50px 0 20px 0;
`;
const inputStyle = {
  width: "100%",
  marginBottom: "25px"
};

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}
var tempId = 1;
const TicketForm = (props: any) => {
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(0);

  function handleChange(newInt: any, setFunc: Function) {
    if (newInt < 0) setFunc(0);
    else setFunc(newInt);
  }

  const addTicket = () => {
    let s: ITicket = {
      ticket_id: tempId,
      event_id: tempId,
      price: -1,
      type: "",
      available: -1
    };

    if (s !== null) {
      tempId = tempId + 1;
      s.type = type;
      s.price = price;
      s.available = available;
      props.setListOfTickets(array => [...array, s]);
      console.log("listTickets", props.listOfTickets);
    }
  };

  const deleteTicket = ticket => {
    if (ticket != null) {
      props.setListOfTickets(
        props.listOfTickets.filter(u => u.ticket_id !== ticket.ticket_id)
      );
    }
  };

  return (
    <>
      <Title>Billetter</Title>
      <h5>Billett-type</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="(Sitteplass, ståplass, VIP, etc.)"
        value={type}
        onChange={e => handleChange(e.target.value, setType)}
      />

      <h5>Pris</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        placeholder="Pris for kategori"
        value={price}
        onChange={e => handleChange(e.target.value, setPrice)}
      />

      <h5>Antall tilgjengelige</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        placeholder="Antall tilgjengelige plasser i kategori"
        value={available}
        onChange={e => handleChange(e.target.value, setAvailable)}
      />

      <Button onClick={() => addTicket()}>Legg til</Button>

      {props.listOfTickets && props.listOfTickets.length !== 0 && (
        <UnderTitle>Billettliste:</UnderTitle>
      )}

      <ListGroup>
        {props.listOfTickets &&
          props.listOfTickets.map(u => (
            <TicketCard ticket={u} remove={deleteTicket} />
          ))}
      </ListGroup>
    </>
  );
};

export default TicketForm;
