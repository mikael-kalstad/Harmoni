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
import ListGroup from 'react-bootstrap/ListGroup';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import Skeleton from 'react-loading-skeleton';

import { eventService } from '../../../services/EventService';
import { ticketService } from '../../../services/TicketService';
import { userService } from '../../../services/UserService';
import { attachmentService } from '../../../services/AttachmentService';
import { loginService } from '../../../services/loginService';
import { riderService } from '../../../services/RiderService';

import ArtistsList from '../../Event/artistsList';
import styled from 'styled-components';

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



  const ArtistImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50px;
    object-fit: content;
  `;

  const DelButton = styled.button`
    color: red;
    
  `;
const ArtistForm = (props: any) => {
    
    const [userData, setUserData] = useState<IUser[]>();
    const [artistState, setArtistState] = useState();
    const [listOfArtists, setListOfArtists] = useState([]);
    
    useEffect(() => {
        fetchUsers();
        
      }, []);

      const fetchUsers = async () => {
        setUserData(await userService.getUsersOfType('artist'));
      };

      const fetchArtistState = (s: { user: IUser; }[]) => {
        if(s[0] != null){
            let newList = listOfArtists.map(i => i);
            newList.push(s[0]);
            setListOfArtists(newList);
        };
      };

      const deleteArtist = (item) => {
        if(item != null){
            let newList = listOfArtists.map(i => i);
            
            let a = newList.findIndex((r) =>{
              return r.user.user_id == item.user.user_id;
            });
            newList.splice(a, 1);
           
            setListOfArtists(newList);
          
        };
      };

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
                
                <p><br></br>Artistliste: </p>
                       
                <ListGroup>
                  {listOfArtists.map(item => {
                   
                   let base64 = new Buffer(item.user.picture).toString('base64'); 
                   return(
                    <ListGroup.Item>
                      <ArtistImage src={'data:image/png;base64,' + base64}/> 
                      <b>{item.user.type}</b>: {item.user.name} 
                      <DelButton onClick={d => deleteArtist(item)}>X</DelButton>
                    </ListGroup.Item>
                   )
                  })}
                </ListGroup>

                <p></p>
                
            </> 
        );
    } else {
        return(
            <>
                <p>Loading...</p>
            </>
        )
    }
};

export default ArtistForm;
