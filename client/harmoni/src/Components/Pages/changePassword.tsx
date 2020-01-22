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

const PasswordWarning = styled.p`
  font-size: 18px;
  color: #d45951;
  margin: 20px 0;
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


  function passwordValidation(thePassword: string) {
    var count = 0;
    count += /[a-z]/.test(thePassword) ? 1 : 0;
    count += /[A-Z]/.test(thePassword) ? 1 : 0;
    count += /[@]/.test(thePassword) ? 1 : 0;
    count += /[0-9]/.test(thePassword) ? 1 : 0;
    if (count >= 2 &&counter(thePassword)>5) {
      return true;
    } else if (count < 2) return false;
  }

  function counter(string) {
    var count = 0;
    if (string) {
      string.split("").forEach(function() {
        count ? count++ : (count = 1);
      });
    }
    return count;
  }

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

      if (password.trim() === "" ||
      confirmedPassword.trim() === "" ||
      !passwordValidation(passwordInput) || 
      !passwordValidation(confirmPassword) ) {
        return;
      } else if (password === confirmedPassword) {
        userService.changePassword(
          props.userData.email,
          passwordInput,
          oldPassword
        );
        setRedirect(true);
      } else {
        setPasswordWarning("Passordene må være like");
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
          <PasswordWarning>{oldPasswordWarning}</PasswordWarning>
          <br></br>
          <br></br>
          <p>Nytt passord:</p>
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Skriv inn nytt passord her"
            type="password"
            error={
              (submit && passwordInput === "") ||
              (submit && !passwordValidation(passwordInput)) ||
              (submit && counter(passwordInput) > 45)
            }
            helperText={
              submit && passwordInput === ""
                ? "Passord er påkrevd"
                : submit && !passwordValidation(passwordInput)
                ? "Passordet må innholde minst 6 tegn, og det må innholde minst to av følgende: en liten bokstav, en stor bokstav, et tall,  et symbol (for eksempel '&')"
                : submit && counter(passwordInput) > 45
                ? "passordet kan ikke være flere enn 45 bokstaver"
                : ""
            }
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
          <TextField
            style={inputStyle}
            variant="outlined"
            label="Skriv inn det nye passordet igjen"
            type="password"
            error={(submit && confirmPassword === "") || warningText !== ""}
            helperText={
             submit && confirmPassword === ""
                ? "Passord er påkrevd"
                : submit && !passwordValidation(confirmPassword)
                ? "Passordet må innholde minst 6 tegn, og det må innholde minst to av følgende: en liten bokstav, en stor bokstav, et tall,  et symbol (for eksempel '&')"
                : submit && counter(confirmPassword) > 45
                ? "passordet kan ikke være flere enn 45 bokstaver"
                : ""
            }
            onChange={e => setConfirmPassword(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
          <PasswordWarning>{passwordWarning}</PasswordWarning>

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
