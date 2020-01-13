import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import TicketMenu from '../Components/Event/ticketMenu';
import TicketBar from '../Components/Event/ticketBar';

describe('Tests for ticketMenu', () => {
  let tickets = [
    { ticket_id: 1, event_id: 1, price: 20, type: 'Vanlig billett' },
    { ticket_id: 2, event_id: 1, price: 7000, type: 'Deluxe' }
  ];
  const wrapper = mount(<TicketMenu tickets={tickets} />);

  test('Has correct props', () => {
    expect(wrapper.props().tickets.length).toBe(2);
    expect(wrapper.props().tickets).toBe(tickets);
  });

  test('TicketBars has correct props', () => {
    const ticketBars = wrapper.find(TicketBar);
    expect(ticketBars.length).toBe(2);
    expect(ticketBars.at(0).props().type).toBe('Vanlig billett');
    expect(ticketBars.at(1).props().type).toBe('Deluxe');

    expect(ticketBars.at(0).props().price).toBe(20);
    expect(ticketBars.at(1).props().price).toBe(7000);
  });

  test('Add one ticket to quantity', () => {
    const ticketBars = wrapper.find(TicketBar);

    // Simulate click to add ticket
    ticketBars
      .at(0)
      .find('button')
      .at(1)
      .simulate('click');

    // Check that quantity on ticketBar is correct
    expect(
      ticketBars
        .at(0)
        .find('p')
        .at(2)
        .text()
    ).toBe('1');

    // Check that the updated total price is correct
    expect(
      wrapper
        .find('h2')
        .find('label')
        .text()
    ).toBe('20,-');
  });
});
