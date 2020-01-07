import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

const Container = styled.div`
    z-index: 10000;
    position: fixed;
    margin: auto;
    left: 0; right: 0; top: 0; bottom: 0;
    width: 367px;
    height: 491px;
    border-radius: 5px;
    background: white;
`;

const Icon = styled.img`
    padding-top: 30px;
    display: block;
    margin: 0 auto;
    height: 32px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 50px;
    margin-top: 0;
`;

const Button = styled.button`
    display: block;
    margin: auto;
    outline: none;
    border: none;
    height: 50px;
    width: 70%;
    background: #2A57AD;
    color: white;
    font-size: 16px;
    margin-top: 50px;
    cursor: pointer;

    :hover {
        filter: brightness(90%);
    }

    
    :active {
        filter: brightness(95%);
    }
`;

const Input = styled.input`
    display: block;
    margin: 25px auto;
    width: 70%;
    height: 50px;
    border: none;
    background: #EFEFEF;
    font-size: 18px;
    text-indent: 15px;
    /* color: #868686; */

    :hover {
        filter: brightness(98%);
    }
`;

const StyledLink = styled(props => <Link {...props} />)`
    margin-top: 20px;
    text-align: center;
    display: block;
    color: #868686;
    text-decoration: underline;

    :visited {
        color: #868686;
    }

    :hover {
        color: black;
    }
`;

const Exit = styled.img`
    height: 15px;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
`;

const WarningText = styled.p`
    position: absolute;
    margin: auto;
    left: 0; right: 0;
    color: #E57652;
    bottom: 180px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
`;

// Login popup dialog component
const Login = (props: { toggle: () => void; }) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [warningText, setWarningText] = useState('');

    // Check inputs and try to log in with the given username and password
    const login = (username: string, password: string) => {
        
        // Check if inputs are empty
        if (username === '' || password === '')
            setWarningText('Please fill out all fields');
        else if (username === 'hello' && password === '123')
            setRedirect(true);
        else 
            setWarningText('Email or password is wrong');
    }

    // Check if enter key is clicked
    const checkForEnterKey = (e: { key: string; } | undefined) =>  {
        // Try to Log in if enter key is pressed down
        if (e !== undefined && e.key === 'Enter') 
            login(emailInput, passwordInput);
    }

    // Close dialog if overlay is clicked
    let overlay = document.getElementById('overlay');
    if (overlay !== null)
        overlay.onclick = () => props.toggle();

    // If username and passwords matches
    if (redirect) {
        // Close login popup and overlay
        props.toggle();
        return <Redirect to='/profile'/> 
    }

    return (
        <Container>
            <Exit src='/icons/cross.svg' onClick={() => props.toggle()} />
            <Icon src='/icons/icon.svg' />
            <Title>Harmoni</Title>

            <Input 
                type='email'
                onChange={e => setEmailInput(e.target.value)}
                value={emailInput}
                placeholder='Email eller tlf'
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
            
            <Button onClick={() => login(emailInput, passwordInput)}>LOGIN</Button>

            <StyledLink to="/register">Registrer deg</StyledLink>
        </Container>
    );
}

export default Login;