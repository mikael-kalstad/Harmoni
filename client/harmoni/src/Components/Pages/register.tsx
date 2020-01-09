import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/button';
import Dropdown from 'react-bootstrap/Dropdown';

const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 400px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin: 50px;
`;

const Input = styled.input`
  display: block;
  margin: 25px auto;
  width: 400px;
  height: 55px;
  border: none;
  background: #efefef;
  font-size: 18px;
  text-indent: 15px;

  :hover {
    filter: brightness(98%);
  }
`;

const WarningText = styled.p`
  color: #e57652;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const Register = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [tlfInput, setTlfInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [type, setType] = useState('Velg type');
    const [warningText, setWarningText] = useState(' ');

    const types = ['Arrangør', 'Artist/Manager', 'Frivillig'];

    let menuItems: JSX.Element[] = [];

    types.forEach(type => {
        menuItems.push(
            <Dropdown.Item 
                onClick={() => setType(type)}
            >{type}</Dropdown.Item>
        );
    });

    // Check if enter key is clicked
    const checkForEnterKey = (e: { key: string; } | undefined) =>  {
        // Try to register if enter key is pressed down
        if (e !== undefined && e.key === 'Enter') 
            register(nameInput, emailInput, tlfInput, type);
    }

    const register = (name: string, email: string, tlf: string, type: string) => {
        // TODO: Do something here...

         // Check if inputs are empty
        if (name === '' || email === '' || type === 'Velg type')
            setWarningText('Please fill out all fields');
        else 
            setWarningText('Email or password is wrong');
    }

    return (
        <>
            <Title>Registrer bruker</Title>
            <Wrapper>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {menuItems}
                    </Dropdown.Menu>
                </Dropdown>

                <Input
                    onChange={e => setNameInput(e.target.value)}
                    value={nameInput}
                    placeholder='Navn'
                    onKeyDown={e => checkForEnterKey(e)}
                />

                <Input 
                    type='email'
                    onChange={e => setEmailInput(e.target.value)}
                    value={emailInput}
                    placeholder='Email'
                    onKeyDown={e => checkForEnterKey(e)}
                />

                <Input
                    onChange={e => setTlfInput(e.target.value)}
                    value={tlfInput}
                    id='tlfInput'
                    placeholder='Telefon (valgfritt)'
                    onKeyDown={e => checkForEnterKey(e)}
                />

                <Input
                    type='password'
                    onChange={e => setPasswordInput(e.target.value)}
                    value={passwordInput}
                    placeholder='Passord'
                    onKeyDown={e => checkForEnterKey(e)}
                />

                <WarningText>{warningText}</WarningText>

                <Button onClick={() => register(nameInput, emailInput, tlfInput, type)}>
                    REGISTRER
                </Button>
            </Wrapper>
        </> 
    );
}

export default Register;
