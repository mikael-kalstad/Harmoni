import React from 'react';
import NavigationBar from './Nav/navigationBar';

interface IProps {
    children: any;
    userData: object | undefined;
    logOut: Function;
    logIn: Function;
}

const Layout = (props: IProps) => (
    <>
        <NavigationBar userData={props.userData} logOut={props.logOut} logIn={props.logIn} />
        {props.children}
    </>
);

export default Layout;