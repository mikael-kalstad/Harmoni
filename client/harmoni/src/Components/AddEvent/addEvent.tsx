import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import ArtistForm from "./EventForms/artistForm";
import BasicInfoForm from "./EventForms/basicInfoForm";
import styled from "styled-components";
import TicketForm from "./EventForms/ticketForm";
import ProgramForm from "./EventForms/programForm";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: 0
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    completed: {
      display: "inline-block"
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

const Container = styled.div`
  margin: 100px 0;
`;

const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 400px;
`;

const LinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 40px;
`;

function getSteps() {
  return ["Info", "Artister", "Billett-typer", "Program"];
}

const AddEvent = () => {
  const classes = useStyles({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();

  // 1. Info
  const [infoSubmit, setInfoSubmit] = useState<boolean>(false);
  const [infoCompleted, setInfoCompleted] = useState<boolean>(false);

  // 2. Artists
  const [listOfArtists, setListOfArtists] = useState([]);

  // 3. Tickets
  const [listOfTickets, setListOfTickets] = useState([]);

  // 4. Program
  const [programText, setProgramText] = useState("");

  const infoProps = {
    infoSubmit,
    setInfoCompleted
    // name,
    // setName,
    // imgData,
    // setImgData,
    // category,
    // setCategory,
    // location,
    // setLocation,
    // fromDateTime,
    // setFromDateTime,
    // toDateTime,
    // setToDateTime
  };

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
    }
  }

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("Du kan ikke hoppe over et trinn som ikke er valgfritt");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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
    // Set step to completed
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    if (activeStep === 0) {
      setInfoSubmit(true);
      if (infoCompleted) nextStep();
    }
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

  const submit = () => {};

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set<number>());
    setSkipped(new Set<number>());
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  return (
    <Container className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const buttonProps: { optional?: React.ReactNode } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <Wrapper>
        <div>
          {stepsCompleted() ? (
            <div>
              <h1 className={classes.instructions}>Sykt bra jobba</h1>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <LinkWrapper>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Tilbake
                </Button>
                <Button
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Neste
                </Button>
                {/* {isStepOptional(activeStep) && !completed.has(activeStep) && (
                  <Button
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Legg til senere
                  </Button>
                )} */}
                {completedSteps() === totalSteps() && (
                  <Button color="primary" onClick={submit}>
                    Legg til arrangement
                  </Button>
                )}
              </LinkWrapper>
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default AddEvent;
