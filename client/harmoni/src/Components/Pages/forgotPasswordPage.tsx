import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "../Button/button";
import { userService } from "../../services/UserService";
import { passwordService } from "../../services/PasswordService";
import { Redirect, useHistory } from "react-router-dom";
import InfoDialog from '../infoDialog';
import { FaCheckCircle } from 'react-icons/fa';

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

let checkCircleStyle = {
  fontSize: 120,
  color: '#82c91e',
  marginTop: 50,
  marginBottom: 20,
  marginLeft: 80
};

const ForgotPassword = (props: any) => {
  // EMail not registered warning
  //const [emailWarning, setEmailWarning] = useState("");
  // Used to display error on empty input when submitting
  const [submit, setSubmit] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [warningText, setWarningText] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [displayDialog, setDisplayDialog] = useState(false);


  // Check inputs and try to reset password given email
  const forgotPassword = async (email: string) => {
    // User tries to submit/login, will activate error checks in inputs
    setSubmit(true);

    // Check if input is empty
    if (email.trim() === "") {
      setWarningText("Input felt er tomt");
      return;
    }

        setLoading(true);
        let res = await userService.getUserByEMail(email);

        if(res){
          setLoading(false);
          setDisplayDialog(true);
          passwordService.requestPasswordReset(emailInput);
          //setRedirect(true);
        }
    };
    const closeDialog = () => {
      setDisplayDialog(false);
    };
    // Check if enter key is clicked
    const checkForEnterKey = (e: { key: string } | undefined) => {
        // Try to reset password if enter key is pressed down
        if (e !== undefined && e.key === "Enter") forgotPassword(emailInput);
    };

  if (redirect) {
    return <Redirect to="/" />;
  }
    return (
        <>
            <Title>Glemt passord</Title>
            <Container>
                <Text> Vennligst skriv inn e-postaddressen din.
                    Du vil få en e-post med link til å lage en ny passord</Text>
                <TextField
                    style={inputStyle}
                    variant="outlined"
                    label="eksampel@eks.no"
                    type="email"
                    error={(submit && emailInput === "") || warningText !== ""}
                    helperText={submit && emailInput === "" ? "Email er påkrevd" : warningText !== ""
                        ? warningText
                        : ""}
                    onChange={e => setEmailInput(e.target.value)}
                    onKeyDown={e => checkForEnterKey(e)}
                />
                <BtnWrapper>
                
                    <Button
                        onClick={() => forgotPassword(emailInput)}
                    >
                        Reset passord
                    </Button>
                </BtnWrapper>
                {displayDialog && (
                  <InfoDialog width="300px" height="270px" closeDialog={closeDialog}>
                    <FaCheckCircle style={checkCircleStyle} />
                    <Text>Dersom du oppga en gyldig e-postadresse vil du ha blitt sendt en epost!</Text>
                    <Button onClick={closeDialog}>Tilbake</Button>
                  </InfoDialog>
                )}
            </Container>
        </>


    )
};

export default ForgotPassword;

