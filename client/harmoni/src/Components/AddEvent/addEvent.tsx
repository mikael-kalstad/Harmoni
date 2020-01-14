import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import ArtistForm from './EventForms/artistForm';
import BasicInfoForm from './EventForms/basicInfoForm';
import styled from "styled-components";
import TicketForm from "./EventForms/ticketForm";
import ProgramForm from "./EventForms/programForm";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            margin: theme.spacing(1),
            marginLeft: 0
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);


const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 400px;
`;

function getSteps() {
    return ['Info', 'Artister', 'Billett-typer', 'Program'];
}

interface ITicket {
    price: number;
    type: string;
}

const AddEvent = () => {

    const classes = useStyles({});
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const [skipped, setSkipped] = useState(new Set<number>());
    const steps = getSteps();

    //info:
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [fromDateTime, setFromDateTime] = useState<Date | null>(
        new Date('2020-01-01T00:00:00'),
    );
    const [toDateTime, setToDateTime] = useState<Date | null>(
        new Date('2020-01-01T00:00:00'),
    );

    const infoProps = {name, setName, category, setCategory, location, setLocation, fromDateTime, setFromDateTime, toDateTime, setToDateTime};


    //artists:
    //artist props go here
    //const artistProps = {};


    //tickets, this needs a list of tickets (not done)
    //const [ticketCategory, setTicketCategory] = useState('');
    //const [price, setPrice] = useState('');

    const [eventTickets, setEventTickets] = useState<ITicket[]>();

    const ticketProps = {eventTickets, setEventTickets};


    //program:
    const [programText, setProgramText] = useState('');
    const programProps = {programText, setProgramText};

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (<BasicInfoForm {...infoProps}/>);
            case 1:
                return (<ArtistForm/>);
            case 2:
                return (<TicketForm {...ticketProps}/>);
            case 3:
                return (<ProgramForm {...programProps}/>);
            default:
                return 'Unknown step';
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
        const newActiveStep =
            isLastStep() && !stepsCompleted()
                ? steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

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
        <div className={classes.root}>
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
                            <h1
                                className={classes.instructions}>
                                Sykt bra jobba
                            </h1>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Tilbake
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Neste
                                    {}
                                </Button>
                                {isStepOptional(activeStep) && !completed.has(activeStep) && (
                                    <Button
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Legg til senere
                                    </Button>
                                )}
                                <Button color="primary" onClick={handleComplete}>
                                    {completedSteps() === totalSteps() - 1 ? 'Legg til arrangement' : 'Fullfør trinn'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Wrapper>
        </div>
    );
};

export default AddEvent
