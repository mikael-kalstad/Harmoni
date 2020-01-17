import React, {useEffect, useState} from "react";
import {searchService} from "../../services/SearchService";
import ArrangementGrid from "../arrangementGrid";
import {IEvent} from "./eventPage";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from 'react-router-bootstrap';
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import {log} from "util";

const LinkWrapper = styled.div`
  margin: 10px 0;
`;

const SearchEvents = (props:any) => {
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchSearchEvents();
        fetchLowPriceEvents();
        fetchHighPriceEvents();
    }, [userInput]);

    useEffect(() => {
        fetchLowPriceEvents();
        fetchHighPriceEvents();
        console.log("Hei");
    }, []);
    // Get events from DB and set state
    const fetchSearchEvents = async() => {
        // Async DB call
        if( userInput){
            setEventData(await searchService.searchForEvents(userInput));
        }
    }

    const fetchLowPriceEvents = async() => {
        searchService.sortAfterLowPrice().then((data) => console.log(data));

    }

    const fetchHighPriceEvents = async() => {
        setEventData(await searchService.sortAfterHighPrice());

    }
    const inputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(value.target.value);
    }

    // Render grid of all matching arrangements
    console.log(eventsData);
    return (
        <>
            <input type="text" onChange={inputChange} value={userInput} />
            <LinkWrapper>
                <LinkContainer to="/search/events/billigste">
                    <Nav.Link>Lavest pris</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/search/events/dyreste">
                    <Nav.Link>Høyst pris</Nav.Link>
                </LinkContainer>
            </LinkWrapper>

            <ArrangementGrid title={ ' arrangmenter'} data={eventsData} />
        </>
    )
}

export default SearchEvents;