import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import Artistcard from "../AddEvent/EventForms/artistCard";
import { FaFileDownload } from "react-icons/fa";
import { attachmentService } from "../../services/AttachmentService";

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

const AttachmentWrapper = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  justify-items: center;
`;

const AttachmentList = (props: any) => {
  useEffect(() => {}, [props]);

  const downloadAttachment = attachment => () => {
    attachmentService
      .downloadAttachment(attachment.attachment_id)
      .then(data => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", attachment.filename);
        document.body.appendChild(link);
        link.click();
      });
  };

  const jsx = (
    <ListGroup>
      {props.attachments.map((attachment, i) => {
        let rights = props.userRights.find(right => {
          return right.attachment.filename == attachment.filename;
        });

        if (rights === undefined || rights === [] || rights === null)
          return null;

        const children = (
          <Wrapper empty={!props.userRights || props.userRights.length == 0}>
            <UnderTitle>Lesetilgang:</UnderTitle>
            {rights.users !== null && rights.users !== undefined ? (
              rights.users.map(e => {
                return (
                  <div key={e.user_id}>
                    <Artistcard artist={e} />
                  </div>
                );
              })
            ) : (
              <Text>Feil ved henting av lesetilganger</Text>
            )}
          </Wrapper>
        );
        return (
          <AttachmentWrapper>
            <ListGroup.Item key={attachment.attachment_id}>
              {/*             <img
              width="55px"
              height="55px"
              src="https://cdn0.iconfinder.com/data/icons/popular-files-formats/154/tmp-512.png"
            /> */}
              <FilenameText>{attachment.filename}</FilenameText>
              {props.readOnly ? (
                <FaFileDownload
                  style={{ cursor: "pointer" }}
                  title="Last ned vedlegg."
                  size="4em"
                  onClick={downloadAttachment(attachment)}
                />
              ) : null}
              {children}
            </ListGroup.Item>
          </AttachmentWrapper>
        );
      })}
    </ListGroup>
  );
  return (
    <Wrapper empty={!props.attachments || props.attachments.length == 0}>
      {jsx}
    </Wrapper>
  );
};

export default AttachmentList;
