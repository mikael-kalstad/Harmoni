import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

const ForgotPassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [warningText, setWarningText] = useState();
  const [submit, setSubmit] = useState();
  const [loading, setLoading] = useState();

  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to Log in if enter key is pressed down
    if (e !== undefined && e.key === "Enter") upload();
  };

  const upload = () => {
    if (oldPassword.trim() === "" || newPassword === "") {
      setWarningText("Ett eller flere felter er tom");
      return;
    }

    // Show loading while waiting for API call
    setLoading(true);
  };

  return (
    <TextField
      style={inputStyle}
      variant="outlined"
      label="Email eller tlf*"
      error={(submit && oldPassword === "") || warningText !== ""}
      helperText={
        submit && oldPassword === "" ? "Skriv inn gammelt passord" : ""
      }
      onChange={e => setOldPassword(e.target.value)}
      onKeyDown={e => checkForEnterKey(e)}
    />
  );
};

export default ForgotPassword;
