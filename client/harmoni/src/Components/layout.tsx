import React from "react";
import styled from "styled-components";
import NavigationBar from "./Nav/navigationBar";

const Content = styled.div`
  position: relative;
`;

interface IProps {
  children: any;
  userData: object;
  logOut: Function;
  logIn: Function;
}

const Layout = (props: IProps) => (
  <>
    <NavigationBar
      userData={props.userData}
      logOut={props.logOut}
      logIn={props.logIn}
    />
    <Content>{props.children}</Content>
  </>
);

export default Layout;