import React from 'react';
import NavigationBar from './Nav/navigationBar';

const Layout = (props: { children: any; }) => (
    <>
        <NavigationBar  isLoggedIn={true} />
        {props.children}
    </>
);

export default Layout;