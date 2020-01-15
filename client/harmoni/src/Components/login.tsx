import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link, BrowserRouter } from "react-router-dom";
import Button from "./Button/button";
import { loginService } from "../services/loginService";
import TextField from "@material-ui/core/TextField";

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
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 380px;
  height: 530px;
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
  margin-bottom: 30px;
  margin-top: 0;
`;

const StyledLink = styled(props => <Link {...props} />)`
  margin-top: 20px;
  text-align: center;
  display: block;
  color: #687faf;
  text-decoration: underline;

  :visited {
    color: #687faf;
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

const BtnWrapper = styled.div`
  margin-top: 35px;
`;

const LinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

// Login popup dialog component
const Login = (props: any) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [warningText, setWarningText] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  // Used to display error on empty input when submitting
  const [submit, setSubmit] = useState(false);

  // Check inputs and try to log in with the given username and password
  const login = async (username: string, password: string) => {
    // User tries to submit/login, will activate error checks in inputs
    setSubmit(true);

    // Check if inputs are empty
    if (username.trim() === "" || password.trim() === "") {
      setWarningText("Ett eller flere felter er tom");
      return;
    }

    // Show loading while waiting for API
    setLoading(true);

    // Try to log user in
    let res = await loginService.login(username, password);
    console.log("res in LOGIN", res);

    // Network or other errors
    if (res && res instanceof Error) {
      setWarningText("Noe feil skjedde, sjekk internett tilkoblingen");
      setLoading(false);
    }

    // Email/tlf or password is wrong (not authenticated)
    else if (res && res.status === 204) {
      setWarningText("Email eller passord er feil, prøv igjen");
      setLoading(false);
    }

    // Email/tlf and password match, log user in
    else {
      setLoading(false);

      // Redirect user to a certain site
      setRedirect(true);
      props.logIn(username);
    }
  };

  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to Log in if enter key is pressed down
    if (e !== undefined && e.key === "Enter") login(emailInput, passwordInput);
  };

  // Close dialog if overlay is clicked
  let overlay = document.getElementById("overlay");
  if (overlay !== null) overlay.onclick = () => props.toggle();

  // If username and passwords matches
  if (redirect) {
    // Close login popup and overlay
    props.toggle();
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <Overlay onClick={() => props.toggle()} />
      <Container>
        <Exit src="/icons/cross.svg" onClick={() => props.toggle()} />
        <Icon src="/icons/icon.svg" />
        <Title>Harmoni</Title>

        <Wrapper>
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Email*"
            error={(submit && emailInput === "") || warningText !== ""}
            helperText={submit && emailInput === "" ? "Email er påkrevd" : ""}
            onChange={e => setEmailInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />

          <TextField
            style={inputStyle}
            variant="outlined"
            label="Passord*"
            type="password"
            helperText={
              submit && passwordInput === ""
                ? "Passord er påkrevd"
                : warningText !== ""
                ? warningText
                : ""
            }
            error={(submit && passwordInput === "") || warningText !== ""}
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />

          <BtnWrapper>
            <Button
              onClick={() => login(emailInput, passwordInput)}
              loading={loading}
            >
              LOGIN
            </Button>
          </BtnWrapper>

          <LinkWrapper>
            <BrowserRouter>
              <StyledLink
                style={{ justifySelf: "start" }}
                to="/glemt-passord"
                onClick={() => props.toggle()}
              >
                Glemt passord?
              </StyledLink>

              <StyledLink
                style={{ justifySelf: "end" }}
                to="/registrer"
                onClick={() => props.toggle()}
              >
                Registrer deg
              </StyledLink>
            </BrowserRouter>
          </LinkWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
