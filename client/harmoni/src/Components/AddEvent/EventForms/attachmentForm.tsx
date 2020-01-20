import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { userService } from "../../../services/UserService";
import styled from "styled-components";
import ArtistCard from "./artistCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { attachmentService } from "../../../services/AttachmentService";
import { isNullOrUndefined } from "util";
import AttachmentList from "../../Event/attachmentList";

interface attachment {
  attachment_id: number;
  user_id: number;
  event_id: number;
  data: File;
  filename: string;
  filetype: string;
  filesize: number;
}
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  align-items: center;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 30%;
`;

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

const AttachmentForm = (props: any) => {
  const [currAttachment, setCurrAttachment] = useState<attachment>(null);
  const [readyToUpload, setReadyToUpload] = useState<boolean>(false);
  const [fileInputName, setFileInputName] = useState<string>("");
  const [tempAttachmentRights, setTempAttachmentRights] = useState([]);

  const [listOfArtists, setListOfArtists] = useState<IUser[]>([]);

  useEffect(() => {
    setListOfArtists(props.listOfArtists);
    console.log(listOfArtists);
  }, []);

  //Add attachment and all the assosiated user-rights.
  const addAttachment = (file: attachment) => {
    if (!file)
      console.log("File is undefined or null, button should be disabled");
    let exists = props.listOfAttachments.includes(file);
    if (!exists) {
      props.setListOfAttachments(array => [...array, file]);
      props.setListOfAttachmentsRights(array => [
        ...array,
        tempAttachmentRights
      ]);
      setTempAttachmentRights([]);
      setCurrAttachment(null);
    } else {
      //TODO: Display error
    }
    setReadyToUpload(false);
    console.log(fileInputName);
    setFileInputName("");
  };

  //Remove attachment and all assosiated user-rights for the attachment
  const removeAttachment = file => {
    if (file != null) {
      props.setListOfAttachments(
        props.listOfAttachments.filter(
          e => e.filename !== file.filename && e.filesize == file.filesize
        )
      );
    }
  };

  const addUser = user => {
    let userRight = {
      user: user,
      attachment: currAttachment
    };
    if (user != null) {
      let exists = tempAttachmentRights.some(
        e =>
          e.user.user_id == userRight.user.user_id &&
          e.attachment.filename == userRight.attachment.filename
      );
      let array = tempAttachmentRights;
      array.push(userRight);
      if (!exists) setTempAttachmentRights(array);
    }
  };

  const removeUser = (attachment, user) => {
    let userRight = {
      user: user,
      attachment: attachment
    };

    let indexOfFile;
    //Find the correct file
    let files = props.listOfAttachmentsRights.map((e, i) => {
        console.log(e);
      return e.filter(
        e => {
            console.log(e);
            return e.attachment.filename === userRight.attachment.filename
        }
      );
    });

    //Remove the user from the access list
    files = files.filter(e => {
        console.log(e);
        return e.user_id != user.user_id
    });
    props.listOfAttachmentsRights[indexOfFile] = files;
    props.setListOfAttachmentsRights(array => [...array]);
  };

  const getUsersforAttachment = attachment_filename => {
    return props.listOfAttachmentsRights.filter(e => {
      console.log(e);
      console.log(attachment_filename);
      return attachment_filename == e[0].attachment.filename;
    });
  };

  const handleChange = e => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) return;
    // setFile(e.target.files[0]);

    let reader = new FileReader();
    let file = e.target.files[0];
    const filename = file.name;
    const filesize = file.size;
    const filetype = file.type;

    reader.onloadend = () => {
      console.log("Uploaded file...", reader);
      console.log("Upload result: ", reader.result);
      let att: attachment = {
        attachment_id: -1,
        data: file,
        event_id: -1,
        filename: filename,
        filesize: filesize,
        filetype: filetype,
        user_id: -1
      };
      console.log("The attachment: ", att);
      setCurrAttachment(att);
    };
    reader.readAsBinaryString(e.target.files[0]);
    setReadyToUpload(true);
  };

  return (
    <>
      <Title>Vedlegg</Title>
      <Text>
        Du kan legge til og endre vedlegg og hvem som skal ha tilgang til disse
        ved å redigere arrangementet i min side.
      </Text>
      <UnderTitle>Legg til vedlegg:</UnderTitle>
      {/* Input type file, ListGroup with ArtistCards? */}
      <Wrapper>
        <input
          style={{
            borderRadius: "50px",
            borderStyle: "solid",
            margin: "10px"
          }}
          accept="*/*"
          id="attachment-upload"
          type="file"
          formEncType="multipart/form-data"
          value={fileInputName}
          onChange={e => handleChange(e)}
        />
        <Title>Lesetilgang:</Title>
        <UnderTitle>Legg til brukere som skal ha tilgang</UnderTitle>
        {readyToUpload ? (
          <>
            <Typeahead
              id="choose-attachment-rights"
              labelKey={artistName => {
                return artistName.name;
              }}
              options={listOfArtists.map(user => user)}
              onChange={s => addUser(s[0])}
              placeholder="Søk etter brukere..."
              emptyLabel="Du må legge til artister i steg 2."
            />
            {tempAttachmentRights.map(e => {
              /*               console.log(e);
              console.log(e.user);
              console.log(e.user.name);
              console.log(props.listOfAttachmentsRights); */
              return <Text key={e.user.user_id}>{e.user.name}</Text>;
            })}
          </>
        ) : null}

        <input
          type="submit"
          value="Legg til"
          disabled={!readyToUpload}
          onClick={e => addAttachment(currAttachment)}
        />
      </Wrapper>
      <UnderTitle>Vedleggsliste:</UnderTitle>
      <ListGroup>
        {props.listOfAttachments.map(e => {
          let users = getUsersforAttachment(e.filename);
          console.log(e);
          let RightsJSX = users.map(data => {
            console.log(data);
            return data.map(e => {
                console.log(e)
              return (
                <>
                  <Text>{e.user.name}</Text>
                  <DelBtn
                    src="/icons/cross.svg"
                    onClick={() => removeUser(e, e.user)}
                  />
                </>
              );
            });
          });
          return (
            <div>
              <Text>{e.filename}</Text>
              <div>{RightsJSX}</div>
            </div>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AttachmentForm;
