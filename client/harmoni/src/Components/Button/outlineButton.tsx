import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  children: any;
  solid?: boolean;
  onClick?: Function;
  width?: string;
  height?: string;
  to?: string;
}

interface IStyledBtn {
  solid: boolean;
  width?: string;
  height?: string;
}

const StyledBtn = styled.button<IStyledBtn>`
    width: ${props => (props.width ? props.width : "110px")};
    height: ${props => (props.height ? props.height : "50px")};
    background: ${props => (props.solid ? "black" : "white")};
    border: ${props => (props.solid ? "none" : "1px solid black")}
    color: ${props => (props.solid ? "white" : "black")};
    font-size: 16px;
    font-weight: 500;
    outline: none;
    border-radius: 30px;
    cursor: pointer;
    margin: 10px; 

    :hover {
        filter: brightness(95%);
    }

    :active {
        filter: brightness(98%);
    }
`;

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const OutlineButton = (props: IProps) => {
  const btn = (
    <StyledBtn
      onClick={() => props.onClick !== undefined && props.onClick()}
      solid={props.solid !== undefined}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </StyledBtn>
  );

  if (props.to) return <StyledLink to={props.to}>{btn}</StyledLink>;

  return btn;
};

export default OutlineButton;
