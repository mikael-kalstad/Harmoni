/**
 * Navigation bar which is included in the top of the layout on all pages.
 *
 */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import OutlineButton from "../Button/outlineButton";
import LoginBtn from "../Button/loginBtn";
import SmallProfileNav from "../Profile/smallProfileNav";
import { LinkContainer } from "react-router-bootstrap";

const StyledLink = styled(props => <Link {...props} />)`
  color: #7f7f7f;
  text-decoration: none;

  :visited {
    color: #7f7f7f;
  }

  :hover {
    text-decoration: none;
  }
  margin: 0;
  margin-right: 20px;
`;

const Icon = styled.img`
  height: 25px;
  margin-right: 20px;
  margin: 15px;
`;

const LinkWrapper = styled.div`
  margin: 10px;
  padding: 8px;
  color: #7f7f7f;
  text-decoration: none;

  :visited {
    color: #7f7f7f;
  }

  :hover {
    text-decoration: none;
  }
  margin: 0;
  right: 20px;
`;

const LinkWrapperRight = styled.div`
  color: #7f7f7f;
  padding: 8px;

  :visited {
    color: #7f7f7f;
  }

  margin: 0;
  margin-right: 20px;
`;

const NavigationBar = (props: any) => (
  <Navbar
    bg="white"
    expand="lg"
    sticky="top"
    style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.25)", padding: "0px" }}
  >
    {/* Icon in navbar */}
    <Navbar.Brand>
      <Link to="/">
        <img
          src="/icons/icon.svg"
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          style={{ margin: "0px 1px -10px 15px", padding: "8px" }}
          onClick={() => handleIconClick("/")}
        />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    {/* All elements inside this parent will collapse to a mobile friendly menu when width is lower than breakpoint */}
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkWrapper>
          <LinkContainer to="/events/concert">
            <Nav.Link>Konsert</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          <LinkContainer to="/events/theatre">
            <Nav.Link>Teater</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          <LinkContainer to="/events/standup">
            <Nav.Link>Standup</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          {/* Dropdown inside the navbar for "overflow" categories that does not fit in the navbar */}
          <NavDropdown title="Annet" id="basic-nav-dropdown">
            <LinkContainer to="/events/festival">
              <NavDropdown.Item>Festival</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/events/show">
              <NavDropdown.Item>Show</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/events/other">
              <NavDropdown.Item>Annet</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </LinkWrapper>
      </Nav>

      {/* Sort all events after price */}
      <Nav>
        <LinkWrapperRight>
          <NavDropdown title="Sorter etter" id="basic-nav-dropdown">
            <LinkContainer to="/sort/events/cheapest">
              <NavDropdown.Item>Pris lav-høy</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/sorts/events/most-expensive">
              <NavDropdown.Item>Pris høy-lav</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </LinkWrapperRight>
      </Nav>

      {/* Search icon with link to search page */}
      <StyledLink to="/search">
        <Icon src="/icons/search.svg" />
      </StyledLink>

      {/* Render profile component in navbar if userData is defined (user logged in) */}
      {props.userData ? (
        <>
          <SmallProfileNav
            picture={props.userData.picture}
            name={props.userData.name}
          />
          <OutlineButton onClick={() => props.logOut()} to="/">
            Logg ut
          </OutlineButton>
        </>
      ) : (
        <>
          <OutlineButton to="/registrer">Registrer</OutlineButton>
          <LoginBtn logIn={props.logIn} />
        </>
      )}
    </Navbar.Collapse>
  </Navbar>
);

// Handle click on the icon
const handleIconClick = (path: any) => {
  //Smooth scroll to top if already on the home page
  if (window.location.pathname === path)
    window.scrollTo({ top: 0, behavior: "smooth" });
  // Scroll to the top
  else window.scrollTo(0, 0);
};

export default NavigationBar;
