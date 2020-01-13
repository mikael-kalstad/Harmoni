import React from 'react';
import styled from 'styled-components';

let data = [{
    id: '1',
    name: 'rihanna',

},
{
    id: '2',
    name: 'teigen',

},
{
    id: '3',
    name: 'Johnny Bravo',
}];


interface SearchProps {
    name: string;
    id: number;
}
const SearchBar = (props: SearchProps) => {

    const testData = [];

    const searchForArtist = () =>{
        
    }

    return (
        <>
            <input type="text" className="input" placeholder="Søk..." />
            <ul>
                
                <li>{data[0].name}</li>
                <li>{data[1].name}</li>
                <li>{data[2].name}</li>
                
            </ul>
        </>
    );
};

export default SearchBar;
