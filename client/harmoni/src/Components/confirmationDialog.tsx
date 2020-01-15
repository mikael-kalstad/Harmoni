import React from 'react';
import styled from 'styled-components';

const DialogBox = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
  width: 470px;
  height: 240px;
  background: white;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 60px auto 70px;
  align-items: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #444;
  padding: 10px;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #444;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  justify-content: end;
  margin-right: 10px;
`;

interface IBtn {
  action?: boolean;
  onClick: Function;
}

const Btn = styled.button<IBtn>`
  background: ${props => (props.action ? '#df2e06' : 'white')};
  border: ${props => (props.action ? 'none' : '1px solid #777')};
  color: ${props => (props.action ? 'white' : '#777')};
  border-radius: 5px;
  outline: none;
  padding: 9px 15px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  :focus {
    outline: blue;
  }

  :hover {
    filter: brightness(110%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

interface IProps {
  title: string;
  text: string;
  btnActionText: string;
  btnSecondaryText: string;
  actionClick: Function;
  closeDialog: Function;
}

const ConfirmationDialog = (props: IProps) => {
  return (
    <>
      <Overlay onClick={() => props.closeDialog()} />

      <DialogBox>
        <Title>{props.title}</Title>
        <TextWrapper>
          <Text>{props.text}</Text>
        </TextWrapper>

        <ButtonWrapper>
          <Btn onClick={() => props.closeDialog()}>
            {props.btnSecondaryText}
          </Btn>

          <Btn onClick={() => props.actionClick()} action={true}>
            {props.btnActionText}
          </Btn>
        </ButtonWrapper>
      </DialogBox>
    </>
  );
};

export default ConfirmationDialog;
