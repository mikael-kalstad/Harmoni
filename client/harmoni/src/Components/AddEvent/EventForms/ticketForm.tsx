import React, {useState} from 'react';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

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

const TicketForm = (props : any) => {

    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(0);

    function handleChange(newInt : any, setFunc : Function) {
        if (newInt < 0) setFunc(0);
        else setFunc(newInt)
    }

    return (
        <>
            <Title>Billetter</Title>
            <h5>Billett-type</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='(Sitteplass, ståplass, VIP, etc.)'
                //value={newTicket.price}
                //onChange={e => newTicket.setPrice(e.target.value)}
            />

            <h5>Pris</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                type="number"
                placeholder='Pris for kategori'
                value={price}
                onChange={e => handleChange(e.target.value, setPrice)}
            />

            <h5>Antall tilgjengelige</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                type="number"
                placeholder='Antall tilgjengelige plasser i kategori'
                value={available}
                onChange={e => handleChange(e.target.value, setAvailable)}
            />

            <Button>
                Legg til
            </Button>
        </>
    );
};

export default TicketForm;
