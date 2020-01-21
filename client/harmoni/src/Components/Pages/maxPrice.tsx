import React, {useEffect, useState} from "react";
import {searchService} from "../../services/SearchService";
import ArrangementGrid from "../arrangementGrid";
import {IEvent} from "./eventPage";
import styled from "styled-components";


const LinkWrapper = styled.div`
  margin: 10px 0;
`;

const MaxPrice = (props:any) => {
    const [eventsData, setEventData] = useState<IEvent[]>();
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchHighPriceEvents();

    }, []);




    const fetchHighPriceEvents = async() => {
        setEventData(await searchService.sortAfterHighPrice());

    }


    // Render grid of all matching arrangements
    console.log(eventsData);
    return (
        <>
            <ArrangementGrid title={ ' Dyreste arrangmenter'} data={eventsData} />
        </>
    )
}

export default MaxPrice;