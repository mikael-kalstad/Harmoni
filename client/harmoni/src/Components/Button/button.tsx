/**
 * --- General button component ---
 *
 * Props that can be passed
 *
 * - backgroundColor (dark blue defuault)
 * - textColor (white default)
 * - dropShadow (default off)
 * - onClick function
 * - All children (normally text) will be rendered inside button
 * - Loading state for example if the button will have an async API call.
 */

import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IProps {
  children: any;
  backgroundColor?: string;
  textColor?: string;
  dropShadow?: boolean;
  onClick?: Function;
  disabled?: boolean;
  loading?: boolean;
}

interface IStyledButton {
  backgroundColor?: string;
  textColor?: string;
  dropShadow?: boolean;
}

const StyledButton = styled.button<IStyledButton>`
  display: block;
  margin: auto;
  outline: none;
  border: none;
  height: 50px;
  width: 100%;
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : "#2A57AD"};
  color: ${props => (props.textColor ? props.textColor : "white")};
  box-shadow: ${props =>
    props.dropShadow ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  font-size: 16px;
  cursor: pointer;

  :hover {
    filter: brightness(90%);
  }

  :active {
    filter: brightness(95%);
  }
`;

const Button = (props: IProps) => (
  <StyledButton
    backgroundColor={props.backgroundColor}
    textColor={props.textColor}
    dropShadow={props.dropShadow !== undefined}
    onClick={() => props.onClick !== undefined && props.onClick()}
    disabled={props.disabled}
  >
    {props.loading ? (
      <CircularProgress color="secondary" size={25} />
    ) : (
      props.children
    )}
  </StyledButton>
);

export default Button;
