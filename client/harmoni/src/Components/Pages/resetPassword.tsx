import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "../Button/button";
import { passwordService } from "../../services/PasswordService";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  margin: 60px auto 0 auto;
  width: 400px;
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

const BtnWrapper = styled.div`
  margin-top: 65px;
`;
// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

const ResetPassword = (props: any) => {
  // Password is to short or input is empty
  const [passwordWarning, setPasswordWarning] = useState("");
  // Used to display error on empty input when submitting
  const [redirect, setRedirect] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningText, setWarningText] = useState("");


  function passwordValidation(thePassword: string) {
    var count = 0;
    count += /[a-z]/.test(thePassword) ? 1 : 0;
    count += /[A-Z]/.test(thePassword) ? 1 : 0;
    count += /\d/.test(thePassword) ? 1 : 0;
    count += /[@]/.test(thePassword) ? 1 : 0;
    count += /[0-9]/.test(thePassword) ? 1 : 0;
    if (count >= 2 && thePassword) {
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
  const resetPassword = async (password: string, confirmedPassword: string) => {
    // User tries to submit/login, will activate error checks in inputs
    setSubmit(true);

    // Check if input is empty
    if (password.trim() === "" || confirmedPassword.trim() === "" ) {
      setPasswordWarning("Ett eller flere felter er tom");
      return;
    } else if(!passwordValidation(passwordInput)){
      setPasswordWarning("Passordet må innholde minst en små bokstav og en stor bokstav eller ett tall eller ett tegn");
      return;

    }else if (password === confirmedPassword) {
      passwordService.newPassword(passwordInput);
      setRedirect(true);
    } else {
      setWarningText("Passordene må være like");
    }
  };
  if (redirect) {
    return <Redirect to="/profile" />;
  }
  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to reset password if enter key is pressed down
    if (e !== undefined && e.key === "Enter")
      resetPassword(passwordInput, confirmPassword);
  };
  return (
    <>
      <Title>Reset passord</Title>
      <Container>
        <Text> Du kan registrere nytt passord her for å logge inn på</Text>
        <TextField
          style={inputStyle}
          variant="outlined"
          label="Skriv inn ditt nytt passord her"
          type="password"
          error={(submit && passwordInput === "") || warningText !== ""}
          helperText={
            submit && passwordInput === ""
              ? "Passord er påkrevd"
              : submit && !passwordValidation(passwordInput)
              ? "Passordet må innholde minst en små bokstav og en stor bokstav eller ett tall eller ett tegn"
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
            submit && passwordInput === ""
              ? "Bekreftelse av passord er påkrevd"
              : submit && !passwordValidation(confirmPassword)
              ? "Passordet må innholde minst en små bokstav og en stor bokstav eller ett tall eller ett tegn"
              : submit && counter(confirmPassword) > 45
              ? "passordet kan ikke være flere enn 45 bokstaver"
              : ""
          }
          onChange={e => setConfirmPassword(e.target.value)}
          onKeyDown={e => checkForEnterKey(e)}
        />
        <Text>{passwordWarning}</Text>

        <BtnWrapper>
          <Button onClick={() => resetPassword(passwordInput, confirmPassword)}>
            Reset passord
          </Button>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default ResetPassword;
