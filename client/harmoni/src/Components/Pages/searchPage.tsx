import React, { useState } from "react";
import { searchService } from "../../services/SearchService";
import ArrangementGrid from "../eventGrid";
import { IEvent } from "./eventPage";
import styled from "styled-components";

const Container = styled.div`
  /* position: relative; */
  min-height: 80vh
  width: 100%;
  display: grid;
  justify-items: center;
  /* align-items: center; */
`;

interface IInputWrapper {
  showEvents: boolean;
}

const InputWrapper = styled.div<IInputWrapper>`
  width: 80%;
  height: 60px;
  max-width: 500px;
  border: 1px solid black;
  border-radius: 500px;
  display: grid;
  grid-template-columns: 1fr 15%;
  justify-items: center;
  align-items: center;
  /* top: ${props => (props.showEvents ? "20%" : "50%")}; */
  margin-top: ${props => (props.showEvents ? "10%" : "30%")};
  transition: all 300ms ease;

  :hover {
    border: 1px solid #39656c;
  }
`;

const Input = styled.input`
  width: 99%;
  height: 99%;
  border-radius: 500px;
  text-indent: 25px;
  font-size: 20px;
  border: none;

  :focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  height: 40%;
  cursor: pointer;
`;

const SearchEvents = () => {
  const [eventsData, setEventData] = useState<IEvent[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  // Get events from DB and set state
  const fetchSearchEvents = async text => {
    // Only search for event if there are atleast 3 characters in search inpput
    if (text.length >= 3) {
      //   setUserInput(e.target.value);
      setSearching(true);
      setCompleted(false);

      // Get all event from DB that matches search term
      let res = await searchService.searchForEvents(text);

      if (res) {
        console.log(res);
        setEventData(res);
        setSearching(false);
        setCompleted(true);
      }
    }
  };

  // Check if enter key is clicked
  const checkForEnterKey = e => {
    // Try to Log in if enter key is pressed down
    if (e !== undefined && e.key === "Enter") fetchSearchEvents(e.target.value);
  };

  //   const getInputvalue = () => {
  //     let text = (<HTMLInputElement>document.getElementById("search-input")).value;
  //     return text;
  //   };

  const handleChange = e => {
    // Reset events
    if (e.target.value === "") {
      setEventData([]);
      setCompleted(false);
    }
  };

  // Render grid of all matching arrangements
  return (
    <Container>
      <InputWrapper
        showEvents={userInput === "" ? false : searching || completed}
      >
        <Input
          id="search-input"
          type="text"
          placeholder="Rihanna konsert"
          //onChange={handleChange}
          onKeyDown={checkForEnterKey}
          //   value={userInput}
        />
        <SearchIcon
          src="/icons/search.svg"
          onClick={() => fetchSearchEvents(getInputvalue())}
        />
      </InputWrapper>

      {/* <input type="submit" value="Søk" onClick={fetchSearchEvents} /> */}

      {searching ? <ArrangementGrid></ArrangementGrid> : null}
      {completed && eventsData && (
        <ArrangementGrid
          title={" arrangmenter"}
          data={eventsData}
          emptyText={
            "Ingen arrangementer funnet med søkeord " +
            userInput +
            ". Prøv å søke på noe annet."
          }
        />
      )}
    </Container>
  );
};

export default SearchEvents;
