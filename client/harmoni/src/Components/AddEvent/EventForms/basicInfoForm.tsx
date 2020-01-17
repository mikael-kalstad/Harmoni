import React, { useState } from 'react';
import styled from 'styled-components';
import DateTimePicker from './dateTimePicker';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ImageUpload from '../../Upload/imageUpload';
import CircularProgress from '@material-ui/core/CircularProgress';

import { geoService } from '../../../services/GeoService';

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
  width: '100%',
  marginBottom: '25px'
};

const inputStyleLocationFound = Object.assign({}, inputStyle, {
  border: '1px #2ecc71 solid',
  borderRadius: '5px'
});

const WarningText = styled.p`
  margin: 30px 0;
  font-size: 16px;
  font-weight: 400;
  color: #d55951;
`;

interface IProps {
  infoSubmit: boolean;
  infoData: any;
  setInfoData: Function;
  isInfoDataEmpty: Function;
}

const BasicInfoForm = (props: IProps) => {
  const types_translated = ['Konsert', 'Festival', 'Teater', 'Standup'];
  const types = ['concert', 'festival', 'theatre', 'standup'];
  const [coords, setCoords] = useState([1, 1]);
  const [fetchingCoords, setFetchingCoords] = useState(false);

  let menuItems: JSX.Element[] = [];

  // Add menu items to dropdown list
  for (let i = 0; i < types.length; i++) {
    menuItems.push(
      <MenuItem key={i} value={types[i]}>
        {types_translated[i]}
      </MenuItem>
    );
  }

  const fetchCoords = (address: string) => {
    if (address.length > 0) {
      setFetchingCoords(true);
      geoService.getLatAndLndOfAddress(address).then(data => {
        setCoords(data);
        setFetchingCoords(false);
      });
    } else {
      setCoords([1, 1]);
    }
  };

  return (
    <>
      <Title>Info</Title>
      <UnderTitle>Navn på arrangement*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Navn"
        error={props.infoSubmit && props.infoData.name === ''}
        helperText={
          props.infoSubmit && props.infoData.name === ''
            ? 'Navn er påkrevd'
            : ''
        }
        value={props.infoData.name}
        onChange={e =>
          props.setInfoData({ ...props.infoData, name: e.target.value })
        }
      />

      <UnderTitle>Bilde</UnderTitle>
      <ImageUpload
        setImgData={data =>
          props.setInfoData({ ...props.infoData, imgData: data })
        }
      />

      <UnderTitle>Kategori*</UnderTitle>
      <FormControl
        variant="outlined"
        style={{ width: '160px' }}
        error={props.infoSubmit && props.infoData.category === ''}
      >
        <InputLabel id="select-filled-label">Kategori*</InputLabel>
        <Select
          labelId="select-outlined-label"
          value={props.infoData.category}
          labelWidth={300}
          style={inputStyle}
          onChange={(e: any) => {
            props.setInfoData({ ...props.infoData, category: e.target.value });
          }}
        >
          {menuItems}
        </Select>
        {props.infoSubmit && props.infoData.category === '' && (
          <FormHelperText>Kategori er påkrevd</FormHelperText>
        )}
      </FormControl>

      <UnderTitle>Lokasjon*</UnderTitle>
      <TextField
        style={
          coords.length > 0 && coords[0] != 1 && !fetchingCoords
            ? inputStyleLocationFound
            : inputStyle
        }
        variant="outlined"
        placeholder="Lokasjon"
        value={props.infoData.location}
        error={
          (coords.length == 0 && !fetchingCoords) ||
          (props.infoSubmit && props.infoData.location === '')
        }
        helperText={
          props.infoSubmit && props.infoData.location === ''
            ? 'Lokasjon er påkrevd'
            : fetchingCoords
            ? 'Vennligst vent...'
            : coords.length > 0
            ? ''
            : 'Lokasjonen ble ikke funnet'
        }
        onChange={e => {
          props.setInfoData({ ...props.infoData, location: e.target.value });
        }}
        onBlur={e => fetchCoords(e.target.value)}
      />

      <UnderTitle>Dato og tid*</UnderTitle>
      <MiniTitle>Fra</MiniTitle>
      <DateTimePicker
        minDate={new Date()}
        disablePast={true}
        style={inputStyle}
        selectedDate={props.infoData.dateFrom}
        setSelectedDate={date =>
          props.setInfoData({
            ...props.infoData,
            dateFrom: date
          })
        }
        error={props.infoSubmit && props.infoData.dateFrom === null}
        helperText={
          props.infoSubmit && props.infoData.dateFrom === null
            ? 'Dato og tid fra er påkrevd'
            : ''
        }
      />
      <MiniTitle>Til</MiniTitle>
      <DateTimePicker
        fullWidth
        style={inputStyle}
        selectedDate={props.infoData.dateTo}
        setSelectedDate={date =>
          props.setInfoData({
            ...props.infoData,
            dateTo: date
          })
        }
        error={props.infoSubmit && props.infoData.dateTo === null}
        helperText={
          props.infoSubmit && props.infoData.dateTo === null
            ? 'Dato og tid til er påkrevd'
            : ''
        }
      />
      {props.infoSubmit && props.isInfoDataEmpty() && (
        <WarningText>
          Noen felter som er påkrevd er tomme, vennligst fyll disse ut før du
          fortsetter.
        </WarningText>
      )}
    </>
  );
};

export default BasicInfoForm;
