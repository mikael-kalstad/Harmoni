import React, {useEffect, useState} from "react";
import {searchService} from "../../services/SearchService";
import ArrangementGrid from "../eventGrid";
import {IEvent} from "./eventPage";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from 'react-router-bootstrap';
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import {log} from "util";



const SearchEvents = (props:any) => {
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchSearchEvents();

    }, [userInput]);


    // Get events from DB and set state
    const fetchSearchEvents = async() => {
        // Async DB call
        if( userInput){
            setEventData(await searchService.searchForEvents(userInput));
        }
    }


    const inputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(value.target.value);
    }

    // Render grid of all matching arrangements
    console.log(eventsData);
    return (
        <>
            <input type="text" onChange={inputChange}
                   value={userInput}
                   style={{
                       fontSize: "27px",
                       textAlign: "center",
                       margin: "50px auto auto 600px",
                       borderRadius: "30px",
                       border: "solid"
                    }}
            />
            <ArrangementGrid title={ ' arrangmenter'} data={eventsData} />
        </>
    )
}

export default SearchEvents;
