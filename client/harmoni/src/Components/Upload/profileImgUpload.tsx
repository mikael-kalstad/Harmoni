import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Wrapper = styled.div`
  display: grid;
  align-items: center;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

interface IImgWrapper {
  warning: boolean;
}

const ImgWrapper = styled.div<IImgWrapper>`
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  border: ${props => props.warning && "1px solid #D45951"};

  :hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }

  :active {
    box-shadow: none;
  }
`;

const ImgPlaceHolder = styled.img`
  width: 50%;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Text = styled.p`
  font-size: 12px;
  color: #d45951;
  margin-top: 5px;
`;

const ImgUpload = (props: { picture?: string; setImgData: Function }) => {
  const [imgLink, setImgLink] = useState();
  const [warning, setWarning] = useState<boolean>(false);

  // Max file size is 2MB
  const MAX_SIZE = 1572864;

  // While image uploads locally
  const [loading, setLoading] = useState();

  const handleChange = e => {
    setLoading(true);

    let file = e.target.files[0];

    if (file.size > MAX_SIZE) {
      setImgLink(undefined);
      setLoading(false);
      setWarning(true);
      return;
    }

    let reader = new FileReader();

    reader.onloadend = () => {
      setImgLink(reader.result);
      props.setImgData(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Wrapper>
        <Input
          accept="image/*"
          id="text-button-file"
          type="file"
          onChange={e => handleChange(e)}
        />
        <label htmlFor="text-button-file">
          <ImgWrapper warning={warning}>
            {imgLink || (props.picture && !warning) ? (
              <ImagePreview src={imgLink || props.picture} />
            ) : loading ? (
              <CircularProgress size={30} />
            ) : (
              <ImgPlaceHolder src={"/icons/imagePlaceHolder.svg"} />
            )}
          </ImgWrapper>
          <Text>{warning && "Bilde for stort"}</Text>
        </label>
      </Wrapper>
    </>
  );
};

export default ImgUpload;
