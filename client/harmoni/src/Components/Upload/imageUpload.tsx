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
