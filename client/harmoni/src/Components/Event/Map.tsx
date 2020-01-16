import React from 'react';
import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height 100%;
`;

const MapContainer = (props: any) => {
  let defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };
  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCRG-wE_wvqR7RAlsPDiqS8aiZ6dmm9Mec',
          language: 'no',
          region: 'no'
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </Wrapper>
  );
};

export default MapContainer;
