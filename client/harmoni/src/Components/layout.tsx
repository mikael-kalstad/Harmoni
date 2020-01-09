import React from 'react';
import NavigationBar from './Nav/navigationBar';

interface IProps {
    children: any;
    userData: object | undefined;
    logOut: Function;
}

const Layout = (props: IProps) => (
    <>
        <NavigationBar userData={props.userData} logOut={props.logOut} />
        {props.children}
    </>
);

export default Layout;