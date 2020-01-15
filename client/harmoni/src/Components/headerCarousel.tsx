import React from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./carousel.css";

const Img = styled.img`
  height: 450px;
  max-height: 450px;
  object-fit: cover;
`;

const Wrapper = styled.div`
  height: 450px;
  max-height: 450px;
  background: #f1f1f9;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0));
`;

interface ITitle {
  dark: boolean;
}

const Title = styled.h3<ITitle>`
  color: ${props => (props.dark ? "black" : "white")};
  width: 60%;
  margin: auto;

  ::first-letter {
    text-transform: capitalize;
  }
`;

const HeaderCarousel = (props: any) => {
  let items: JSX.Element[] = [];

  const card = (a: any) => (
    <div key={a.event_id}>
      <Wrapper>
        {a.picture && (
          <>
            <Overlay />
            <Img
              className="d-block w-100"
              src={new Buffer(a.picture, "base64").toString("ascii")}
              alt={a.name}
            />
          </>
        )}

        {!a.picture && !a.name && (
          <SkeletonTheme color={"#F1F1F9"}>
            <Skeleton height="450px" />
          </SkeletonTheme>
        )}
      </Wrapper>

      <Carousel.Caption>
        <Title dark={a.picture === undefined}>{a.name}</Title>
      </Carousel.Caption>
    </div>
  );

  // Lazy load carousel if data is not defined/loaded in props
  items.push(<Carousel.Item key={1876}>{card([])}</Carousel.Item>);

  // Load carousel with data if it is defined
  if (props && props.data && props.data !== undefined) {
    // Remove lazy loading cards
    items = [];

    for (let i = 0; i < 3; i++) {
      let a = props.data[i];
      items.push(
        <Carousel.Item key={a.event_id}>
          <Link to={"/event/" + a.event_id}>{card(a)}</Link>
        </Carousel.Item>
      );
    }
  }

  return <Carousel>{items}</Carousel>;
};

export default HeaderCarousel;
