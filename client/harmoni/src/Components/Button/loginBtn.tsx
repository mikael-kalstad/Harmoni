import React, { useState } from "react";
import Login from "../login";
import OutlineButton from "./outlineButton";

interface IProps {
  logIn?: Function;
  width?: string;
  height?: string;
  color?: string;
}

const LoginBtn = (props: IProps) => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <OutlineButton
        onClick={toggleDisplay}
        solid={true}
        width={props.width}
        height={props.height}
      >
        Logg inn
      </OutlineButton>

      {/* Only display login popup if display(state) is true */}
      {display && <Login logIn={props.logIn} toggle={toggleDisplay} />}
    </>
  );
};

export default LoginBtn;
