import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "../Button/button";
import {passwordService} from "../../services/PasswordService";

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
    const [submit, setSubmit] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswrod,setConfirmPasswrod] = useState("");
    const [warningText, setWarningText] = useState("");

    // Check inputs and try to reset password given email
    const resetPassword = async (password: string, confirmedPassword: string) => {
        // User tries to submit/login, will activate error checks in inputs
        setSubmit(true);

        // Check if input is empty
        if (password.trim() === "" || confirmedPassword.trim() === "") {
            setPasswordWarning("Ett eller flere felter er tom");
            return;
        }

    };
    // Check if enter key is clicked
    const checkForEnterKey = (e: { key: string } | undefined) => {
        // Try to reset password if enter key is pressed down
        if (e !== undefined && e.key === "Enter") resetPassword(passwordInput,confirmPasswrod);
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
                    helperText={submit && passwordInput === "" ? "Passord er påkrevd" : ""}
                    onChange={e => setPasswordInput(e.target.value)}
                    onKeyDown={e => checkForEnterKey(e)}
                />
                <TextField
                    style={inputStyle}
                    variant="outlined"
                    label="Skriv inn det nye passordet igjen"
                    type="password"
                    error={(submit && passwordInput === "") || warningText !== ""}
                    helperText={submit && passwordInput === "" ? "E-postadressen er påkrevd" : ""}
                    onChange={e => setPasswordInput(e.target.value)}
                    onKeyDown={e => checkForEnterKey(e)}
                />
                <BtnWrapper>
                    <Button
                        onClick={() => passwordService.newPassword(passwordInput)}
                    >
                        Reset passord
                    </Button>
                </BtnWrapper>
            </Container>
        </>


    )
};

export default ResetPassword;

