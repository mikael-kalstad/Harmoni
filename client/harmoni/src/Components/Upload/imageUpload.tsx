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

const ImgWrapper = styled.div`
  width: 400px;
  height: 200px;
  background: #f0f0f0;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    filter: brightness(95%);
  }

  :active {
    filter: brightness(98%);
  }
`;

const ImgPlaceHolder = styled.img`
  height: 50%;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #d45951;
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
      setLoading(false);
      setWarning(false);
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
          <ImgWrapper>
            {imgLink || props.picture ? (
              <ImagePreview src={imgLink || props.picture} />
            ) : loading ? (
              <CircularProgress size={30} />
            ) : (
              <ImgPlaceHolder src={"/icons/imagePlaceHolder.svg"} />
            )}
          </ImgWrapper>
          <Text>{warning && "Bildet er for stort, velg et annet"}</Text>
        </label>
      </Wrapper>
    </>
  );
};

export default ImgUpload;
