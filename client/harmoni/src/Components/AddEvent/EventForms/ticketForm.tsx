/**
 * Form page for ticket input in add event
 *
 * Tickets can be added to a local list. The tickets can only be deleted when creating the ticket.
 * If an event is already created with tickets, these tickets cannot be changed or deleteed.
 * This is to prevent an organizer from creating tickets, selling them, and then deleting them from the event.
 */

import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { ListGroup } from "react-bootstrap";
import TicketCard from "./ticketCard";
import Btn from "../../Button/button";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
`;
const UnderTitle = styled.h3`
  font-size: 24px;
  margin: 50px 0 20px 0;
`;
const inputStyle = {
  width: "100%",
  marginBottom: "25px"
};

const Text = styled.p`
  margin: 45px 0;
  font-size: 16px;
  font-weight: 400;
  color: #777777;
`;

const WarningText = styled.p`
  margin: 45px 0;
  font-size: 16px;
  font-weight: 700;
`;

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

const TicketForm = (props: any) => {
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState();
  const [submit, setSubmit] = useState<boolean>(false);

  // Number inputs should not be able to be negative in this form
  function handleChange(newInt: any, setFunc: Function) {
    if (newInt < 0) setFunc(0);
    else setFunc(newInt);
  }

  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to Log in if enter key is pressed down
    if (e !== undefined && e.key === "Enter") addTicket();
  };

  const isInputsEmpty = () => {
    return type === "" || price === undefined || available === undefined;
  };

  // Add tickets to local list
  const addTicket = () => {
    setSubmit(true);
    if (isInputsEmpty()) return;

    let newTicket: ITicket = {
      ticket_id: undefined,
      event_id: undefined,
      price: price,
      type: type,
      available: available
    };

    props.setListOfTickets(array => [...array, newTicket]);

    setSubmit(false);

    // Clear inputs
    setType("");
    setPrice("");
    setAvailable("");
  };

  // Delete ticket from local list
  const deleteTicket = ticket => {
    if (ticket != null) {
      props.setListOfTickets(
        props.listOfTickets.filter(u => u.type !== ticket.type)
      );
    }
  };

  // Add all tickets to render
  let ticketArr: JSX.Element[] = [];

  for (let i = 0; i < props.listOfTickets.length; i++) {
    let t = props.listOfTickets[i];

    ticketArr.push(
      <TicketCard
        key={i}
        ticket={t}
        remove={deleteTicket}
        disabled={t.ticket_id !== undefined}
      />
    );
  }

  return (
    <>
      <Title>Billetter</Title>
      <Text>
        Du kan legge til billetter senere ved å redigere arrangementet i min
        side.
      </Text>

      <WarningText>
        OBS! Du kan ikke endre eller slette billetter som allerede er lagd når
        du oppretter et arrangement.
      </WarningText>

      <h5>Billett-type</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="(Sitteplass, ståplass, VIP, etc.)"
        value={type}
        error={submit && type === ""}
        helperText={
          submit && type === ""
            ? "Type er påkrevd for billett"
            : "Maks 45 karakterer"
        }
        onChange={e =>
          e.target.value.length <= 45
            ? handleChange(e.target.value, setType)
            : null
        }
        onKeyDown={e => checkForEnterKey(e)}
      />

      <h5>Pris per billett</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        placeholder="Pris for kategori"
        error={submit && price === undefined}
        helperText={
          submit && price === undefined && "Pris er påkrevd for billett"
        }
        value={price}
        onChange={e =>
          e.target.value === ""
            ? handleChange(e.target.value, setPrice)
            : Number.parseInt(e.target.value) <= 2147483647
            ? handleChange(e.target.value, setPrice)
            : null
        }
        onKeyDown={e => checkForEnterKey(e)}
      />

      <h5>Total antall</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        helperText={
          submit && available === undefined && "Kategori er påkrevd for billett"
        }
        placeholder="Antall tilgjengelige plasser i kategori"
        error={submit && available === undefined}
        value={available}
        onChange={e =>
          e.target.value === ""
            ? handleChange(e.target.value, setAvailable)
            : Number.parseInt(e.target.value) <= 2147483647
            ? handleChange(e.target.value, setAvailable)
            : null
        }
        onKeyDown={e => checkForEnterKey(e)}
      />

      <Btn onClick={() => addTicket()}>Legg til</Btn>

      {props.listOfTickets && props.listOfTickets.length !== 0 && (
        <UnderTitle>Billettliste:</UnderTitle>
      )}

      <ListGroup>{ticketArr}</ListGroup>
    </>
  );
};

export default TicketForm;
