import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "../Button/button";

import { emailService } from "../../services/EmailService";

const Wrapper = styled.div`
    width: 30%;
    min-width: 240px;
    display: grid;
    grid-template-columns: 1fr;
    margin: auto;
    margin-top: 10px;
    justify-content: center;
`;

const TitleText = styled.h1``;

const ButtonWrapper = styled.div`
    margin-top: 25px;
`;

const inputStyle = {
    width: "100%",
    marginTop: "15px"
};

interface IFeedbackPage {
    userData?: any;
}

const FeedbackPage = (props: IFeedbackPage) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        setEmail(props.userData ? props.userData.email : "");
        window.scrollTo(0, 0);
    }, []);

    const submitClick = () => {
        setSubmitClicked(true);
        if (validateInputs()) {
            console.log("Sender nå");
            sendMessage();
        }
    };

    const sendMessage = () => {
        setSubmitting(true);
        emailService
            .sendEmail(
                "harmoniteam8@gmail.com",
                message,
                "Tilbakemelding fra " + email + ": " + subject
            )
            .then(response => {
                setSubmitting(false);
            });
    };

    const validateInputs = () => {
        return (
            email.match(emailFormat) &&
            subject.length != 0 &&
            message.length != 0
        );
    };
    return (
        <Wrapper>
            <TitleText>Send oss mail</TitleText>

            <TextField
                variant="outlined"
                placeholder="Din email"
                label="Email"
                style={inputStyle}
                error={submitClicked && !email.match(emailFormat)}
                helperText={
                    submitClicked && !email.match(emailFormat)
                        ? "Du må skrive en gyldig email"
                        : ""
                }
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setSubmitClicked(false);
                }}
            />
            <TextField
                variant="outlined"
                placeholder="Hva gjelder saken?"
                label="Emne"
                style={inputStyle}
                error={submitClicked && subject.length == 0}
                helperText={
                    submitClicked && subject.length == 0
                        ? "Du må skrive et emne"
                        : ""
                }
                value={subject}
                onChange={e => {
                    setSubject(e.target.value);
                    setSubmitClicked(false);
                }}
            />

            <TextField
                variant="outlined"
                placeholder="Skriv din melding her"
                label="Melding"
                id="multiline-static"
                multiline
                rows="7"
                style={inputStyle}
                error={submitClicked && message.length == 0}
                helperText={
                    submitClicked && message.length == 0
                        ? "Du må skrive noe"
                        : ""
                }
                value={message}
                onChange={e => {
                    setMessage(e.target.value);
                    setSubmitClicked(false);
                }}
            />
            <ButtonWrapper>
                <Button onClick={submitClick}>Send</Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default FeedbackPage;
