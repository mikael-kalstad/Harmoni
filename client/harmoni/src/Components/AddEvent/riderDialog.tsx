import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const DialogBox = styled.div`
  position: fixed;
  z-index: 10000;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  background: white;
`;

const Exit = styled.img`
  height: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const RiderDialog = (props: { toggleShow: Function }) => (
  <>
    <Overlay onClick={() => props.toggleShow()} />

    <DialogBox>
      <Exit src="/icons/cross.svg" />
      <p>RIDER COMPONENT GOES HERE</p>
    </DialogBox>
  </>
);

export default RiderDialog;
