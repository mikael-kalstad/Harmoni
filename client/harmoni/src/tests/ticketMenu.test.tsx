import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';

import TicketMenu from '../Components/Event/ticketMenu';
import TicketBar from '../Components/Event/ticketBar';

describe('Tests for ticketMenu', () => {
  let tickets = [
    {
      ticket_id: 1,
      event_id: 1,
      price: 20,
      type: 'Vanlig billett',
      available: 60
    },
    { ticket_id: 2, event_id: 1, price: 7000, type: 'Deluxe', available: 90 }
  ];
  const wrapper = mount(<TicketMenu tickets={tickets} canceled={false} />);
  let ticketBars = wrapper.find(TicketBar);

  test('Has correct props', () => {
    expect(wrapper.props().tickets.length).toBe(2);
    expect(wrapper.props().tickets).toBe(tickets);
  });

  test('TicketBars has correct props', () => {
    expect(ticketBars.length).toBe(2);
    expect(ticketBars.at(0).props().type).toBe('Vanlig billett');
    expect(ticketBars.at(1).props().type).toBe('Deluxe');

    expect(ticketBars.at(0).props().price).toBe(20);
    expect(ticketBars.at(1).props().price).toBe(7000);
  });

  test('Attempt to select negative amount of tickets', () => {
    // No tickets selected
    let amountBeforeClick = '0';
    expect(
      ticketBars
        .at(0)
        .find('p')
        .at(2)
        .text()
    ).toBe(amountBeforeClick);

    ticketBars
      .at(0)
      .find('button')
      .at(0)
      .simulate('click');

    // Amount should remain at 0
    expect(
      ticketBars
        .at(0)
        .find('p')
        .at(2)
        .text()
    ).toBe(amountBeforeClick);
  });

  test('Attempt to buy when no tickets are selected', () => {
    // Buybutton is disabled
    expect(
      wrapper
        .find('button')
        .last()
        .props().disabled
    ).toBeTruthy();

    // Checks that no popup confirming purchase is shown
    let divsBeforeClick = wrapper.find('div').length;
    expect(divsBeforeClick).toBe(6);

    wrapper
      .find('button')
      .last()
      .simulate('click');

    // No popup since button is disabled
    let divsAfterClick = wrapper.find('div').length;
    expect(divsAfterClick).toBe(divsBeforeClick);
  });

  test('Add one of each ticket to quantity', () => {
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

    // Simulate click to add another ticket
    ticketBars
      .at(1)
      .find('button')
      .at(1)
      .simulate('click');

    // Check that the total price has been updated
    expect(
      wrapper
        .find('h2')
        .find('label')
        .text()
    ).toBe('7020,-');
  });

  test('Remove one ticket', () => {
    // Simulate click to remove one ticket
    ticketBars
      .at(0)
      .find('button')
      .at(0)
      .simulate('click');

    // Check that the total price has been updated
    expect(
      wrapper
        .find('h2')
        .find('label')
        .text()
    ).toBe('7000,-');
  });

  test('Buy one ticket', () => {
    // Buybutton should be enabled since one ticket is selected
    expect(
      wrapper
        .find('button')
        .last()
        .props().disabled
    ).toBeFalsy();

    // Checks that a popup confirming purchase is shown
    let divsBeforeClick = wrapper.find('div').length;
    expect(divsBeforeClick).toBe(12);

    wrapper
      .find('button')
      .last()
      .simulate('click');

    // Checks that a popup (div) has appeared and ticketsummary has been removed
    let divsAfterClick = wrapper.find('div').length;
    expect(divsAfterClick).toBe(10);

    expect(
      wrapper
        .find('div')
        .last()
        .find('button')
        .last()
        .text()
    ).toBe('Tilbake');

    // Click "tilbake" to remove popup
    const backButton = wrapper
      .find('div')
      .last()
      .find('button')
      .at(0);
    expect(backButton.text()).toBe('Tilbake');

    backButton.simulate('click');
  });

  test('After purchase, selected tickets should reset to 0', () => {
    // Check that no tickets are selected
    expect(
      ticketBars
        .at(0)
        .find('p')
        .at(2)
        .text()
    ).toBe('0');

    expect(
      ticketBars
        .at(1)
        .find('p')
        .at(2)
        .text()
    ).toBe('0');

    // Buybutton should now be disabled
    expect(
      wrapper
        .find('button')
        .last()
        .props().disabled
    ).toBeTruthy();
  });
});
