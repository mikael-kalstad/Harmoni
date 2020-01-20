import React, { useState, useEffect } from "react";
import { eventService } from "../../services/EventService";
import { userService } from "../../services/UserService";
import { ticketService } from "../../services/TicketService";
import AddEvent from "../AddEvent/addEvent";
import styled from "styled-components";
import Summary from "../AddEvent/summary";
import Loading from "../loading";
import Success from "../AddEvent/success";
import BackBtn from "../Button/backBtn";
import ConfirmationDialog from "../confirmationDialog";
import Button from "../Button/button";

const Container = styled.div`
  width: 80%;
  margin: 80px auto;
`;

const Wrapper = styled.div`
  width: 400px;
  margin: auto;
`;

const WarningBtn = styled.button`
  margin-bottom: 40px;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 180px;
  height: 60px;
  outline: none;
  border: none;
  font-size: 18px;
  background: #f85757;
  color: white;
  border-radius: 500px;
  padding: 10px;
  cursor: pointer;

  :hover {
    filter: brightness(95%);
  }

  :active {
    filter: brightness(98%);
  }
`;

const DangerWrapper = styled.div`
  max-width: 1200px;
  border: 2px solid #f85757;
  border-radius: 10px;
  margin: 90px auto;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const UnderTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #f85757;
  padding: 20px 0 10px;
  margin: 0;
  text-align: center;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #888;
  margin-bottom: 50px;
`;

const EventDetails = (props: any) => {
  const [eventData, setEventData] = useState();
  const [artists, setArtists] = useState();
  const [tickets, setTickets] = useState();

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleDialog = () => setShowDialog(!showDialog);

  const cancelEvent = async () => {
    setLoading(true);

    let res = await eventService.changeStatusOfEvent(eventData.event_id, 2);

    if (res) {
      setLoading(false);
      setFinished(true);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      eventService.getEventById(props.match.params.id).then(res => {
        setEventData(res[0]);
        userService
          .getArtistsForEvent(res[0].event_id)
          .then(response => setArtists(response));

        ticketService.getAllTicketsByEventId(res[0].event_id).then(response => {
          setTickets(response);
        });
      });
    };

    fetchEvent();
  }, [props.match.params.id]);

  if (loading) return <Loading />;

  if (edit) return <AddEvent userData={props.userData} eventData={eventData} />;

  if (eventData && artists && tickets) {
    return (
      <Container>
        <BackBtn to="/profile" />

        {finished ? (
          <Success title="Arrangement avlyst" />
        ) : (
          <>
            <Wrapper>
              <Summary
                name={eventData.name}
                img={new Buffer(eventData.picture, "base64").toString("ascii")}
                category={eventData.category}
                location={eventData.location}
                fromDate={eventData.from_date}
                toDate={eventData.to_date}
                program={eventData.programText}
                artists={artists}
                tickets={tickets}
              />

              <Button onClick={() => setEdit(true)}>ENDRE ARRANGEMENT</Button>
            </Wrapper>

            <DangerWrapper>
              <UnderTitle>Danger Zone</UnderTitle>
              <Text>
                NB! Hvis man avlyser et arrangement kan det ikke endres
              </Text>

              <WarningBtn onClick={() => toggleDialog()}>
                Avlys arrangement
              </WarningBtn>
            </DangerWrapper>
          </>
        )}

        {showDialog && (
          <ConfirmationDialog
            title="Er du sikker?"
            text="Avlysing av et arrangement kan ikke tas tilbake"
            btnActionText="Ja, avlys arrangmeent"
            btnSecondaryText="Avbryt"
            actionClick={cancelEvent}
            closeDialog={toggleDialog}
          />
        )}
      </Container>
    );
  }

  return <Loading />;
};

export default EventDetails;
