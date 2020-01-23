/**
 * Form for program info to an event.
 */

import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const UnderTitle = styled.h5`
  margin-bottom: 20px;
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

interface ProgramProps {
  programText: string;
  setProgramText: Function;
}

const ProgramForm = (props: ProgramProps) => {
  return (
    <>
      <Title>Program</Title>
      <Text>
        Du kan legge til og endre program senere ved å redigere arrangementet i
        min side.
      </Text>

      <UnderTitle>Skriv inn her:</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Program"
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
