import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 20px;
  z-index: 1;
`;

const ImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #f0f0f0;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  align-items: start;
  justify-items: start;
`;

const TypeText = styled.p`
  align-self: end;
  width: 30%;
  margin: 0;
  font-size: 28px;
  align-self: end;
  color: #868686;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const Name = styled.p`
  align-self: end;
  width: 30%;
  margin: 0;
  font-weight: 500;
  font-size: 60px;
  width: 80%;

  ::first-letter {
    align-self: end;
    text-transform: uppercase;
  }
`;

const types = ["organizer", "artist", "volunteer"];
const types_translated = ["Arrangør", "Artist/Manager", "Frivillig"];

const ProfilePageImage = (props: any) => (
  <Container>
    <ImgWrapper>
      {props.picture ? (
        <Img src={props.picture} />
      ) : (
        props.picture !== "" && (
          <Skeleton width="250px" height="250px" circle={true} />
        )
      )}
    </ImgWrapper>

    <TextWrapper>
      <TypeText>
        {types_translated[types.indexOf(props.type)] || <Skeleton />}
      </TypeText>
      <Name>{props.name || <Skeleton />}</Name>
    </TextWrapper>
  </Container>
);

export default ProfilePageImage;
