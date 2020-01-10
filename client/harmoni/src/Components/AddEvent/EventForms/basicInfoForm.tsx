import React, {useState} from 'react';
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DateTimePicker from "./dateTimePicker";

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

const BasicInfoForm = (props : any) => {

    let menuItems: JSX.Element[] = [];

    return (
        <>
            <Title>Info</Title>
            <h5>Navn på arrangement</h5>
            <Input
                onChange={e => props.setTitleInput}
                value={props.titleInput}
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
                onChange={e => props.setLocationInput(e.target.value)}
                value={props.locationInput}
                placeholder='Lokasjon'
            />

            <h5>Dato og tid</h5>
            <DateTimePicker dateTime={props.dateTimeInput}/>

        </>
    );
};

export default BasicInfoForm;
