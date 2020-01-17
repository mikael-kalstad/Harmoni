import React, {useEffect, useState} from "react";
import {searchService} from "../../services/SearchService";
import ArrangementGrid from "../arrangementGrid";
import {IEvent} from "./eventPage";
import styled from "styled-components";


const LinkWrapper = styled.div`
  margin: 10px 0;
`;

const MinPrice = (props:any) => {
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchLowPriceEvents();

    }, []);




    const fetchLowPriceEvents = async() => {
        setEventData(await searchService.sortAfterLowPrice());

    }


    // Render grid of all matching arrangements
    console.log(eventsData);
    return (
        <>
            <ArrangementGrid title={ ' Laveste arrangmenter'} data={eventsData} />
        </>
    )
}

export default MinPrice;