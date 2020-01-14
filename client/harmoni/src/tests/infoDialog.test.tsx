import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';

import InfoDialog from '../Components/infoDialog';

describe('Tests for InfoDialog without children', () => {
  let closed: boolean = false;
  let close = jest.fn(() => (closed = true));
  const initialProps = {
    width: '300px',
    height: '400px',
    closeDialog: close
  };

  const wrapper = mount(<InfoDialog {...initialProps} />);

  test('Has correct props', () => {
    expect(wrapper.props().width).toBe('300px');
    expect(wrapper.props().height).toBe('400px');
    expect(wrapper.props().closeDialog).toBe(close);
  });

  test('Close dialog', () => {
    // Checks if the cross in the top-right closes the dialog
    expect(close).not.toHaveBeenCalled();
    wrapper
      .find('img')
      .at(0)
      .simulate('click');
    expect(close).toHaveBeenCalled();
    expect(closed).toBeTruthy();
  });
});

describe('Test for InfoDialog with children', () => {
  let closed: boolean = false;
  let close = jest.fn(() => (closed = true));
  const initialProps = {
    width: '300px',
    height: '400px',
    closeDialog: close
  };

  const wrapper = mount(
    <InfoDialog {...initialProps}>
      <p>TestText</p>
      <button onClick={close}>TestButton</button>
    </InfoDialog>
  );

  test('Dialog mounts children passed as props', () => {
    expect(
      wrapper
        .find('p')
        .at(0)
        .text()
    ).toBe('TestText');

    expect(
      wrapper
        .find('button')
        .at(0)
        .text()
    ).toBe('TestButton');
  });

  test('Close dialog with button passed as prop', () => {
    // Simulate click on button instead of cross
    expect(close).not.toHaveBeenCalled();
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(close).toHaveBeenCalled();
    expect(closed).toBeTruthy();
  });
});
