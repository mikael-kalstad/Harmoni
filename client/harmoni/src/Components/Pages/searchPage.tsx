import React, {useEffect, useState} from "react";
import {searchService} from "../../services/SearchService";
import ArrangementGrid from "../arrangementGrid";
import {IEvent} from "./eventPage";

const SearchEvents = (props:any) => {
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchSearchEvents();
    }, [userInput]);

    // Get events from DB and set state
    const fetchSearchEvents = async() => {
        // Async DB call
        setEventData(await searchService.searchForEvents(userInput));
    }

    const inputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(value.target.value);
    }

    // Render grid of all matching arrangements
    return <><input type="text" onChange={inputChange} value={userInput} />
        <ArrangementGrid title={ ' arrangmenter'} data={eventsData} /></>
}

export default SearchEvents;