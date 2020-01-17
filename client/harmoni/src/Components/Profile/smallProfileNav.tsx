import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 80px auto;
  padding: 10px;
  background: #f0f0f0;
  width: fit-content;

  :hover {
    filter: brightness(98%);
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  background: white;
  border-radius: 50%;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin-left: 10px;
  margin-right: 30px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 15px;
  margin: 0;
  align-self: end;
  color: black;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UnderText = styled.p`
  font-size: 15px;
  color: #868686;
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

const SmallProfileNav = (props: { picture: any; name: string }) => (
  <StyledLink to="/profile">
    <Container>
      <Wrapper>
        {props.picture && props.picture.data.length > 0 && (
          <Img src={new Buffer(props.picture, "base64").toString("ascii")} />
        )}
      </Wrapper>

      <TextWrapper>
        <Text>{props.name}</Text>
        <UnderText>Min side</UnderText>
      </TextWrapper>
    </Container>
  </StyledLink>
);

export default SmallProfileNav;
