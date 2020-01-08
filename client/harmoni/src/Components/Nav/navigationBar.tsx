import React from 'react'; 
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from '../Button/button';
import LoginBtn from '../Button/loginBtn';
import SmallProfileNav from '../Profile/smallProfileNav';

const NavigationBar = (props:any) => (
      <Navbar bg="white" expand="lg" sticky='top' style={{boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)'}}>
        <Navbar.Brand href="#home">
          <img
              src="/icons/icon.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{margin: '25px'}}
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Konsert</Nav.Link>
            <Nav.Link href="#link">Teater</Nav.Link>
            <Nav.Link href="#link">Standup</Nav.Link>
            <NavDropdown title="Annet" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {props.isLoggedIn 
            ? (<>
                <SmallProfileNav img='/icons/test.jpg' name='Jahn Teigen'/>
                {/* TODO: ADD LOG OUT FUNCTIONALITY */}
                <Button>Logg ut</Button>
              </>)
            : (<>
                <Button>Reigstrer</Button> 
                <LoginBtn />
              </>)
          }
        </Navbar.Collapse>
    </Navbar>
);

export default NavigationBar;