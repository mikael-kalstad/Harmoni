import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Btn from "../Button/button";
import FormStepper from "./formStepper";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

// Form components
import ArtistForm from "./EventForms/artistForm";
import BasicInfoForm from "./EventForms/basicInfoForm";
import TicketForm from "./EventForms/ticketForm";
import ProgramForm from "./EventForms/programForm";
import Summary from "./summary";
import Success from "./success";

// Services
import { eventService } from "../../services/EventService";
import { ticketService } from "../../services/TicketService";
import { userService } from "../../services/UserService";
import { riderService } from "../../services/RiderService";

interface Event {
  eventId: number;
  name: string;
  organizer: number;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: number;
  information: string;
  category: string;
  picture: string;
}

interface Rider {
  userId: number;
  eventId: number;
  text: string;
}

const BtnWrapper = styled.div`
  margin: 60px 0;
`;

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
  font-weight: 400;s
`;

interface IProps {
  userData: any;
  eventData?: any;
  artistsData?: any;
  ticketsData?: any;
  riderData?: any;
}

const AddEvent = (props: IProps) => {
  const [eventId, setEventId] = useState();
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
    id: null,
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
  const [listOfRiders, setListOfRiders] = useState([]);

  // 3. Tickets
  const [listOfTickets, setListOfTickets] = useState([]);

  // 4. Program
  const [programText, setProgramText] = useState("");

  const infoProps = { infoSubmit, infoData, setInfoData, isInfoDataEmpty };
  const artistProps = {
    listOfArtists,
    setListOfArtists,
    listOfRiders,
    setListOfRiders
  };
  const ticketProps = { listOfTickets, setListOfTickets };
  const programProps = { programText, setProgramText };

  useEffect(() => {
    if (props.eventData) {
      // Convert date string to Date object
      const dateFrom: Date = moment(
        props.eventData.from_date,
        "DD-MM-YYYY HH:mm"
      ).toDate();
      const dateTo: Date = moment(
        props.eventData.to_date,
        "DD-MM-YYYY HH:mm"
      ).toDate();

      setEventId(props.eventData.event_id);

      // Update infoData with data from props.eventData
      setInfoData({
        id: props.eventData.event_id,
        name: props.eventData.name,
        imgData: new Buffer(props.eventData.picture).toString("ascii"),
        category: props.eventData.category,
        location: props.eventData.address,
        dateFrom: dateFrom,
        dateTo: dateTo
      });

      setProgramText(props.eventData.information);

      // Set artists data
      if (props.artistsData) setListOfArtists(props.artistsData);

      // Set tickets data
      if (props.ticketsData) setListOfTickets(props.ticketsData);

      // Set rider data
      if (props.riderData) setListOfRiders(props.riderData);

      // Set all, but last step in stepper, to completed
      const newCompleted = new Set<number>();
      for (let i = 0; i < steps.length - 1; i++) newCompleted.add(i);
      setCompleted(newCompleted);
    }
  }, [props.eventData, props.artistsData, props.ticketsData, steps.length]);

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
            riders={listOfRiders}
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
      eventId: infoData.id || -1,
      name: infoData.name,
      organizer: props.userData.user_id,
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
      status: 0,
      information: programText,
      category: infoData.category,
      picture: infoData.imgData
    };

    setLoading(true);

    // Event is already made, save changes
    if (props.eventData) {
      eventService.updateEvent(newEvent).then(res => {
        updateRiders();
        checkResponse(res);
      });

      // Make new event
    } else {
      eventService.addEvent(newEvent).then(res => {
        listOfTickets.forEach(ticket => {
          ticket["event_id"] = res.insertId;
          ticketService.addTickets(ticket);
        });
        listOfArtists.forEach(artist => {
          eventService.addUserToEvent(artist.user_id, res.insertId);
        });

        addRiders(res.insertId);
        setEventId(res["insertId"]);

        checkResponse(res);
      });
    }
  };

  const updateRiders = async () => {
    // Add all riders
    listOfArtists.forEach(a => {
      let text = listOfRiders.find(data => data.user_id === a.user_id)["text"];

      let rider: Rider = {
        eventId: eventId,
        userId: a.user_id,
        text: text
      };

      // riderService.updateRiderList(rider);
    });
  };

  const addRiders = async (event_id: number) => {
    console.log(listOfArtists);
    // Add all riders
    listOfArtists.forEach(a => {
      let text = listOfRiders.find(data => data.user_id === a.user_id)["text"];

      riderService.addRiderList(event_id, a.user_id, text);
    });
  };

  const checkResponse = (res: any) => {
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
        uploaded={uploaded}
      />

      <Wrapper>
        <div>
          <div>
            {uploaded && (
              <>
                <Success
                  title={
                    props.eventData
                      ? "Endringer lagret"
                      : "Arrangement lagt til"
                  }
                />
                <BtnWrapper>
                  <Btn onClick={handleReset} to={"/event/" + eventId}>
                    Gå til arrangement
                  </Btn>
                </BtnWrapper>
              </>
            )}
            {loading ? (
              <LoadingWrapper>
                <CircularProgress size={30} />
                <LoadingText>Vennligst vent</LoadingText>
              </LoadingWrapper>
            ) : (
              <>
                <div>{getStepContent(activeStep)}</div>

                {!uploaded && (
                  <LinkWrapper>
                    <Button
                      disabled={activeStep === 0 || loading || uploaded}
                      onClick={handleBack}
                    >
                      Tilbake
                    </Button>

                    {completedSteps() === totalSteps() ||
                    activeStep === totalSteps() - 1 ||
                    props.eventData ? (
                      <Button
                        disabled={
                          props.eventData
                            ? false
                            : completedSteps() !== totalSteps() - 1 ||
                              loading ||
                              uploaded
                        }
                        color="primary"
                        onClick={submit}
                      >
                        {props.eventData
                          ? "Lagre endringer"
                          : "Legg til arrangement"}
                      </Button>
                    ) : (
                      <Button color="primary" onClick={handleNext}>
                        Neste
                      </Button>
                    )}
                  </LinkWrapper>
                )}
              </>
            )}

            {/* {props.eventData && <Btn onClick={submit}>LAGRE ENDRINGER</Btn>} */}
          </div>
          {warningText !== "" && <WarningText>{warningText}</WarningText>}
        </div>
      </Wrapper>
    </Container>
  );
};

export default AddEvent;
