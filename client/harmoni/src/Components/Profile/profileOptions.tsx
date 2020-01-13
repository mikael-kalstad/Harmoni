import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    background: #F0F0F0;
    padding: 10px;
    height: 400px;
    overflow: hidden;
    :hover {
        filter: brightness(98%);
    }
    
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
    font-size: 2vmax;
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



const ProfileButton = styled.button`
    
    background-color: #B0BEC5;
    color: black;
    font-size: 16px;
    font-weight: 500;
    border none;
    padding: 10px 15px 10px;
    margin: 15px;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    outline: none;   
    
    :hover {
        background-color: black;
        color: white;
        text-decoration: none;
    }
    
`

const ProfileLink = styled(props => <Link {...props} />)`
    display: grid;
    grid-template-rows: 1fr;
    text-decoration: none;
    :hover {
        text-decoration: none;
    }
`;




const ProfileOptions = (props: {img: string, name: string}) => (
    <Container>
        
        <ProfileLink to='/newevent'>
            <ProfileButton>
                Opprett arrangement
            </ProfileButton>
        </ProfileLink>
        <ProfileLink to='/password'>
            <ProfileButton>
                Endre passord
            </ProfileButton>
        </ProfileLink>
        <ProfileLink to='/profile/change'>
            <ProfileButton>
                Endre profil
            </ProfileButton>
        </ProfileLink>
        <ProfileLink to='/'>
            <ProfileButton>
                Endre noe annet nyttig
            </ProfileButton>
        </ProfileLink>
        
    </Container> 

);

export default ProfileOptions;