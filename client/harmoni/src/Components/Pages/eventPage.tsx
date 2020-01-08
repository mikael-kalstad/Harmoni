import React from 'react';
import Layout from '../layout';
import styled from 'styled-components';

let data = {
    'id': 1234,
    'category': 'Konsert',
    'title': 'Rihanna i Oslo Spektrum',
    'summary': 'Kom og se rihanna live i Januar 2021',
    'img': '/icons/test.jpg'
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: 700px;){
        grid-template-columns: 1fr;
    }
    `

const Event = (props: any) => (
    <Wrapper><p>Hei</p></Wrapper>
);

export default Event;