import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import Button from '../Components/Button/button';

describe("Tests for button without children", () => {

    let disabled: boolean = false;
    let loading: boolean = false;
    let dropShadow: boolean = false;
    let onClick = jest.fn(() => (disabled = true));
    const iProps = {
        children: null,
        backgroundColor: 'asdfg',
        textColor: 'qwerty',
        dropShadow: dropShadow,
        onClick: onClick,
        disabled: disabled,
        loading: loading
    }

    const wrapper = mount(<Button {...iProps}/>)

    test("Has correct props", () => {
        expect(wrapper.props().backgroundColor).toBe('asdfg');
        expect(wrapper.props().textColor).toBe('qwerty');
    })

    test("OnClick works", () => {
        expect(onClick).not.toHaveBeenCalled();
        wrapper.find('button').simulate('click');
        expect(onClick).toHaveBeenCalled();
        expect(disabled).toBeTruthy();
    })
})

describe("Tests for button with children", () => {

    let disabled: boolean = false;
    let loading: boolean = false;
    let dropShadow: boolean = false;
    let onClick = jest.fn(() => (disabled = true));
    const iProps = {
        backgroundColor: 'asdfg',
        textColor: 'qwerty',
        dropShadow: dropShadow,
        onClick: onClick,
        disabled: disabled,
        loading: loading
    }

    const wrapper = mount(
        <Button {...iProps}>
            <div>TestText</div>
            <button onClick={onClick}>TestButton</button>
        </Button>
    );
    
    test("Children were added as props", () => {
        expect(wrapper.find('button').find('div').text()).toBe('TestText');
        expect(wrapper.find('button').find('button').at(1).text()).toBe('TestButton');
        expect(onClick).not.toHaveBeenCalled();
        wrapper.find('button').find('button').at(0).simulate('click');
        expect(onClick).toHaveBeenCalled();
        expect(disabled).toBeTruthy();
    })
})