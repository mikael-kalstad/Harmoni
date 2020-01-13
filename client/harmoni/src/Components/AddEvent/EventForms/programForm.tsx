import React from 'react';
import styled from "styled-components";
import {Button} from "react-bootstrap";

const Input = styled.input`
  display: block;
  width: 400px;
  height: 300px;
  border: none;
  background: #efefef;
  font-size: 18px;
  text-indent: 15px;

  :hover {
    filter: brightness(98%);
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const ProgramForm = () => {

    return (
        <>
            <Title>Program</Title>
            <h5>Skriv inn programmet her</h5>
            <Input
                placeholder='program'
            />
            <Button>Legg til</Button>
        </>
    );
};

export default ProgramForm;
