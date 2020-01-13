import React, { useState, useEffect } from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

import SearchArtistBar from '../../Button/searchArtistBar';
import {Typeahead, AsyncTypeahead} from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import Skeleton from 'react-loading-skeleton';

import { eventService } from '../../../services/EventService';
import { ticketService } from '../../../services/TicketService';
import { userService } from '../../../services/UserService';
import { attachmentService } from '../../../services/AttachmentService';
import { loginService } from '../../../services/loginService';
import { riderService } from '../../../services/RiderService';

import ArtistsList from '../../Event/artistsList';

interface IEvent {
    event_id: number;
    name: string;
    organizer: number;
    address: string;
    from_date: string;
    to_date: string;
    capacity: number;
    status: string;
    information: string;
    category: string;
    picture: File;
  }
  
  interface ITicket {
    ticketId: number;
    eventId: number;
    price: number;
    type: string;
  }

  interface IUser {
    user_id: number;
    name: string;
    email: string;
    mobile: number;
    hash: string;
    salt: string;
    type: string;
    picture: string;
  }



  
const ArtistForm = (props: any) => {
    
    const [userData, setUserData] = useState<IUser[]>();
    const [artistState, setArtistState] = useState();
    
    useEffect(() => {
        fetchUsers();
        
      }, []);

      const fetchUsers = async () => {
        setUserData(await userService.getUsersOfType('artist'));
      };

      const listOfArtists: any[] = [];

      const fetchArtistState = async (s: { user: IUser; }[]) => {
        console.log('HEIHEIHEIHEHIIEHIEHIHIE');
        if(s[0] != null){
            console.log(s[0].user.name);
            
            listOfArtists.push(s[0]);
            
            console.log(listOfArtists);

        };
      };


      if (userData != null){

      const test = userData.map((user) => (
        {user}
      ))
      }

      

    if (userData != null) {

        return(
            <>
                <p>Legg til artister:</p>
                <Typeahead
                    labelKey={artistName => `${artistName.user.name}`}
                    options= {userData.map((user) => (
                        {user}
                    ))}
                    onChange={(s) => fetchArtistState(s)}
                    onPaginate={() => console.log('clicked on name!')}                    
                    placeholder='Søk etter artister...'
                    selected={props.userData}
                />
                
                
                <ul>
                    <li>{}</li>
                </ul>
                <ArtistsList artists={listOfArtists} />

                <p></p>
                
            </> 
        );
    } else {
        return(
            <>
                <p>Null?</p>
            </>
        )
    }
};

export default ArtistForm;