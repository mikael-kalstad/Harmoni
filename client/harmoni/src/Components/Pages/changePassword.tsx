import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "../Button/button";
import BackBtn from "../Button/backBtn";
import { loginService } from "../../services/loginService";
import { userService } from "../../services/UserService";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  margin: 60px auto 0 auto;
  width: 400px;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 80px auto;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin: 50px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8a8a8a;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Text2 = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: red;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const BtnWrapper = styled.div`
  margin-top: 65px;
`;
// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

const ChangePassword = (props: { userData?: any; logIn?: Function }) => {
  // Password is to short or input is empty
  const [passwordWarning, setPasswordWarning] = useState("");
  const [oldPasswordWarning, setOldPasswordWarning] = useState("");
  // Used to display error on empty input when submitting
  const [redirect, setRedirect] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningText, setWarningText] = useState("");

  // Check inputs and try to reset password given email
  const resetPassword = async (
    oldPassword: string,
    password: string,
    confirmedPassword: string
  ) => {
    // User tries to submit/login, will activate error checks in inputs
    setSubmit(true);
    // Check password
    let res = await loginService.login(props.userData.email, oldPassword);
    //Password is wrong (not authenticated)
    if (res && res.status === 204) {
      setOldPasswordWarning("Gammelt passord er feil, prøv igjen");
      return;
    } else {
      // Check if input is empty
      setOldPasswordWarning("");
      if (password.trim() === "" || confirmedPassword.trim() === "") {
        setPasswordWarning("Ett eller flere felter er tom");
        return;
      } else if (password === confirmedPassword) {
        userService.changePassword(
          props.userData.email,
          passwordInput,
          oldPassword
        );
        setRedirect(true);
      } else {
        setWarningText("Passordene må være like");
      }
    }
  };
  if (redirect) {
    return <Redirect to="/profile" />;
  }
  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to reset password if enter key is pressed down
    if (e !== undefined && e.key === "Enter")
      resetPassword(oldPassword, passwordInput, confirmPassword);
  };
  return (
    <>
      <Wrapper>
        <BackBtn to="/profile" />
        <Title>Endre passord</Title>
        <Container>
          <Text> Du kan registrere nytt passord her for å logge inn på</Text>
          <p>Gammelt passord:</p>
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Skriv inn ditt gamle passord her"
            type="password"
            error={(submit && passwordInput === "") || warningText !== ""}
            helperText={
              submit && passwordInput === "" ? "Passord er påkrevd" : ""
            }
            onChange={e => setOldPassword(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
          <Text2>{oldPasswordWarning}</Text2>
          <br></br>
          <br></br>
          <p>Nytt passord:</p>
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Skriv inn nytt passord her"
            type="password"
            error={(submit && passwordInput === "") || warningText !== ""}
            helperText={
              submit && passwordInput === "" ? "Passord er påkrevd" : ""
            }
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Skriv inn det nye passordet igjen"
            type="password"
            error={(submit && passwordInput === "") || warningText !== ""}
            helperText={
              submit && passwordInput === ""
                ? "confirmed passord er påkrevd"
                : warningText !== ""
                ? warningText
                : ""
            }
            onChange={e => setConfirmPassword(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
          <Text>{passwordWarning}</Text>

          <BtnWrapper>
            <Button
              onClick={() =>
                resetPassword(oldPassword, passwordInput, confirmPassword)
              }
            >
              Endre passord
            </Button>
          </BtnWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default ChangePassword;
