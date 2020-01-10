import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import Button from './Button/button';
import { loginService } from '../services/loginService';

const Overlay = styled.div` 
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

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

const Wrapper = styled.div`
    width: 70%;
    margin: auto;
`;

const Icon = styled.img`
    padding-top: 30px;
    display: block;
    margin: 0 auto;
    width: 32px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 50px;
    margin-top: 0;
`;

const Input = styled.input`
    display: block;
    margin: 25px 0;
    width: 100%;
    height: 50px;
    border: none;
    background: #EFEFEF;
    font-size: 18px;
    text-indent: 15px;

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
    margin: 10px auto;
    left: 0; right: 0;
    color: #E57652;
    bottom: 180px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
`;

// Login popup dialog component
const Login = (props: any) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [warningText, setWarningText] = useState('');

    // Check inputs and try to log in with the given username and password
    const login = async(username: string, password: string) => {
        // // Check if inputs are empty
        if (username.trim() === '' || password.trim() === '') {
            setWarningText('Ett eller flere felter er tom');
            return;
        }

        let res = await loginService.login(username, password)
        
        if (res && res.status !== 401) {
            setRedirect(true);
            props.logIn(username);
        }
        else 
            setWarningText('Email eller passord er feil, prøv igjen');
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
        <>
            <Overlay onClick={() => props.toggle()}/>
            <Container>
                <Exit src='/icons/cross.svg' onClick={() => props.toggle()} />
                <Icon src='/icons/icon.svg' />
                <Title>Harmoni</Title>

                <Wrapper>
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

                    <StyledLink to="/registrer" onClick={() => props.toggle()}>Registrer deg</StyledLink>
                </Wrapper>
            </Container>
        </>
    );
}

export default Login;