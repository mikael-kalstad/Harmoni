import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const Img = styled.img`

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
    <Wrapper>
        <Img src={img}/>
        <Text>{name}</Text>
    </Wrapper>
);

export default SmallProfileNav;