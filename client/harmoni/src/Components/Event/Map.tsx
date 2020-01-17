import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

import MapMarker from './mapMarker';

const Wrapper = styled.div`
    width: 100%;
    height 100%;
`;

interface IMapContainer {
  coords: { lat: number; lng: number };
}

const MapContainer = (props: IMapContainer) => {
  let defaultProps = {
    center: props.coords,
    zoom: 14
  };
  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDVcaM6wQFVRpOwpm2HY8Fnq9mKaro5O5k',
          language: 'no',
          region: 'no'
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker lat={props.coords.lat} lng={props.coords.lng} />
      </GoogleMapReact>
    </Wrapper>
  );
};

export default MapContainer;
