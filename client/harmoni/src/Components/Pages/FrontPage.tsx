import React from 'react';
import LoginBtn from '../Button/LoginBtn';
import ArrangmenetCard from '../arrangementCard';

const FrontPage = () => (
    <>
        <LoginBtn></LoginBtn>
        <ArrangmenetCard 
            id='1234'
            img='/icons/test.jpg'
            category='Konsert'
            title='Konsert med rihanna!'
        />
    </>
);

export default FrontPage;