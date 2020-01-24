import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import Artistcard from "../AddEvent/EventForms/artistCard";
import { FaFileDownload, FaFileAlt } from "react-icons/fa";
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

const FileCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

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

const FilenameText = styled.p`
  font-family: Arial;
  font-size: 18px;
  margin: 0;
  justify-self: start;
  font-weight: bold;
  color: #434343;

  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
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
          <ListGroup.Item>
            <div key={attachment.filename}>
              <FileCard>
                <FaFileAlt style={{ justifySelf: "center" }} size="2em" />
                <FilenameText>{attachment.filename}</FilenameText>
                {!props.attachments.every(e => e.attachment_id == -1) ? (
                  <FaFileDownload
                    style={{ cursor: "pointer", justifySelf: "center" }}
                    title="Last ned vedlegg."
                    size="2em"
                    onClick={downloadAttachment(attachment)}
                  />
                ) : null}
              </FileCard>
              {children}
            </div>
          </ListGroup.Item>
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
