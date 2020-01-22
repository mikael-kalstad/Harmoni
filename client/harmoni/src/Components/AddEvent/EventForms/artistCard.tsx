import React, { useState } from "react";
import styled from "styled-components";
import InputDialog from "../inputDialog";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 1fr 12% 12%;
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
  font-family: Arial;
  font-weight: bold;
  color: #434343;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 30%;
`;

const RiderIcon = styled.img`
  cursor: pointer;
  height: 40%;
`;

interface IProps {
  artist: any;
  remove?: Function;
  riderData?: any;
  setRiderData?: any;
  readOnly?: boolean;
  eventId?: number;
  userData?: any;
}

const Artistcard = (props: IProps) => {
  const [showRider, setShowRider] = useState<boolean>(false);

  const toggleShow = () => setShowRider(!showRider);

  const addRider = async text => {
    if (text.trim() === "") return;

    // Get rider data to specified user
    let data = findRiderWithId(props.artist.user_id);

    toggleShow();
    console.log(data);
    // Check if rider is already created
    if (data !== undefined) {
      data = data["text"];
      let newData = props.riderData;
      newData.forEach(data => {
        if (data.user_id === props.artist.user_id) data["text"] = text;
      });

      props.setRiderData([...newData]);
      return;
    }

    props.setRiderData([
      ...props.riderData,
      { text: text, user_id: props.artist.user_id }
    ]);
  };

  // Find riderdata with user id
  const findRiderWithId = (id: number) => {
    if (!props.riderData) return undefined;

    let data = props.riderData.find(
      data => data.user_id === props.artist.user_id
    );

    if (data === undefined || data.length > 1 || data.length === 0)
      return undefined;

    return data;
  };

  const getTextWithId = (id: number) => {
    let data = findRiderWithId(id);

    if (!data || data === undefined || data["text"] === undefined)
      return undefined;
    return data["text"];
  };

  const showRiderIcon = () => {
    if (props.setRiderData !== undefined) return true;
    if (props.userData === undefined) return false;

    return (
      props.userData.type === "organizer" ||
      props.userData.user_id === props.artist.user_id
    );
  };

  return (
    <>
      {showRider && (
        <InputDialog
          toggleShow={toggleShow}
          onClick={addRider}
          title="Rider Info"
          btnText={
            findRiderWithId(props.artist.user_id) === undefined
              ? "LEGG TIL"
              : "LAGRE"
          }
          inputValue={getTextWithId(props.artist.user_id)}
          placeholder='- Lokalt øl, laktosefri pizza
          - Konjakk, dram, akkevitt, hjemmebrent
          - Besøk av mor, venn, kjendis
          - Utstyr: gitar, ukelele, gitar band til PS4"'
          readOnly={props.readOnly}
        />
      )}

      <Wrapper>
        <ImgWrapper>
          {props.artist.picture.data &&
            props.artist.picture.data.length !== 0 && (
              <ArtistImage
                src={new Buffer(props.artist.picture).toString("ASCII")}
              />
            )}
        </ImgWrapper>

        <Name>{props.artist.name}</Name>

        {props.riderData && showRiderIcon() && (
          <RiderIcon src="/icons/ridericon.svg" onClick={toggleShow} />
        )}

        {props.remove && (
          <DelBtn
            src="/icons/cross.svg"
            onClick={() => props.remove(props.artist)}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Artistcard;
