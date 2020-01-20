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

interface IDialogBox {
  width: string;
  height: string;
}

const DialogBox = styled.div<IDialogBox>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
  width: ${props => props.width};
  height: ${props => props.height};
  background: white;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 60px auto 70px;
  align-items: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Exit = styled.img`
  height: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const DialogGrid = styled.div`
  display: grid;
  margin: auto;
`;

interface IProps {
  width: string;
  height: string;
  children?: React.ReactNode;
  closeDialog: Function;
}

const InfoDialog = (props: IProps) => {
  return (
    <>
      <Overlay onClick={() => props.closeDialog()} />
      <DialogBox width={props.width} height={props.height}>
        <Exit src="/icons/cross.svg" onClick={() => props.closeDialog()} />
        <DialogGrid>
          <div>{props.children}</div>
        </DialogGrid>
      </DialogBox>
    </>
  );
};

export default InfoDialog;
