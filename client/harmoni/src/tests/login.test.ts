import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Login from '../Components/Login'
import App from '../App'


/* describe("<Login /> with empty props", () => {
    test("Login renders", () => {
        const wrapper = shallow(React.createElement(Login, {toggle: () => { return true}}));
        console.log(wrapper)
        console.log(React.createElement(Login));
        let a : JSX.Element = React.createElement(Login);
        const wrapper1 = shallow(a);
        expect(wrapper1.html()).toBeInTheDocument()
    })
})
 */

 test("One equals One", done => {
    expect(1).toBe(1);
    done();
 })