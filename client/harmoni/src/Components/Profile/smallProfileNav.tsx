import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`

`;

const Img = styled.img`
    width: 30%;
    height: 30%;
    border-radius: 50%;
`;

const Text = styled.p`

`;

const StyledLink = styled(props => <Link {...props} />)`
    display: block;
    color: #868686;
    text-decoration: underline;

    :visited {
        color: #868686;
    }

    :hover {
        color: black;
    }
`;

const SmallProfileNav = (props: {img: string, name: string}) => (
    <>
        <Img src={props.img}/>
        <Text>{props.name}</Text>
    </>
);

export default SmallProfileNav;