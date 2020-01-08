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
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'img': '/icons/test.jpg'
    }
]

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 700px;){
        grid-template-columns: 1fr;
    }

`

const Profile = (props:any) => (
    <Layout>
        <Wrapper>
            <ProfilePageImage img='/icons/test.jpg' name='Jahn Teigen'/>
            <ProfileOptions img='/icons/test.jpg' name='Jahn Teigen'/>
            <ArrangementGrid data={data} title='Populære arrangementer'/>
        </Wrapper>
    </Layout>
);

export default Profile;