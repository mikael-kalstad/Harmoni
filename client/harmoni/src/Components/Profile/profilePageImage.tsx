import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 20px;
  /* background: #f0f0f0; */
  /* overflow: hidden; */
  z-index: 1;

  :hover {
    filter: brightness(98%);
  }
`;

const ImgWrapper = styled.div`
  /* margin: 20px; */
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  /* margin: 20px; */
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
  /* font-style: italic; */
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

const StyledLink = styled(props => <Link {...props} />)`
  :visited {
    color: black;
  }

  :hover {
    color: black;
    text-decoration: none;
  }
`;

const ProfilePageImage = (props: any) => (
  <Container>
    <ImgWrapper>
      {props.picture ? (
        <Img src={props.picture} />
      ) : (
        <Skeleton width="250px" height="250px" circle={true} />
      )}
    </ImgWrapper>

    <TextWrapper>
      <TypeText>{props.type || <Skeleton />}</TypeText>
      <Name>{props.name || <Skeleton />}</Name>
    </TextWrapper>
  </Container>
);

export default ProfilePageImage;
