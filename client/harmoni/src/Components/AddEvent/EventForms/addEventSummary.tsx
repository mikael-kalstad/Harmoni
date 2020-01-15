import React from "react";
import styled from "styled-components";
import ArtistsList from "../../Event/artistsList";

const Wrapper = styled.div`
  
`;

const ImageGrid = styled.div`
  justify-items: center;

  @media screen and (max-width: 800px) {
    margin: auto;
    margin-top: 10px;
    width: 70%;
  }
`;

const InfoGrid = styled.div`
  margin: 0 20px;
`;

const ArtistsAndMapGrid = styled.div`
  display: grid;
  margin: 20px 20px;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const ArtistsGrid = styled.div`
  justify-self: start;
  border-radius: 10px;
  height: 100%;
  @media screen and (max-width: 800px) {
    justify-self: center;
  }
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

const DoubleColumnGrid = styled.div`
  margin: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
`;

const DateText = styled.p`
  color: grey;
  justify-self: end;
`;

const AddressText = styled.p`
  color: grey;
`;

const OrganizerText = styled.p``;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const ContentText = styled.p`
  font-size: 20px;
  color: #535353;
  white-space: pre-wrap;
`;

interface IEvent {
    img : any;
    location : string;
    fromDate : string;
    toDate : string;
    name : string;
    program : string;
    artists : [];
}

const AddEventSummary = (props: IEvent) => {

    return (
        <Wrapper>
            <ImageGrid>
                <EventImage
                    src={props.img}
                    alt='hei'
                />
                <DoubleColumnGrid>
                    <AddressText>{props.location}</AddressText>
                    <DateText>{props.fromDate}</DateText>
                </DoubleColumnGrid>
            </ImageGrid>
            <InfoGrid>
                <Title>{props.name}</Title>
                <OrganizerText>Arrangør: DU!</OrganizerText>
                {props.program ?
                    (<ContentText>{props.program}</ContentText>
                    ) : (
                        <ContentText>'Du har ikke lagt inn et program'</ContentText>
                    )
                }
            </InfoGrid>
            <ArtistsAndMapGrid>
                <ArtistsGrid>
                    {props.artists ?
                        (<ArtistsList artists={props.artists}/>
                        ) : (
                            <p>Du har ikke lagt til noen artister</p>
                        )
                    }
                    <ArtistsList artists={props.artists}/>
                </ArtistsGrid>
            </ArtistsAndMapGrid>
        </Wrapper>
    );
};

export default AddEventSummary;
