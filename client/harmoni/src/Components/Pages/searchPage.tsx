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
    let text;
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [complete, setComplete] = useState(false);
    const [searching, setSearching] = useState(false);

    // Get events from DB and set state
    const fetchSearchEvents = async() => {
        // Async DB call
        if(text.length >= 3){
            setComplete(false);
            setSearching(true);
            setEventData(await searchService.searchForEvents(text));
            setSearching(false);
            setComplete(true);
        }
    }



    const inputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        text = value.target.value;
    }
    // Render grid of all matching arrangements
    return (
        <div style={{alignContent: "center", justifyContent: "center"}}>
            <input type="text" onChange={inputChange}
                   value={text}
                   style={{
                       fontSize: "27px",
                       textAlign: "center",
                       margin: "50px 15px auto 600px",
                       borderRadius: "30px",
                       border: "solid"
                    }}
            />
            <input type="submit" value="Søk" onClick={fetchSearchEvents}/>
            {searching ? <ArrangementGrid></ArrangementGrid> : null}
            {complete ? <ArrangementGrid title={ ' arrangmenter'} data={eventsData} /> : null}
        </div>
    )
}

export default SearchEvents;
