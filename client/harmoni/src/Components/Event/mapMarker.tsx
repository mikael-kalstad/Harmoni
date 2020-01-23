import React from "react";

import styled from "styled-components";

const Marker = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #222222;
  border: 5px solid #c0392b 
  transform: translate(-50%, -200%) scaleY(2) rotate(45deg);

  top: 50%;
  left: 50%;
`;

// Styled div used in the google maps component to pin a location
const MapMarker = (props: any) => {
  return <Marker></Marker>;
};

export default MapMarker;
