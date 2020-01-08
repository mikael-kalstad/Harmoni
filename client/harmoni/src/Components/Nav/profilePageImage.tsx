import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto;
    padding: 10px;
    background: #F0F0F0;;
    height: 400px;

    :hover {
        filter: brightness(98%);
    }
`;


const Img = styled.img`
    object-fit: cover;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin: 20px;
`;

const TextWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 50px;
`;


const Text = styled.p`
    margin: 0;
    font-style: italic;
    font-size: 30px;
    align-self: end;
    color: #868686;
    
`;

const UnderText = styled.p`
    font-weight: 500;
    font-size: 50px;
    width: 300px;
    
    
`;


const StyledLink = styled(props => <Link {...props} />)`
    :visited {
        color: black;
    }

    :hover {
        color: black;
        text-decoration: none;
    }
`;

const ProfilePageImage = (props: {img: string, name: string}) => (
    <Container>
        <Img src={props.img}/>
        <TextWrapper>
                <Text>Artist</Text>
                <UnderText>RIHANNA  </UnderText>
            </TextWrapper>
    </Container> 

);

export default ProfilePageImage;