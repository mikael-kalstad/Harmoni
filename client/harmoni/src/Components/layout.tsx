import React from 'react';
import NavigationBar from './Nav/navigationBar';

const Layout = (props: { children: any; }) => (
    <>
        <NavigationBar  isLoggedIn={false} />
        {props.children}
    </>
);

export default Layout;