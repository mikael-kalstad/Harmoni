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
import { userService } from "../../services/UserService";
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

const WarningText = styled.p`
  font-size: 18px;
  color: #d45951;
  margin: 20px 0;
`;

// Material UI input styling
const inputStyle = {
  width: "100%",
  marginTop: "25px"
};

const Register = (props: { userData?: any; logIn?: Function }) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [tlfInput, setTlfInput] = useState();
  const [passwordInput, setPasswordInput] = useState("");
  const [type, setType] = useState("");
  const [imgData, setImgData] = useState("");
  const [warningText, setWarningText] = useState("");
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const telefonFormat = /^[0-9+]{1,}[0-9-]{8}$/;

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
  }, [props.userData]);

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
    if (e !== undefined && e.key === "Enter")
      props.userData ? save() : register();
  };
  function passwordValidation(thePassword: string) {
    var count = 0;
    count += /[a-z]/.test(thePassword) ? 1 : 0;
    count += /[A-Z]/.test(thePassword) ? 1 : 0;
    count += /\d/.test(thePassword) ? 1 : 0;
    count += /[@]/.test(thePassword) ? 1 : 0;
    count += /[0-9]/.test(thePassword) ? 1 : 0;
    if (count >= 2 && thePassword) {
      return true;
    } else if (count < 2) return false;
  }

  function counter(string) {
    var count = 0;
    string.split("").forEach(function(s) {
      count ? count++ : (count = 1);
    });
    return count;
  }

  function phoneNumberValidation(theNumber: number) {
    if (theNumber !== undefined) {
      if (theNumber.toString().match(telefonFormat)) {
        return true;
      } else return false;
    } else {
      return true;
    }
  }

  // Save changes to user info
  const save = async () => {
    if (!tlfInput.match(telefonFormat)) {
    }
    setSubmit(true);
    if (
      type.trim() === "" ||
      nameInput.trim() === "" ||
      emailInput.trim() === "" ||
      !emailInput.match(mailformat) ||
      !passwordValidation(passwordInput) ||
      !tlfInput.match(telefonFormat)
    )
      return;

    setLoading(true);

    let user = {
      user_id: props.userData.user_id,
      name: nameInput,
      type: type,
      email: emailInput,
      mobile: tlfInput,
      picture: imgData === "" ? undefined : imgData
    };

    let res = await userService.updateUser(user);

    if (!res || res instanceof Error) {
      setLoading(false);
      setWarningText("Noe feil skjedde, sjekk internett tilkoblingen");
    } else {
      props.logIn(emailInput);
      setLoading(false);
      setRedirect(true);
    }
  };

  const register = async () => {
    setSubmit(true);

    if (
      type.trim() === "" ||
      nameInput.trim() === "" ||
      emailInput.trim() === "" ||
      passwordInput.trim() === "" ||
      !emailInput.match(mailformat) ||
      !passwordValidation(passwordInput) ||
      !tlfInput.match(telefonFormat)
    )
      return;

    setLoading(true);

    let res = await loginService.registerPerson(
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
    else if ((res && res.status === 401) || res instanceof Error || !res) {
      setLoading(false);
      setWarningText("Noe feil skjedde, sjekk internett tilkoblingen");
    } else if (res) {
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
              disabled={props.userData ? true : false}
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
              props.userData.picture &&
              new Buffer(props.userData.picture).toString("ascii")
            }
          />
        </TopWrapper>

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Navn*"
          value={nameInput}
          error={
            (submit && nameInput === "") || (submit && counter(nameInput) > 45)
          }
          helperText={
            submit && nameInput === ""
              ? "Navn er påkrevd"
              : submit && counter(nameInput) > 45
              ? "Navn kann ikke ha flere enn 45 bokstaver"
              : ""
          }
          onChange={e => setNameInput(e.target.value)}
          onKeyDown={e => checkForEnterKey(e)}
        />

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Telefon"
          type="number"
          value={tlfInput || ""}
          helperText={
            submit && !phoneNumberValidation(tlfInput)
              ? "Du har git en ugyldig telefonnummer"
              : "Det er valgfritt å oppgi telefonnummer"
          }
          onChange={e => setTlfInput(Number.parseInt(e.target.value))}
          onKeyDown={e => checkForEnterKey(e)}
        />

        <TextField
          style={inputStyle}
          variant="outlined"
          label="Email*"
          type="email"
          value={emailInput}
          error={
            (submit && emailInput === "") ||
            emailWarning !== "" ||
            (submit && !emailInput.match(mailformat)) ||
            (submit && counter(emailInput) > 45)
          }
          helperText={
            submit && emailInput === ""
              ? "Email er påkrevd"
              : submit && !emailInput.match(mailformat)
              ? "Du har oppgitt en ugyldig mail"
              : emailWarning !== ""
              ? emailWarning
              : submit && counter(emailInput) > 45
              ? "mailen kan ikke ha flere enn 45 bokstaver"
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
            error={
              (submit && passwordInput === "") ||
              (submit && !passwordValidation(passwordInput)) ||
              (submit && counter(passwordInput) > 45)
            }
            helperText={
              submit && passwordInput === ""
                ? "Passord er påkrevd"
                : submit && !passwordValidation(passwordInput)
                ? "Passordet må innholde minst en små bokstav og en stor bokstav eller ett tall eller ett tegn"
                : submit && counter(passwordInput) > 45
                ? "passordet kan ikke være flere enn 45 bokstaver"
                : ""
            }
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => checkForEnterKey(e)}
          />
        )}

        <WarningText>{warningText}</WarningText>

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
