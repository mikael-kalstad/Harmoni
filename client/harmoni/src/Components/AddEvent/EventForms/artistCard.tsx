import React, { useState } from "react";
import styled from "styled-components";
import InputDialog from "../inputDialog";

const Wrapper = styled.div`
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
  user: any;
  remove?: Function;
  riderData?: any;
  setRiderData?: Function;
}

const Artistcard = (props: IProps) => {
  const [showRider, setShowRider] = useState(false);

  const toggleShow = () => setShowRider(!showRider);

  const addRider = text => {
    if (text === "") return;

    toggleShow();

    props.setRiderData([
      ...props.riderData,
      { riderData: text, user_id: props.user.user_id }
    ]);
  };

  // Find riderdata with user id
  const findRiderWithId = (id: number) => {
    let data = props.riderData.find(
      data => data.user_id === props.user.user_id
    );

    if (data === undefined || data.length > 1 || data.length === 0)
      return undefined;

    let riderData = data["riderData"];

    if (riderData !== undefined) return riderData;
  };

  return (
    <>
      {showRider && (
        <InputDialog
          toggleShow={toggleShow}
          onClick={addRider}
          title="Rider Info"
          btnText="LEGG TIL"
          inputValue={findRiderWithId(props.user.user_id)}
          placeholder='- Lokalt øl, laktosefri pizza
          - Konjakk, dram, akkevitt, hjemmebrent
          - Besøk av mor, venn, kjendis
          - Utstyr: gitar, ukelele, gitar band til PS4"'
        />
      )}

      <Wrapper>
        <ImgWrapper>
          {props.user.picture.data && props.user.picture.data.length !== 0 && (
            <ArtistImage
              src={new Buffer(props.user.picture).toString("ASCII")}
            />
          )}
        </ImgWrapper>

        <Name>{props.user.name}</Name>

        {props.riderData && (
          <RiderIcon src="/icons/ridericon.svg" onClick={toggleShow} />
        )}

        {props.remove && (
          <DelBtn
            src="/icons/cross.svg"
            onClick={() => props.remove(props.user)}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Artistcard;
