import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { isEventInProgress } from './utils';

const StyledLink = styled(props => <Link {...props} />)`
  :hover {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: grid;
  position: relative;
  padding-bottom: 80%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: all 150ms ease;

  ${Container}:hover & {
    background-color: rgba(78, 176, 219, 0.4);
  }
`;

const Category = styled.p`
  position: absolute;
  bottom: 8%;
  font-size: 14px;
  color: #a2a2a2;
  margin-left: 5px;
  width: 30%;
  text-overflow: ellipsis;

  ::first-letter {
    text-transform: capitalize;
  }
`;

const Title = styled.h3`
  position: absolute;
  height: 10%;
  bottom: 0;
  font-weight: 600;
  font-size: 16px;
  color: black;
  margin-left: 5px;
  width: 70%;

  ::first-letter {
    text-transform: capitalize;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  background: #efefef;
  border-radius: 10px;
`;

interface IOverlayText {
  ongoing?: boolean;
}

const OverlayText = styled.p<IOverlayText>`
  font-size: 40px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props =>
    props.ongoing ? 'rgba(87, 190, 61, 0.7);' : 'rgba(213, 89, 81, 0.9)'};
`;

const InfoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: all 150ms ease;
  background-color: rgba(0, 0, 0, 0.6);
  display: grid;
  align-items: center;
  justify-items: center;
`;

const ArrangementCard = (props: any) => {
  let eventInProgress = isEventInProgress(props.fromDate, props.toDate);

  const card = (
    <Container>
      <Wrapper>
        {props.status !== undefined && (props.status === 2 || eventInProgress) && (
          <InfoOverlay>
            <OverlayText ongoing={eventInProgress}>
              {eventInProgress ? 'Pågående' : props.status === 2 && 'Avlyst'}
            </OverlayText>
          </InfoOverlay>
        )}

        {/* Only show overlay if event has status 'coming' = 0 */}
        {props.picture && <Overlay />}
        {props.picture && props.picture.data.length > 0 && (
          <Img
            src={new Buffer(props.picture, 'base64').toString('ascii')}
            alt={props.title}
          />
        )}

        {/* Lazy load image until props.img is defined */}
        {!props.picture && <Skeleton height="100%" />}
      </Wrapper>

      <Category>{props.category || <Skeleton />}</Category>
      <Title>{props.title || <Skeleton />}</Title>
    </Container>
  );

  if (props.id) {
    return (
      <StyledLink
        to={'/event/' + (props.eventInProfile ? 'details/' : '') + props.id}
      >
        {card}
      </StyledLink>
    );
  }

  return card;
};

export default ArrangementCard;
