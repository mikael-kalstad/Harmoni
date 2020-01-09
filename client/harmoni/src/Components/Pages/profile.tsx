import React from 'react';
import Layout from '../layout';
import styled from 'styled-components';

import ProfilePageImage from '../Profile/profilePageImage';
import ProfileOptions from '../Profile/profileOptions';
import ArrangementGrid from '../arrangementGrid';

let data = [
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'img': '/icons/test.jpg'
    },
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'img': '/icons/test.jpg'
    },
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'img': '/icons/test.jpg'
    },
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'img': '/icons/test.jpg'
    },
]

const Wrapper = styled.div`
    // overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: 1000px){
        grid-template-columns: 1fr;
    }
`

const Profile = (props:any) => (
    <>
    <Wrapper>
        <ProfilePageImage img='/icons/test.jpg' name='Jahn Teigen'/>
        <ProfileOptions img='/icons/test.jpg' name='Jahn Teigen'/>
    </Wrapper>
    <ArrangementGrid data={data} title='Mine arrangementer'/>
    </>
);

export default Profile;