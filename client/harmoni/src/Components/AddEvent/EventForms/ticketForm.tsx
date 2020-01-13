import React from 'react';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const inputStyle = {
    width: '100%',
    marginBottom: '25px'
};

interface TicketProps {
    ticketCategory : string;
    setTicketCategory: Function;
    price : string;
    setPrice : Function;
}

const TicketForm = (props: TicketProps) => {

    return (
        <>
            <Title>Billetter</Title>
            <h5>Billett-type</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='Billett-type'
                value={props.ticketCategory}
                onChange={e => props.setTicketCategory(e.target.value)}
            />

            <h5>Pris</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                type="number"
                placeholder='Pris'
                value={props.price}
                onChange={e => props.setPrice(e.target.value)}
            />
        </>
    );
};

export default TicketForm;
