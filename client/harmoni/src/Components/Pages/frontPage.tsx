import React from 'react';
import Layout from '../layout';
import HeaderCarousel from '../headerCarousel';
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

let data2 = [
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Rihanna i Oslo Spektrum',
        'summary': 'Kom og se rihanna live i Januar 2021',
        'img': '/icons/test.jpg'
    },
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Kurt Nilsen synger låter',
        'summary': 'Kurt og guttene kommer innom og synger masse låter',
        'img': '/icons/test2.jpg'
    },
    {
        'id': 1234,
        'category': 'Konsert',
        'title': 'Rock Boys',
        'summary': 'Come and Rock and Roll with Rock Boys!',
        'img': '/icons/test3.jpg'
    },
]

const FrontPage = () => (
    <>
        <HeaderCarousel data={data2} />
        <ArrangementGrid data={data} title='Populære arrangementer'/>
    </>
);
//Test
export default FrontPage;