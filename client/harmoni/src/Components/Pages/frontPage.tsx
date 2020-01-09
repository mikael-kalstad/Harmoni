import React from 'react';
import Layout from '../layout';
import HeaderCarousel from '../headerCarousel';
import ArrangementGrid from '../arrangementGrid';

let data = [
    {
        // 'id': 1234,
        // 'category': 'Konsert',
        // 'title': 'Kurt Nilsen synger låter',
        // 'img': '/icons/test.jpg'
    },
    {
        // 'id': 1234,
        // 'category': 'Konsert',
        // 'title': 'Kurt Nilsen synger låter',
        // 'img': '/icons/test.jpg'
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

let data2: any[] = [
    // {
    //     'id': 1234,
    //     'category': 'Konsert',
    //     // 'title': 'Rihanna i Oslo Spektrum',,
    //     // 'img': '/icons/test.jpg'
    // },
    // {
    //     'id': 1234,
    //     'category': 'Konsert',
    //     // 'title': 'Kurt Nilsen synger låter',
    //     // 'img': '/icons/test2.jpg'
    // },
    // {
    //     'id': 1234,
    //     'category': 'Konsert',
    //     'title': 'Rock Boys',
    //     'img': '/icons/test3.jpg'
    // },
]

const FrontPage = () => (
    <>
        <HeaderCarousel data={undefined} />
        <ArrangementGrid data={data} title='Populære arrangementer'/>
    </>
);
//Test
export default FrontPage;