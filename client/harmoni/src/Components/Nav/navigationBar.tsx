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

const LinkWrapper1 = styled.div`
    color: #7f7f7f;

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
        <Navbar.Brand>
            <Link to="/">
                <img
                    src="/icons/icon.svg"
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    style={{ margin: "0px 1px -10px 15px", padding: "0px" }}
                    onClick={() => handleIconClick("/")}
                />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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

            <Nav>
                <LinkWrapper1>
                    <NavDropdown title="Sorter etter" id="basic-nav-dropdown">
                        <LinkContainer to="/sort/events/cheapest">
                            <NavDropdown.Item>Laveste pris</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/sorts/events/most-expensive">
                            <NavDropdown.Item>Høyeste pris</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </LinkWrapper1>
            </Nav>

            <StyledLink to="/search">
                <Icon src="/icons/search.svg" />
            </StyledLink>

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

const handleIconClick = (path: any) => {
    //Smooth scroll to top if already on the home page
    if (window.location.pathname === path)
        window.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo(0, 0);
};

export default NavigationBar;
