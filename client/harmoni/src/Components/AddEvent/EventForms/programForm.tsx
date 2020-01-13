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

interface ProgramProps {
    programText : string;
    setProgramText : Function;
}

const ProgramForm = (props: ProgramProps) => {

    return (
        <>
            <Title>Program:</Title>
            <h5>Skriv inn her:</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='Program'
                id="multiline-static"
                label="Program"
                multiline
                rows="8"
                value={props.programText}
                onChange={e => props.setProgramText(e.target.value)}
            />
        </>
    );
};

export default ProgramForm;
