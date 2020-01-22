import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(props => <Link {...props} />)`
    color: lightblue;
    text-decoration: underline;
`;

const Wrapper = styled.div`
    background-color: #343434;
    color: white;
    display: grid;
    grid-template-columns: 3fr 2fr;
    margin-top: 30px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const InfoItem = styled.div`
    margin: auto 20px;
    justify-content: left;
`;

const LogoItem = styled.div`
    margin: 20px;
    text-align: center;
`;

const Icon = styled.img`
    width: 200px;
    filter: invert(100%);
    justify-self: center;
`;

const Text = styled.p`
    margin: 0;
    font-family: Arial;
`;

const InfoText = styled(Text)`
    justify-self: center;
    font-size: 20px;
`;

const ContactTitle = styled.h3`
    margin: 0;
    font-family: Arial;
    font-size: 30px;
    margin: 10px 0;
`;

const ContactText = styled(Text)`
    margin-bottom: 10px;
`;

const StyledA = styled.a`
    color: lightblue;
    text-decoration: underline;
`;

const Footer = (props: any) => {
    return (
        <Wrapper>
            <InfoItem>
                <ContactTitle>Kontaktinfo: </ContactTitle>
                <ContactText>
                    <StyledLink to="/feedback">Kontakt oss</StyledLink>
                    <br />
                    Prosjektet finnes på{" "}
                    <StyledA href="https://gitlab.stud.idi.ntnu.no/henrikwt/team-8---harmoni">
                        GitLab
                    </StyledA>
                </ContactText>
            </InfoItem>

            <LogoItem>
                <Icon alt="Harmoni tekst-logo" src="/icons/footericon.svg" />
                <InfoText>Utviklet av Team 8</InfoText>
            </LogoItem>
        </Wrapper>
    );
};

export default Footer;
