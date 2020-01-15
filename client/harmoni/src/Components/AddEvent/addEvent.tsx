import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import FormStepper from "./formStepper";
import CircularProgress from "@material-ui/core/CircularProgress";

// Form components
import ArtistForm from "./EventForms/artistForm";
import BasicInfoForm from "./EventForms/basicInfoForm";
import TicketForm from "./EventForms/ticketForm";
import ProgramForm from "./EventForms/programForm";
import Summary from "./EventForms/summary";
import Success from "./success";

// Services
import { eventService } from "../../services/EventService";
import { ticketService } from "../../services/TicketService";
import { userService } from "../../services/UserService";

interface Event {
  eventId: number;
  name: string;
  organizer: number;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: string;
  information: string;
  category: string;
  picture: string;
}

const Container = styled.div`
  margin: 100px 0;
`;

const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 400px;
`;

const LinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
`;

const LoadingWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 20px;
  margin: 60px 0;
`;

const LoadingText = styled.p`
  font-size: 24px;
`;

const WarningText = styled.p`
  color: #d45951;
  font-size: 18px;
  font-weight: 400;
`;

const AddEvent = (props: { userData: any }) => {
  //   const classes = useStyles({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const [skipped, setSkipped] = useState(new Set<number>());
  const [loading, setLoading] = useState<boolean>(false);
  const [warningText, setWarningText] = useState("");
  const [uploaded, setUploaded] = useState<boolean>(false);
  const steps = [
    "Info",
    "Artister",
    "Billett-typer",
    "Beskrivelse og program",
    "Oppsummering"
  ];

  // 1. Info
  const [infoSubmit, setInfoSubmit] = useState<boolean>(false);
  const [infoData, setInfoData] = useState({
    name: "",
    imgData: "",
    category: "",
    location: "",
    dateFrom: null,
    dateTo: null
  });

  const isInfoDataEmpty = () => {
    return (
      infoData.name === "" ||
      infoData.category === "" ||
      infoData.location === "" ||
      infoData.dateFrom === null ||
      infoData.dateTo === null
    );
  };

  // 2. Artists
  const [listOfArtists, setListOfArtists] = useState([]);

  // 3. Tickets
  const [listOfTickets, setListOfTickets] = useState([]);

  // 4. Program
  const [programText, setProgramText] = useState("");

  const infoProps = { infoSubmit, infoData, setInfoData, isInfoDataEmpty };
  const artistProps = { listOfArtists, setListOfArtists };
  const ticketProps = { listOfTickets, setListOfTickets };
  const programProps = { programText, setProgramText };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <BasicInfoForm {...infoProps} />;
      case 1:
        return <ArtistForm {...artistProps} />;
      case 2:
        return <TicketForm {...ticketProps} />;
      case 3:
        return <ProgramForm {...programProps} />;
      case 4:
        return (
          <Summary
            name={infoData.name}
            img={infoData.imgData}
            location={infoData.location}
            fromDate={infoData.dateFrom}
            toDate={infoData.dateTo}
            category={infoData.category}
            program={programText}
            artists={listOfArtists}
            tickets={listOfTickets}
          />
        );
    }
  }

  const totalSteps = () => {
    return steps.length;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const stepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    // Info step is required
    if (activeStep === 0) {
      console.log(infoData);
      setInfoSubmit(true);
      if (isInfoDataEmpty()) return;
    }

    // Set step to completed
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    // All other steps is optional
    nextStep();
  };

  const nextStep = () => {
    const newActiveStep =
      isLastStep() && !stepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    // Set step to uncompleted
    const newCompleted = new Set(completed);
    newCompleted.delete(activeStep - 1);
    setCompleted(newCompleted);

    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const submit = async () => {
    let newEvent: Event = {
      eventId: -1,
      name: infoData.name,
      //organizer: props.userData.user_id,
      organizer: 1,
      address: infoData.location,
      from_date: infoData.dateFrom
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      to_date: infoData.dateTo
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      capacity: 0,
      status: "Kommende",
      information: programText,
      category: infoData.category,
      picture: infoData.imgData
    };

    setLoading(true);
    let res = await eventService.addEvent(newEvent);
    console.log("res add event", res);

    if (res) {
      setLoading(false);
      setUploaded(true);
    } else {
      setLoading(false);
      setWarningText("Det skjedde noe feil. Prøv igjen");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set<number>());
    setSkipped(new Set<number>());
  };

  return (
    <Container>
      <FormStepper
        steps={steps}
        activeStep={activeStep}
        skipped={skipped}
        completed={completed}
        handleStep={handleStep}
        loading={loading}
      />

      <Wrapper>
        <div>
          {stepsCompleted() ? (
            <div>
              <h1>Sykt bra jobba</h1>
              <Button onClick={handleReset}>Ny event</Button>
            </div>
          ) : (
            <div>
              {uploaded && <Success />}
              {loading ? (
                <LoadingWrapper>
                  <CircularProgress size={30} />
                  <LoadingText>Vennligst vent</LoadingText>
                </LoadingWrapper>
              ) : (
                <>
                  <div>{getStepContent(activeStep)}</div>

                  <LinkWrapper>
                    <Button
                      disabled={activeStep === 0 || loading}
                      onClick={handleBack}
                    >
                      Tilbake
                    </Button>

                    {completedSteps() === totalSteps() || activeStep === 4 ? (
                      <Button
                        disabled={
                          completedSteps() !== totalSteps() - 1 || loading
                        }
                        color="primary"
                        onClick={submit}
                      >
                        Legg til arrangement
                      </Button>
                    ) : (
                      <Button color="primary" onClick={handleNext}>
                        Neste
                      </Button>
                    )}
                  </LinkWrapper>
                </>
              )}
            </div>
          )}

          {warningText !== "" && <WarningText>{warningText}</WarningText>}
        </div>
      </Wrapper>
    </Container>
  );
};

export default AddEvent;
