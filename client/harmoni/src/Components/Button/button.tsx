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

import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

interface IProps {
  children: any;
  backgroundColor?: string;
  textColor?: string;
  dropShadow?: boolean;
  onClick?: Function;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
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
    props.disabled
      ? "#999"
      : props.backgroundColor
      ? props.backgroundColor
      : "#2A57AD"};
  color: ${props => (props.textColor ? props.textColor : "white")};
  box-shadow: ${props =>
    props.disabled
      ? "none"
      : props.dropShadow
      ? "0px 4px 4px rgba(0, 0, 0, 0.25)"
      : "none"};
  font-size: 16px;
  cursor: ${props => !props.disabled && "pointer"};

  :hover {
    filter: ${props => !props.disabled && "brightness(90%)"};
  }

  :active {
    filter: ${props => !props.disabled && "brightness(95%)"};
  }
`;

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const Button = (props: IProps) => {
  const btn = (
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

  if (props.to) return <StyledLink to={props.to}>{btn}</StyledLink>;

  return btn;
};

export default Button;
