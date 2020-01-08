import React from 'react';
import styled from 'styled-components';

interface Props {
   solid: boolean;
}

const StyledBtn = styled.button<Props>`
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
        filter: brightness(90%);
    }


    :active {
        filter: brightness(90%);
}
`;

const Button = (props: any) => {
    return (
        <StyledBtn 
            onClick={() => props.onClick !== undefined && props.onClick()}
            solid={props.solid}
        >
            {props.children}
        </StyledBtn>
    );
};

export default Button;