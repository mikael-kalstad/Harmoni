import React from 'react';
import Layout from '../layout';
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

const FrontPage = () => (
    <Layout>
        <ArrangementGrid data={data} title='Populære arrangementer'/>
    </Layout>
);

export default FrontPage;