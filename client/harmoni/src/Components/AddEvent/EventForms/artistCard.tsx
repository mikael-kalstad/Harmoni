import React from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 10%;
  align-items: center;
  justify-items: center;
`;

const ImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
`;

const ArtistImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.p`
  font-size: 20px;
  margin: 0 0 0 15px;
  justify-self: start;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 30%;
`;

interface IProps {
  user: any;
  remove: Function;
}

const Artistcard = (props: IProps) => (
  <ListGroup.Item>
    <Wrapper>
      <ImgWrapper>
        {props.user.picture.data && props.user.picture.data.length !== 0 && (
          <ArtistImage src={new Buffer(props.user.picture).toString("ASCII")} />
        )}
      </ImgWrapper>

      <Name>{props.user.name}</Name>

      <DelBtn src="/icons/cross.svg" onClick={() => props.remove(props.user)} />
    </Wrapper>
  </ListGroup.Item>
);

export default Artistcard;
