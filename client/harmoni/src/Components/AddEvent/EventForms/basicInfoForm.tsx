import React, { useState } from "react";
import styled from "styled-components";
import DateTimePicker from "./dateTimePicker";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ImageUpload from "../../Upload/imageUpload";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const UnderTitle = styled.h5`
  margin: 25px 0 15px 0;
`;

const MiniTitle = styled.h6`
  margin: 15px 0 10px 0;
`;

const inputStyle = {
  width: "100%",
  marginBottom: "25px"
};

interface IProps {
  // name: string;
  // setName: Function;
  // imgData: string;
  // setImgData: Function;
  // category: string;
  // setCategory: Function;
  // location: string;
  // setLocation: Function;
  // fromDateTime: Date;
  // setFromDateTime: Function;
  // toDateTime: Date;
  // setToDateTime: Function;
  infoSubmit: boolean;
  setInfoCompleted: Function;
}

const BasicInfoForm = (props: IProps) => {
  const [name, setName] = useState("");
  const [imgData, setImgData] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [fromDateTime, setFromDateTime] = useState<Date | null>(null);
  const [toDateTime, setToDateTime] = useState<Date | null>(null);

  const types_translated = ["Konsert", "Festival", "Teater", "Standup"];
  const types = ["concert", "festival", "theatre", "standup"];

  let menuItems: JSX.Element[] = [];

  for (let i = 0; i < types.length; i++) {
    menuItems.push(
      <MenuItem key={i} value={types[i]}>
        {types_translated[i]}
      </MenuItem>
    );
  }

  const checkInputs = () =>
    name !== "" ||
    category !== "" ||
    location !== "" ||
    fromDateTime !== null ||
    toDateTime !== null;

  if (props.infoSubmit && checkInputs()) {
    props.setInfoCompleted(true);
  }

  return (
    <>
      <Title>Info</Title>
      <UnderTitle>Navn på arrangement*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Navn"
        error={props.infoSubmit && name === ""}
        helperText={props.infoSubmit && name === "" ? "Navn er påkrevd" : ""}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <UnderTitle>Bilde</UnderTitle>
      <ImageUpload setImgData={setImgData} />

      <UnderTitle>Kategori*</UnderTitle>
      <FormControl
        variant="outlined"
        style={{ width: "160px" }}
        error={props.infoSubmit && category === ""}
      >
        <InputLabel id="select-filled-label">Kategori*</InputLabel>
        <Select
          labelId="select-outlined-label"
          value={category}
          labelWidth={300}
          style={inputStyle}
          onChange={(e: any) => setCategory(e.target.value)}
        >
          {menuItems}
        </Select>
        {props.infoSubmit && category === "" && (
          <FormHelperText>Kategori er påkrevd</FormHelperText>
        )}
      </FormControl>

      <UnderTitle>Lokasjon*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Lokasjon"
        value={location}
        error={props.infoSubmit && location === ""}
        helperText={
          props.infoSubmit && location === "" ? "Lokasjon er påkrevd" : ""
        }
        onChange={e => setLocation(e.target.value)}
      />

      <UnderTitle>Dato og tid*</UnderTitle>
      <MiniTitle>Fra</MiniTitle>
      <DateTimePicker
        minDate={new Date()}
        disablePast={true}
        style={inputStyle}
        selectedDate={fromDateTime}
        setSelectedDate={setFromDateTime}
        error={true}
      />
      <MiniTitle>Til</MiniTitle>
      <DateTimePicker
        fullWidth
        style={inputStyle}
        selectedDate={toDateTime}
        setSelectedDate={setToDateTime}
      />
      {props.infoSubmit && <p>Fyll inn alle inputs!</p>}
    </>
  );
};

export default BasicInfoForm;
