import React, { useState, useEffect, useRef } from 'react';
import ArrangementGrid from '../arrangementGrid';
import { eventService } from '../../services/EventService';

const Events = (props:any) => {
    const [eventData, setEventData] = useState(undefined);

    // Get data when component mounts or when type/category is changed
    useEffect(() => {
        fetchData();
    }, [props.match.params.type]);

    // Get event data from DB and set state
    const fetchData = async() => {
        // Async DB call
        let res = await eventService.getAllEvents();

        // Only display arrangements that match the type/category selected
        setEventData(res.filter((a:any) => a.category === props.match.params.type.toLowerCase()));
    }
 
    // Render grid of all matching arrangements
    return <ArrangementGrid title={props.match.params.type + ' arrangmenter'} data={eventData} />
}

export default Events;