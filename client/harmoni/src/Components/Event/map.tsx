import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

import MapMarker from './mapMarker';

const Wrapper = styled.div`
    width: 100%;
    height 100%;
    display: grid;
    align-items: center;
 
`;

const WarningText = styled.p`
  justify-self: center;
  font-size: 30px;
  font-weight: bold;
  color: grey;
`;

interface IMapContainer {
  coords: { lat: number; lng: number };
  zoom: number;
}

const Map = (props: IMapContainer) => {
  let defaultProps = {
    center: props.coords,
    zoom: props.zoom
  };

  return (
    <Wrapper>
      {props.coords.lat && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDVcaM6wQFVRpOwpm2HY8Fnq9mKaro5O5k',
            language: 'no',
            region: 'no'
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={props.coords}
        >
          {props.coords.lat && (
            <MapMarker lat={props.coords.lat} lng={props.coords.lng} />
          )}
        </GoogleMapReact>
      )}
      {!props.coords.lat && <WarningText>Kartet kunne ikke vises</WarningText>}
    </Wrapper>
  );
};

export default Map;
