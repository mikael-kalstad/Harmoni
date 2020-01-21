import React, { useState } from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import Artistcard from "../AddEvent/EventForms/artistCard";

interface IWrapper {
  empty: boolean;
}

interface attachment {
  attachment_id: number;
  user_id: number;
  event_id: number;
  data: File;
  filename: string;
  filetype: string;
  filesize: number;
}

interface AttachmentListProps {
  attachments: attachment[];
}

const Wrapper = styled.div<IWrapper>`
  border: ${props => (props.empty ? "dashed 3px #bbbbbb" : "none")};
  height: 100%;
  border-radius: 10px;
  /* padding: 10px; */
  ${props => (props.empty ? "display: grid" : "")}
  ${props =>
    props.empty ? "grid-template-rows: 5fr 3fr" : ""}
  align-items: center;
  justify-items: center;
`;

const FilenameText = styled.label`
  font-family: Arial;
  font-size: 20px;
  margin: 0;
  justify-self: start;
  font-weight: bold;
  color: #434343;
`;

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

const LoadingWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 20px;
`;

const LoadingText = styled.p`
  font-size: 24px;
`;

const UnderTitle = styled.h3`
  font-size: 24px;
  margin: 50px 0 20px 0;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin-top: 45px;
  font-size: 16px;
  font-weight: 400;
  color: #777777;
`;

const AttachmentList = (props: any) => {
  console.log(props.attachments);
  console.log("Artists: ", props.artists); console.log("Attachments: ", props.attachments); console.log("userRights: ", props.userRights)
  return (
    <Wrapper empty={!props.attachments || props.attachments.length == 0}>
      <ListGroup>
        {props.attachments.map((attachment, i) => {
          return (
            <ListGroup.Item key={attachment.attachment_id}>
              <img
                width="55px"
                height="55px"
                src="https://cdn0.iconfinder.com/data/icons/popular-files-formats/154/tmp-512.png"
              />
              <FilenameText>{attachment.filename}</FilenameText>
              {/* Manage which users should have access to this attachment.*/}
              <Wrapper
                empty={!props.userRights || props.userRights.length == 0}
              >
                <UnderTitle>Lesetilgang:</UnderTitle>
                {
                props.artists.filter(artist => props.userRights.some(right => {console.log(right.user_id); return artist.user_id === right.user_id})).map(e => {
                  return (
                    <div key={e.user_id}>
                      <Artistcard user={e} />
                    </div>
                  );
                })}
              </Wrapper>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Wrapper>
  );
};

export default AttachmentList;
