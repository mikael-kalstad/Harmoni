import React from 'react';
import {Typeahead, AsyncTypeahead} from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';



let data = [
    {
        id: 1,
        name: 'Rihanna',
    },{
        id: 2,
        name: 'Teigen',
    },{
        id: 3,
        name: 'DDE',
    }
]

interface ArtistProps {
    name: string;
    id: number;
}

const state = {
    selected: [],
};
 

const SearchArtistBar = (props: ArtistProps) => {

    
    return(
    <>
        <Typeahead
            labelKey={data => `${data.name}`}
            multiple={true}
            options={data}
            placeholder='Velg artister...'
        />

    </> 
);
};

export default SearchArtistBar;