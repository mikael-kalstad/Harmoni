import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import ListGroup from 'react-bootstrap/ListGroup';
import ArtistsList from '../Components/Event/artistsList';

describe("Tests for artistsList", () => {

    let artistsList = [
        {user_id: 1, name: "Navn", email: "navn@navn.com", mobile: 12345678, hash: "asdfgh", salt: "qwerty", type: "artist", picture: 'x32E'},
        {user_id: 2, name: "Navn 2", email: "navn2@navn2", mobile: 87654321, hash: "zxcvbn", salt: "klmnop", type: "artist", picture: 'x25F'}
    ];
    const wrapper = mount(<ArtistsList artists = {artistsList}/>)

    test("Has correct props", () => {
        expect(wrapper.props().artists.length).toBe(2);
        expect(wrapper.props().artists).toBe(artistsList);
    })

    test("Names are correct and are displayed correctly", () => {
        expect(wrapper.find('div').at(0)
            .find(ListGroup)
            .find(ListGroup.Item).at(0)
            .find('div').at(0)
            .find('label').at(0).text()
        ).toBe('Navn');
        expect(wrapper.find('div').at(0)
            .find(ListGroup)
            .find(ListGroup.Item).at(1)
            .find('div').at(0)
            .find('label').at(0).text()
        ).toBe('Navn 2');
    })

})