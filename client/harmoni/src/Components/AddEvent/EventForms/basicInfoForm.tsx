import React from 'react';
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DateTimePicker from "./dateTimePicker";
import MenuItem from "@material-ui/core/MenuItem";

const Input = styled.input`
  display: block;
  margin: 40px auto;
  margin-top: 0px;
  width: 400px;
  height: 55px;
  border: none;
  background: #efefef;
  font-size: 18px;
  text-indent: 15px;

  :hover {
    filter: brightness(98%);
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  bottom-margin: 10px;
`;

const BasicInfoForm = () => {

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
            <h5>Navn på arrangement</h5>
            <Input
                placeholder='Navn'
            />
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Kategori
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {menuItems}
                </Dropdown.Menu>
            </Dropdown>
            <br/>
            <h5>Lokasjon</h5>
            <Input
                placeholder='Lokasjon'
            />

            <h5>Dato og tid</h5>
            <DateTimePicker/>
        </>
    );
};

export default BasicInfoForm;
