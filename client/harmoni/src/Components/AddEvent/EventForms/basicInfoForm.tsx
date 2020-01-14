import React, { useState } from "react";
import styled from "styled-components";
import DateTimePicker from "./dateTimePicker";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
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
  name: string;
  setName: Function;
  imgData: string;
  setImgData: Function;
  category: string;
  setCategory: Function;
  location: string;
  setLocation: Function;
  fromDateTime: Date;
  setFromDateTime: Function;
  toDateTime: Date;
  setToDateTime: Function;
}

const BasicInfoForm = (props: IProps) => {
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

  return (
    <>
      <Title>Info</Title>
      <UnderTitle>Navn på arrangement*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Navn"
        value={props.name}
        onChange={e => props.setName(e.target.value)}
      />

      <UnderTitle>Bilde</UnderTitle>
      <ImageUpload setImgData={props.setImgData} />

      <UnderTitle>Kategori*</UnderTitle>
      <FormControl variant="outlined" style={{ width: "160px" }}>
        <InputLabel id="select-filled-label">Kategori*</InputLabel>
        <Select
          labelId="select-outlined-label"
          value={props.category}
          labelWidth={300}
          style={inputStyle}
          onChange={(e: any) => props.setCategory(e.target.value)}
        >
          {menuItems}
        </Select>
      </FormControl>

      <UnderTitle>Lokasjon*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Lokasjon"
        value={props.location}
        onChange={e => props.setLocation(e.target.value)}
      />

      <UnderTitle>Dato og tid*</UnderTitle>
      <MiniTitle>Fra</MiniTitle>
      <DateTimePicker
        style={inputStyle}
        selectedDate={props.fromDateTime}
        setSelectedDate={props.setFromDateTime}
      />
      <MiniTitle>Til</MiniTitle>
      <DateTimePicker
        fullWidth
        style={inputStyle}
        selectedDate={props.toDateTime}
        setSelectedDate={props.setToDateTime}
      />
    </>
  );
};

export default BasicInfoForm;
