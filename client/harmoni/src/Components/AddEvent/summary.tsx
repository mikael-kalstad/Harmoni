import React from "react";
import styled from "styled-components";
import ArtistList from "../Event/artistsList";
import TicketCard from "./EventForms/ticketCard";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 5px;
`;

const ImgPlaceHolder = styled.img`
  height: 50%;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
`;

const UnderTitle = styled.h3`
  font-size: 20px;
  margin-top: 50px;

  font-weight: 500;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #777777;
  margin-top: 10px;
`;

const formatDate = (date: any) => {
  if (typeof date === "string")
    date = moment(date, "DD-MM-YYYY HH:mm").toDate();

  let days = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag"
  ];

  let months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  return (
    days[date.getDay()] +
    " " +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "." +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    " KL: " +
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
};

interface IProps {
  name: string;
  img: any;
  category: string;
  location: string;
  fromDate: string | Date;
  toDate: string | Date;
  program: string;
  artists: any[];
  tickets: any[];
  riders: any[];
}

const Summary = (props: IProps) => (
  <Wrapper>
    <Title>Oppsummering</Title>

    <UnderTitle>Navn på arrangement:</UnderTitle>
    <Text>{props.name || "Navn er ikke oppgitt"}</Text>

    <UnderTitle>Bilde</UnderTitle>
    <ImgWrapper>
      {props.img ? (
        <ImagePreview src={props.img} />
      ) : (
        <ImgPlaceHolder src="/icons/imagePlaceholder.svg" />
      )}
    </ImgWrapper>

    <UnderTitle>Kategori:</UnderTitle>
    <Text>{props.category || "Kategori ikke valgt"}</Text>

    <UnderTitle>Lokasjon:</UnderTitle>
    <Text>{props.location || "Lokasjon er ikke oppgitt"}</Text>

    <UnderTitle>Dato og tid:</UnderTitle>
    {props.fromDate === null || props.toDate === null ? (
      <Text>"Dato og tid er ikke oppgitt" </Text>
    ) : (
      <>
        <Text>{"Fra: " + formatDate(props.fromDate)}</Text>
        <Text>{"Til: " + formatDate(props.toDate)}</Text>
      </>
    )}

    <UnderTitle>Artister:</UnderTitle>
    {!props.artists || props.artists.length === 0 ? (
      <Text>Ingen artister er valgt</Text>
    ) : (
      <ArtistList
        hideTitle={true}
        artists={props.artists}
        riderData={props.riders}
      />
    )}

    <UnderTitle>Billetter:</UnderTitle>
    {!props.tickets || props.tickets.length === 0 ? (
      <Text>Ingen billetter er opprettet</Text>
    ) : (
      props.tickets.map(ticket => (
        <ListGroup key={ticket.ticket_id}>
          <TicketCard ticket={ticket} />
        </ListGroup>
      ))
    )}
  </Wrapper>
);

export default Summary;
