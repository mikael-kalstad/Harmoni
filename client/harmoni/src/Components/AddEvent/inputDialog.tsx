import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/button";
import TextField from "@material-ui/core/TextField";

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
`;

const DialogBox = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
  margin: auto;
  padding: 70px 30px;
  border-radius: 10px;
  width: 450px;
  height: fit-content;
  background: white;
`;

const Exit = styled.img`
  height: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const Text = styled.p`
  color: #777;
  font-size: 18px;
  font-weight: 400;
  margin: 40px;
`;

interface IProps {
  toggleShow: Function;
  onClick: Function;
  title?: string;
  inputValue?: string;
  btnText: string;
  placeholder: string;
  readOnly?: boolean;
}

// MATERIAL UI input style
const inputStyle = {
  width: "100%",
  margin: "40px 0"
};

const InputDialog = (props: IProps) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  return (
    <>
      <Overlay onClick={() => props.toggleShow()} />

      <DialogBox>
        <Exit src="/icons/cross.svg" onClick={() => props.toggleShow()} />

        <Title>{props.title}</Title>

        {!props.readOnly && (
          <TextField
            style={inputStyle}
            variant="outlined"
            placeholder={props.placeholder}
            id="multiline-static"
            label="Info"
            multiline
            InputLabelProps={{
              shrink: true
            }}
            rows="8"
            error={submit && input.trim() === ""}
            helperText={
              submit && input.trim() === "" && "Tekstfeltet kan ikke være tomt"
            }
            value={input || props.inputValue}
            onChange={e => setInput(e.target.value)}
          />
        )}

        {!props.readOnly && (
          <Button
            disabled={props.readOnly}
            onClick={() => {
              input.trim() !== "" && props.onClick(input);
              setSubmit(true);
            }}
          >
            {props.btnText}
          </Button>
        )}

        {props.readOnly && (
          <Text>{props.inputValue || "Ingen rider info er lagt til ennå"}</Text>
        )}
      </DialogBox>
    </>
  );
};

export default InputDialog;
