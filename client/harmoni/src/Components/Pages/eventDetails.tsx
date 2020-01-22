import React, { useState, useEffect } from "react";
import { eventService } from "../../services/EventService";
import { userService } from "../../services/UserService";
import { ticketService } from "../../services/TicketService";
import { riderService } from "../../services/RiderService";
import AddEvent from "../AddEvent/addEvent";
import styled from "styled-components";
import Summary from "../AddEvent/summary";
import Loading from "../loading";
import Success from "../AddEvent/success";
import BackBtn from "../Button/backBtn";
import ConfirmationDialog from "../confirmationDialog";
import Button from "../Button/button";
import { attachmentService } from "../../services/AttachmentService";
import WarningInfo from "../Pages/warningInfo";
import EmailService, { emailService } from "../../services/EmailService";

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
  // Data states
  const [eventData, setEventData] = useState();
  const [attachments, setAttachments] = useState([]);
  const [attachmentsRights, setAttachmentsRights] = useState([]);
  const [artists, setArtists] = useState();
  const [volunteers, setVolunteers] = useState();
  const [tickets, setTickets] = useState();
  const [riders, setRiders] = useState();

  // Boolean check states
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [access, setAccess] = useState<boolean>(false);
  const [deniedAccess, setDeniedAccess] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);

  const toggleDialog = () => setShowDialog(!showDialog);

  const cancelEvent = async () => {
    setLoading(true);

    let res = await eventService.changeStatusOfEvent(eventData.event_id, 2);
    if (res) {
      if (artists) {
        console.log("Artists: ", artists);
        artists.map(artist => {
          emailService.sendEmail(
            artist.email,
            "Hei, Vi informerer deg at arrangementet: " +
              eventData.name +
              " er avlyst. \n" +
              "Du får denne mailen fordi arrangøren har avlyst arrangementer.",
            eventData.name + " er avlyst"
          );
        });
      }
      if (volunteers) {
        setVolunteers(
          eventService.getUsersOfEventByType(eventData.event_id, "volunteer")
        );
        console.log("Vol: ", volunteers);
        volunteers.forEach(volunteer => {
          emailService.sendEmail(
            volunteer.email,
            "Hei, Vi informerer deg at arrangementet: " +
              eventData.name +
              " er avlyst. \n" +
              "Du får denne mailen fordi arrangøren har avlyst arrangementer.",
            eventData.name + " er avlyst"
          );
        });
      }

      setLoading(false);
      setFinished(true);
    }
  };

  useEffect(() => {
    const isUserArtistOfEvent = async () => {
      // Check if user is artist of event
      let res = await userService.getArtistsForEvent(props.match.params.id);

      if (!res || res[0] === undefined) return false;

      let checker = false;

      res.forEach(u => {
        if (u.user_id === props.userData.user_id) checker = true;
      });

      return checker;
    };

    const isUserOrganizerOfEvent = async () => {
      // Check if user is organizer of event
      let res = await userService.getOrganizerForEvent(props.match.params.id);

      if (!res || res[0] === undefined) return false;
      return props.userData.user_id === res[0].user_id;
    };

    const validateUser = async () => {
      // console.log(await isUserOrganizerOfEvent());
      let organizer = await isUserOrganizerOfEvent();
      let artist = await isUserArtistOfEvent();

      if (organizer) {
        setAccess(true);
        setReadOnly(false);
      } else if (artist) {
        setAccess(true);
      } else if (!organizer || !artist) {
        setDeniedAccess(true);
      }
    };

    const fetchEvent = async () => {
      eventService.getEventById(props.match.params.id).then(res => {
        setEventData(res[0]);
        userService
          .getArtistsForEvent(props.match.params.id)
          .then(artistResponse => {
            setArtists(artistResponse);
            attachmentService
              .getAttachmentsForUserForEvent(
                props.userData.user_id,
                props.match.params.id
              )
              .then(attachmentResponse => {
                setAttachments(attachmentResponse);
                attachmentResponse.forEach(attachment => {
                  console.log(attachment);
                  attachmentService
                    .getAttachmentRights(attachment.attachment_id)
                    .then(rightsResponse => {
                      console.log(artistResponse);
                      console.log(rightsResponse)
                      let newRight = {
                        attachment: attachment,
                        users: artistResponse.filter(artist =>
                          rightsResponse.some(right => right.user_id == artist.user_id)
                        )
                      };
                      console.log(newRight)
                      setAttachmentsRights(array => [...array, newRight]);
                    });
                });
              });
          });

        ticketService
          .getAllTicketsByEventId(props.match.params.id)
          .then(response => {
            setTickets(response);
          });

        riderService
          .getRiderByEventId(res[0].event_id)
          .then(response => setRiders(response));
      });
    };

    // Check if user should have access
    if (props.userData) validateUser();

    // Only fetch event details if user is allowed access
    if (access) fetchEvent();
  }, [props.match.params.id, props.userData, access]);

  if (deniedAccess)
    return (
      <WarningInfo
        title="Ingen tilgang"
        underTitle="Denne kontoen har ikke tilgang"
        text=" Du har ikke tilgang til denne siden. Kontoen du er logget inn med har ingen adgang til denne siden. Vennligst bruk en annen konto som er tilknyttet dette arrangementet og prøv igjen."
      />
    );

  if (edit)
    return (
      <AddEvent
        userData={props.userData}
        eventData={eventData}
        artistsData={artists}
        ticketsData={tickets}
        riderData={riders}
        attachmentsData={attachments}
        attachmentsRights={attachmentsRights}
      />
    );

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
                attachments={attachments}
                userRights={attachmentsRights}
                riders={riders}
                showOnly={true}
              />
              {!readOnly && (
                <Button onClick={() => setEdit(true)}>ENDRE ARRANGEMENT</Button>
              )}
            </Wrapper>

            {!readOnly && (
              <DangerWrapper>
                <UnderTitle>Danger Zone</UnderTitle>
                <Text>
                  NB! Hvis man avlyser et arrangement kan det ikke endres
                </Text>

                <WarningBtn onClick={() => toggleDialog()}>
                  Avlys arrangement
                </WarningBtn>
              </DangerWrapper>
            )}
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
