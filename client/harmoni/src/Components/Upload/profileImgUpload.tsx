import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
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
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;

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

const ImgUpload = (props: { picture?: string; setImgData: Function }) => {
  const [imgLink, setImgLink] = useState();
  // const [file, setFile] = useState();

  // While image uploads locally
  const [loading, setLoading] = useState();

  const handleChange = e => {
    setLoading(true);
    // setFile(e.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setImgLink(reader.result);
      props.setImgData(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // console.log("File", file);
  console.log("imgLink", imgLink);

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
        </label>
      </Wrapper>
    </>
  );
};

export default ImgUpload;
