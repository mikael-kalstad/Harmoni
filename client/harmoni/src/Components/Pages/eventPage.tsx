import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { isEventInProgress, hasEventHappened } from "../utils";
import { eventService } from "../../services/EventService";
import { ticketService } from "../../services/TicketService";
import { userService } from "../../services/UserService";
import { geoService } from "../../services/GeoService";

import AttachmentList from '../Event/attachmentList';
import { attachmentService } from '../../services/AttachmentService';
import TicketMenu from "../Event/ticketMenu";
import ArtistsList from "../Event/artistsList";
import Map from "../Event/map";
import InfoDialog from "../infoDialog";
import { FaCheckCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Button from "../Button/button";
import TextField from "@material-ui/core/TextField";

export interface IEvent {
  event_id: number;
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

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

interface IUser {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: string;
}

interface attachment {
  attachment_id: number;
  user_id: number;
  event_id: number;
  data: string;
  filename: string;
  filetype: string;
  filesize: number;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (max-width: 800px) {
    justify-content: center;
    margin: auto 30px;
  }
`;

const ImageGrid = styled.div`
  justify-items: center;

  @media screen and (max-width: 800px) {
    margin: auto;
    margin-top: 10px;
    width: 90%;
  }
`;

const InfoGrid = styled.div`
  margin: 0 40px;
`;

const ArtistsAndMapGrid = styled.div`
  display: grid;
  margin: 20px 40px;
  grid-gap: 30px;
  min-height: 450px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const ArtistsGrid = styled.div`
  max-height: 400px;
  overflow-y: auto;
  justify-self: start;
  height: 100%;

  @media screen and (max-width: 800px) {
    justify-self: center;
  }
`;

const MapGrid = styled.div`
  display: grid;
  border: 3px solid grey;
  border-radius: 3px;
  min-height: 300px;
  width: 100%;
  height: 100%;
  margin: 0;
  align-items: center;
`;

const TicketsGrid = styled.div`
  padding-top: 30px;
  width: 70%;
  margin: auto;
`;

const EventImage = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  @media screen and (max-width: 800px) {
    height: 40vh;
    justify-self: center;
    border-radius: 10px;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const InfoText = styled.p``;

const Title = styled.h1``;

interface IStatusSpan {
  color: string;
}

const StatusSpan = styled.span<IStatusSpan>`
  color: ${props => props.color};
`;

const ContentText = styled.p`
  font-size: 20px;
  color: #535353;
  white-space: pre-wrap;
`;

const AddBtn = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr;
    justify-items: start;
    align-items: center;
    width: 220px;
    height: 60px;
    background-color: #73CF5C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    font-size: 16px;
    font-weight: 500;
    border none;
    margin: 0;
    margin-top: 0;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    outline: none;
    right: 0;
    position: absolute;
    
    :hover {
        filter: brightness(95%);
    }
    :active {
        box-shadow: none;
    }
`;

const BtnIcon = styled.img`
  height: 40%;
  filter: invert(100%);
  justify-self: center;
`;

const SuccessText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8a8a8a;
  width: 100%;
  text-align: center;
  margin-bottom: 0px;
`;

const ErrorText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8a8a8a;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  padding-top: 40px;
`;

let checkCircleStyle = {
  fontSize: 120,
  color: "#82c91e",
  marginTop: 30,
  marginBottom: 20,
  marginLeft: 80
};

const Event = (props: any) => {
  const [event, setEvent] = useState<IEvent[]>();
  const [eventTickets, setEventTickets] = useState<ITicket[]>();
  const [artists, setArtists] = useState<IUser[]>();
  const [organizer, setOrganizer] = useState();

  const [coords, setCoords] = useState();
  let statuses = ["Kommende", "Arkivert", "Avlyst"];
  const params = useParams<{ id }>();
  const [displayDialog, setDisplayDialog] = useState(false);
  const [showVolunteerButton, setShowVolunteerButton] = useState(false);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      eventService.getEventById(parseInt(params.id)).then(data => {
        setEvent(data);
        fetchCoords(data[0].address);
      });
    };

    const fetchTickets = async () => {
      setEventTickets(
        await ticketService.getAllTicketsByEventId(parseInt(params.id))
      );
    };

    const fetchArtists = async () => {
      setArtists(await userService.getArtistsForEvent(parseInt(params.id)));
    };

    const fetchOrganizer = async () => {
      setOrganizer(await userService.getOrganizerForEvent(parseInt(params.id)));
    };

    const alreadyVolunteered = () => {
      if(!props.userData){
        return Promise.resolve(true);
      }
      return eventService.getUserOfEvent(props.userData.user_id, parseInt(params.id))
    }

    const fetchCoords = async (address: string) => {
      geoService.getLatAndLndOfAddress(address).then(data => {
        setCoords({ lat: data[0], lng: data[1] });
      });
    };

  
    //

    fetchEvent();
    fetchTickets();
    fetchArtists();
    fetchOrganizer();
    alreadyVolunteered().then(e => setShowVolunteerButton(e.length == 0));
    console.log("params.id ", params.id)
    //console.log("props.userData.user_id: ", props.userData.user_id)
  }, [parseInt(params.id)]);
  //

  const addVolunteer = async () => {
    let returnData = await eventService.addUserToEvent(
      props.userData.user_id,
      parseInt(params.id)
    );
    setDisplayDialog(true);
    if(typeof returnData != "undefined" && returnData.length != 0){
      setDialog(
        <InfoDialog width="300px" height="250px" closeDialog={closeSuccessDialog}>
          <FaCheckCircle style={checkCircleStyle} />
          <SuccessText>Du har nå blitt meldt som frivillig på arrangementet</SuccessText>
          <Button onClick={closeSuccessDialog}>Tilbake</Button>
        </InfoDialog>
      )
    }
    else{
      setDialog(
        <InfoDialog width="300px" height="170px" closeDialog={closeErrorDialog}>
          <ErrorText>Beklager, noe gikk galt</ErrorText>
          <Button onClick={closeErrorDialog}>Tilbake</Button>
        </InfoDialog>
      )
    }
  };

  const closeSuccessDialog = () => {
    setDisplayDialog(false);
    setShowVolunteerButton(false);
  };

  const closeErrorDialog = () => {
    setDisplayDialog(false)
  }

  


  if (
    event != null &&
    eventTickets != null &&
    organizer != null &&
    artists != null 
  ) {
    let categories = {
      concert: "Konsert",
      festival: "Festival",
      theatre: "Teater",
      standup: "Standup",
      show: "Show",
      other: "Annet"
    };

    let dateFrom = event[0].from_date.split(" ");
    let dateTo = event[0].to_date.split(" ");
    let inProgress = isEventInProgress(event[0].from_date, event[0].to_date);
    let finished = hasEventHappened(event[0].to_date);
    let status = inProgress ? "Pågående" : statuses[event[0].status];
    return (
      <Wrapper>
        {displayDialog ? dialog : null}
        <ImageGrid>
          <EventImage
            src={new Buffer(event[0].picture).toString("ascii")}
            alt={event[0].name}
          ></EventImage>
          {(props.userData && props.userData.type == "volunteer" && status == "Kommende" && showVolunteerButton) ?  (
            <AddBtn onClick={addVolunteer}>
              <BtnIcon src="/icons/plus-1.svg" />
              Meld deg på arrangement
            </AddBtn>
          ) : (
            <></>
          )}
        </ImageGrid>
        <InfoGrid>
          <Title>
            {event[0].name}{" "}
            {status === "Pågående" ? (
              <>
                {" - "} <StatusSpan color="#448b30">{status}</StatusSpan>
              </>
            ) : status == "Avlyst" || finished ? (
              <>
                {" - "}{" "}
                <StatusSpan color="#c7554f">
                  {finished ? "Ferdig" : status}
                </StatusSpan>
              </>
            ) : (
              <></>
            )}
          </Title>
          <InfoText>
            <BoldSpan>Arrangør: </BoldSpan>
            {organizer[0].name}
          </InfoText>
          <InfoText>
            <BoldSpan>Tid: </BoldSpan>
            {dateFrom[0] === dateTo[0]
              ? dateFrom[0] + ", fra kl. " + dateFrom[1] + " til " + dateTo[1]
              : "Fra: " +
                dateFrom[0] +
                " kl. " +
                dateFrom[1] +
                " til " +
                dateTo[0] +
                " kl. " +
                dateTo[1]}
          </InfoText>
          <InfoText>
            <BoldSpan>Sted: </BoldSpan>
            {event[0].address}
          </InfoText>
          <InfoText>
            <BoldSpan>Kategori: </BoldSpan>
            {categories[event[0].category]}
          </InfoText>
          <ContentText>
            {event[0].information === ""
              ? "Arrangementet har ingen beskrivelse eller program"
              : event[0].information}
          </ContentText>
        </InfoGrid>
        <ArtistsAndMapGrid>
          <ArtistsGrid>
            <ArtistsList artists={artists} />
          </ArtistsGrid>
          <MapGrid>{coords && <Map coords={coords} zoom={14} />}</MapGrid>
        </ArtistsAndMapGrid>
        <TicketsGrid>
          <TicketMenu
            tickets={eventTickets}
            canceled={
              event[0].status === 2 || hasEventHappened(event[0].to_date)
            }
          />
        </TicketsGrid>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};


export default Event;
