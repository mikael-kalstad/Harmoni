import React from 'react';
import styled from "styled-components";
import DateTimePicker from "./dateTimePicker";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const inputStyle = {
    width: '100%',
    marginBottom: '25px'
};

interface InfoProps {
    name: string;
    setName: Function;
    category: string;
    setCategory: Function;
    location: string;
    setLocation: Function;
    fromDateTime: Date;
    setFromDateTime: Function;
    toDateTime: Date;
    setToDateTime: Function;
}

const BasicInfoForm = (props: InfoProps) => {

    const types_translated = ['Konsert', 'Festival', 'Teater', 'Standup'];
    const types = ['concert', 'festival', 'theatre', 'standup'];

    let menuItems: JSX.Element[] = [];

    for (let i = 0; i < types.length; i++) {
        menuItems.push(
            <MenuItem key={i} value={types[i]}>{types_translated[i]}</MenuItem>
        );
    }

    return (
        <>
            <Title>Info</Title>
            <h5>Navn på arrangement*</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='Navn'
                value={props.name}
                onChange={e => props.setName(e.target.value)}
            />

            <FormControl variant="outlined" style={{width: '160px'}}>
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

            <h5>Lokasjon*</h5>
            <TextField
                style={inputStyle}
                variant='outlined'
                placeholder='Lokasjon'
                value={props.location}
                onChange={e => props.setLocation(e.target.value)}
            />

            <h5>Dato og tid*</h5>
            <h6>Fra</h6>
            <DateTimePicker
                style={inputStyle}
                selectedDate={props.fromDateTime}
                setSelectedDate={props.setFromDateTime}/>

            <h6>Til</h6>
            <DateTimePicker
                style={inputStyle}
                selectedDate={props.toDateTime}
                setSelectedDate={props.setToDateTime}/>
        </>
    );
};

export default BasicInfoForm;
