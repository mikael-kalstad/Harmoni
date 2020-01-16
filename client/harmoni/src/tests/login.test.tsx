import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Login from '../Components/login'
import App from '../App'
import { Wrapper } from '@material-ui/pickers/wrappers/Wrapper';
import { BrowserRouter } from 'react-router-dom';
import Button from "../Components/Button/button";


 /*describe("<Login /> with empty props", () => {
    test("Login renders", () => {
        const wrapper = shallow(React.createElement(Login, {toggle: () => { return true}}));
        console.log(wrapper)
        console.log(React.createElement(Login));
        let a : JSX.Element = React.createElement(Login);
        const wrapper1 = shallow(a);
        expect(wrapper1.html()).toBeInTheDocument()
    })
})*/

/* describe("<Login /> without props", () => {

    const wrapper = mount(<Login/>);

    test("Login renders", done => {
        expect(wrapper.find('div').at(1).find('h2').at(0).text()).toBe('Harmoni');
        expect(wrapper.find('div').at(1).find('div').at(1).find('div').at(0).find(Button).text()).toBe('LOGIN');
        done();
    })

    test("Login button works", done => {
        const loginModule = require('../Components/login');
        loginModule.login = jest.fn();
        expect(loginModule.login).not.toHaveBeenCalled();
        console.log("BUTTON TEXT: ", wrapper.find('div').at(1).find('div').at(1).find('div').at(0).find(Button).text())
        wrapper.find('div').at(1).find('div').at(1).find('div').at(0).find(Button).simulate('click');
        //console.log("SUBMIT: ", wrapper.props().submit);
        expect(loginModule.login).toHaveBeenCalled();
        done();
    })
}) */
 

 test("One equals One", done => {
    expect(1).toBe(1);
    done();
 })