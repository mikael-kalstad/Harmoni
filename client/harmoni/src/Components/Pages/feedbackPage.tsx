import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "../Button/button";
import { FaCheckCircle } from "react-icons/fa";
import BackBtn from "../Button/backBtn";

import { emailService } from "../../services/EmailService";

const Wrapper = styled.div`
    width: 40%;
    min-width: 240px;
    display: grid;
    grid-template-columns: 1fr;
    margin: auto;
    justify-content: center;
    margin-top: 17px;
    grid-gap: 20px;
`;

const TitleText = styled.h1`
    margin: 0;
`;

const ButtonWrapper = styled.div``;

const InfoText = styled.p`
    justify-self: center;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;

const checkCircleStyle = {
    fontSize: 120,
    color: "#82c91e",
    justifySelf: "center"
};

const inputStyle = {
    width: "100%"
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
            .then(res => {
                setSubmitting(false);
                setSubmitted(true);
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
            <BackBtn name="Forsiden" />
            {submitted ? (
                <>
                    <TitleText style={{ textAlign: "center" }}>
                        Meldingen ble sendt
                    </TitleText>
                    <FaCheckCircle style={checkCircleStyle} />
                    <InfoText>
                        Vi har nå mottat din henvendelse. Du vil få svar iløpet
                        av noen virkedager.
                    </InfoText>{" "}
                </>
            ) : (
                <>
                    {" "}
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
                        disabled={submitting}
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
                        disabled={submitting}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Forespørsler, beskjed om feil, spørsmål osv."
                        label="Melding"
                        id="multiline-static"
                        multiline
                        rows="6"
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
                        disabled={submitting}
                    />
                    <ButtonWrapper>
                        <Button onClick={submitClick} loading={submitting}>
                            Send
                        </Button>
                    </ButtonWrapper>
                </>
            )}
        </Wrapper>
    );
};

export default FeedbackPage;
