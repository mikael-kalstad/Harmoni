import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button/button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { loginService } from "../../services/loginService";
import { Redirect } from "react-router-dom";
import ImgUpload from "../Upload/profileImgUpload";

const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 400px;
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: end;
  align-items: center;
`;

const BtnWrapper = styled.div`
  margin-top: 65px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin: 50px;
`;

// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

interface User {
  userId: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: string;
}

const Register = (props: { userData?: any; logIn?: Function }) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [tlfInput, setTlfInput] = useState();
  const [passwordInput, setPasswordInput] = useState("");
  const [type, setType] = useState("");
  const [imgData, setImgData] = useState("");

  // User already registered warning for email
  const [emailWarning, setEmailWarning] = useState("");

  // Redirect to page if registration is successfull
  const [redirect, setRedirect] = useState(false);

  // Show loading while waiting async API call
  const [loading, setLoading] = useState(false);

  // Used to display error on empty input when submitting
  const [submit, setSubmit] = useState(false);

  // Render all types in array
  const types_translated = ["Arrangør", "Artist/Manager", "Frivillig"];
  const types = ["organizer", "artist", "volunteer"];

  useEffect(() => {
    if (props.userData) {
      // Phone is optional
      if (props.userData["phone"]) setTlfInput(props.userData[0]["phone"]);

      // All other inputs are required
      setNameInput(props.userData["name"]);
      setEmailInput(props.userData["email"]);
      setType(props.userData["type"]);
    }
  });

  let menuItems: JSX.Element[] = [];

  for (let i = 0; i < types.length; i++) {
    menuItems.push(
      <MenuItem key={i} value={types[i]}>
        {types_translated[i]}
      </MenuItem>
    );
  }

  // Check if enter key is clicked
  const checkForEnterKey = (e: { key: string } | undefined) => {
    // Try to register if enter key is pressed down
    if (e !== undefined && e.key === "Enter") register();
  };

  // Save changes to user info
  const save = async () => {
    setSubmit(true);

    if (
      type.trim() === "" ||
      nameInput.trim() === "" ||
      emailInput.trim() === ""
    )
      return;

    setLoading(true);

    let user = {
      name: nameInput,
      type: type,
      email: emailInput
    };

    // let res = userService.updateUser();
  };

  const register = async () => {
    setSubmit(true);

    if (
      type.trim() === "" ||
      nameInput.trim() === "" ||
      emailInput.trim() === "" ||
      passwordInput.trim() === ""
    )
      return;

    setLoading(true);

    let res = await loginService.registrerPerson(
      nameInput,
      emailInput,
      tlfInput,
      passwordInput,
      type,
      imgData.toString()
    );

    // Status code 409 indicates that the email is already registered
    if (res && res.status === 409) {
      setEmailWarning("Email er allerede registrert");
      setLoading(false);
    }

    // Status code 401 indicates that something went wrong
    else if (res && res.status !== 401) {
      if (props.logIn !== undefined) props.logIn(emailInput);
      setRedirect(true);
      setLoading(false);
    }
  };

  // If registration is successfull
  if (redirect) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <Title>{props.userData ? "Endre Profil" : "Registrer bruker"}</Title>
      <Wrapper>
        <TopWrapper>
          <FormControl
            variant="outlined"
            error={submit && type === ""}
            style={{ width: "160px" }}
          >
            <InputLabel id="demo-simple-select-filled-label">Type*</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              value={type}
              labelWidth={300}
              onChange={(e: any) => setType(e.target.value)}
            >
              {menuItems}
            </Select>

            {submit && type === "" && (
              <FormHelperText>Type er påkrevd</FormHelperText>
            )}
          </FormControl>
          <ImgUpload
            setImgData={setImgData}
            picture={
              props.userData &&
              new Buffer(props.userData.picture).toString("ascii")
            }
          />
        </TopWrapper>

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Navn*"
          value={nameInput}
          error={submit && nameInput === ""}
          helperText={submit && nameInput === "" ? "Navn er påkrevd" : ""}
          onChange={e => setNameInput(e.target.value)}
          onKeyDown={e => checkForEnterKey(e)}
        />

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Telefon"
          type="number"
          value={tlfInput}
          helperText="Det er valgfritt å oppgi telefonnummer"
          onChange={e => setTlfInput(Number.parseInt(e.target.value))}
          onKeyDown={e => checkForEnterKey(e)}
        />

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Email*"
          type="email"
          value={emailInput}
          error={(submit && emailInput === "") || emailWarning !== ""}
          helperText={
            submit && emailInput === ""
              ? "Email er påkrevd"
              : emailWarning !== ""
              ? emailWarning
              : ""
          }
          onChange={e => setEmailInput(e.target.value)}
          onKeyDown={e => checkForEnterKey(e)}
        />

        {/* Only render password box if user is registrating, not changing info */}
        {!props.userData && (
          <TextField
            style={inputStyle}
            variant="outlined"
            label={"Passord*"}
            type="password"
            value={passwordInput}
            error={submit && passwordInput === ""}
            helperText={
              submit && passwordInput === "" ? "Passord er påkrevd" : ""
            }
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
        )}

        <BtnWrapper>
          <Button
            loading={loading}
            onClick={() => (props.userData ? save() : register())}
          >
            {props.userData ? "LAGRE" : "OPPRETT KONTO"}
          </Button>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

export default Register;
