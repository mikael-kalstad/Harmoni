import React from 'react'; 
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OutlineButton from '../Button/outlineButton';
import LoginBtn from '../Button/loginBtn';
import SmallProfileNav from '../Profile/smallProfileNav';

const StyledLink = styled(props => <Link {...props} />)`
    color: #7f7f7f;
    text-decoration: none;
    // line-height: 96px;

    :visited { 
        color: #7f7f7f; 
    }

    :hover {
        text-decoration: none;
    }
    margin: 0;
    margin-right: 20px;
`;

const NavigationBar = (props:any) => (
      <Navbar bg="white" expand="lg" sticky='top' style={{boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)'}}>
        <Navbar.Brand>
          <Link to='/'>
            <img
                src="/icons/icon.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                style={{margin: '25px'}}
                onClick={() => handleIconClick('/')}
              />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          <StyledLink to='/even?konsert'>Konsert</StyledLink>
          <StyledLink to='/event?teater'>Teater</StyledLink>
          <StyledLink to='/event?Standup'>Standup</StyledLink>

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
                <OutlineButton>Logg ut</OutlineButton>
              </>)
            : (<>
                <StyledLink to='/registrer'>
                  <OutlineButton>Registrer</OutlineButton></StyledLink>
                <LoginBtn />
              </>)
          }
        </Navbar.Collapse>
    </Navbar>
);

const handleIconClick = (path: any) => {  
  //Smooth scroll to top if already on the home page
  if (window.location.pathname === path)
      window.scrollTo({ top: 0, behavior: 'smooth' });
  else 
      window.scrollTo(0, 0);
}

export default NavigationBar;