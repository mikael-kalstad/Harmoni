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

    const [price, setPrice] = useState('');
    const [type, setType] = useState('');

    return (
        <>
            <Title>Billetter</Title>
            <h5>Billett-type</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='Billett-type'
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <h5>Pris</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                type="number"
                placeholder='Pris'
                value={type}
                onChange={e => setType(e.target.value)}
            />

            <Button>
                Legg til
            </Button>
        </>
    );
};

export default TicketForm;
