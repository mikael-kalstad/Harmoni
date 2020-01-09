import React from 'react';
import styled from 'styled-components';

interface IStyledBtn {
   solid: boolean;
}

interface IProps {
    children: any;
    solid?: boolean;
    onClick?: Function;
}

const StyledBtn = styled.button<IStyledBtn>`
    width: 100px;
    height: 40px;
    background: ${props => props.solid ? 'black' : 'white'};
    border: ${props => props.solid ? 'none' : '1px solid black'}
    color: ${props => props.solid ? 'white' : 'black'};;
    font-size: 14px;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 15px; 

    :hover {
        filter: brightness(95%);
    }

    :active {
        filter: brightness(98%);
    }
`;

const OutlineButton = (props: IProps) => {
    return (
        <StyledBtn 
            onClick={() => props.onClick !== undefined && props.onClick()}
            solid={props.solid !== undefined}
        >
            {props.children}
        </StyledBtn>
    );
};

export default OutlineButton;